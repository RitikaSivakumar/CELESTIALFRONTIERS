'use server';

/**
 * @fileOverview A flow to provide nutritional recommendations based on the menstrual cycle phase.
 *
 * - getNutrientRecommendation - A function that returns dietary advice for a given cycle phase.
 * - NutrientRecommendationInput - The input type for the getNutrientRecommendation function.
 * - NutrientRecommendationOutput - The return type for the getNutrientRecommendation function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const NutrientRecommendationInputSchema = z.object({
  cyclePhase: z
    .enum(['Menstrual', 'Follicular', 'Ovulatory', 'Luteal'])
    .describe('The current phase of the menstrual cycle.'),
});
export type NutrientRecommendationInput = z.infer<
  typeof NutrientRecommendationInputSchema
>;

const NutrientRecommendationOutputSchema = z.object({
  title: z.string().describe('A catchy title for the nutrient guide, e.g., "Nourish Your Body: Menstrual Phase".'),
  summary: z.string().describe('A brief summary of the dietary focus for this phase.'),
  recommendations: z.array(
    z.object({
      nutrient: z.string().describe('The key nutrient to focus on, e.g., "Iron".'),
      reason: z.string().describe('The reason why this nutrient is important during this phase.'),
      foods: z.array(z.string()).describe('A list of foods rich in this nutrient.'),
    })
  ).describe('A list of nutrient recommendations.'),
});
export type NutrientRecommendationOutput = z.infer<
  typeof NutrientRecommendationOutputSchema
>;

export async function getNutrientRecommendation(
  input: NutrientRecommendationInput
): Promise<NutrientRecommendationOutput> {
  return nutrientRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'nutrientRecommendationPrompt',
  input: { schema: NutrientRecommendationInputSchema },
  output: { schema: NutrientRecommendationOutputSchema },
  prompt: `You are a nutritionist specializing in women's health. Provide a concise and helpful nutrient guide for the specified menstrual cycle phase. 

Focus on 2-3 key nutrients. For each nutrient, explain its importance during this phase and list 3-4 food sources.

Generate a title, a short summary, and the list of recommendations.

Cycle Phase: {{{cyclePhase}}}
`,
});

const nutrientRecommendationFlow = ai.defineFlow(
  {
    name: 'nutrientRecommendationFlow',
    inputSchema: NutrientRecommendationInputSchema,
    outputSchema: NutrientRecommendationOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
