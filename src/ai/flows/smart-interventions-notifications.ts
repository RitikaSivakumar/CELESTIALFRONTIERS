'use server';

/**
 * @fileOverview A flow to provide proactive, positive interventions via notifications based on the user's assessed state.
 *
 * - getSmartIntervention - A function that determines and returns a smart intervention message.
 * - SmartInterventionInput - The input type for the getSmartIntervention function.
 * - SmartInterventionOutput - The return type for the getSmartIntervention function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartInterventionInputSchema = z.object({
  userState: z
    .enum(['Normal', 'At-risk', 'High depression', 'High anxiety'])
    .describe('The current mental health state of the user.'),
  ageGroup: z
    .enum(['School students', 'College students', 'Working professionals'])
    .describe('The age group of the user.'),
});
export type SmartInterventionInput = z.infer<typeof SmartInterventionInputSchema>;

const SmartInterventionOutputSchema = z.object({
  message: z.string().describe('A positive and proactive intervention message.'),
});
export type SmartInterventionOutput = z.infer<typeof SmartInterventionOutputSchema>;

export async function getSmartIntervention(input: SmartInterventionInput): Promise<SmartInterventionOutput> {
  return smartInterventionFlow(input);
}

const smartInterventionPrompt = ai.definePrompt({
  name: 'smartInterventionPrompt',
  input: {schema: SmartInterventionInputSchema},
  output: {schema: SmartInterventionOutputSchema},
  prompt: `You are a mental wellness assistant. Based on the user's current mental health state and age group, provide a positive and proactive intervention message.

User State: {{{userState}}}
Age Group: {{{ageGroup}}}

Intervention Message:`,
});

const smartInterventionFlow = ai.defineFlow(
  {
    name: 'smartInterventionFlow',
    inputSchema: SmartInterventionInputSchema,
    outputSchema: SmartInterventionOutputSchema,
  },
  async input => {
    const {output} = await smartInterventionPrompt(input);
    return output!;
  }
);
