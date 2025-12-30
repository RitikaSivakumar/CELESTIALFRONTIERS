'use server';

/**
 * @fileOverview An AI chatbot for emotional support that analyzes user emotions to provide appropriate responses.
 *
 * - aiChatbotForEmotionalSupport - A function that handles the chatbot interaction and emotional analysis.
 * - AIChatbotForEmotionalSupportInput - The input type for the aiChatbotForEmotionalSupport function.
 * - AIChatbotForEmotionalSupportOutput - The return type for the aiChatbotForEmotionalSupport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIChatbotForEmotionalSupportInputSchema = z.object({
  interactionMode: z.enum(['text', 'voice', 'video']).describe('The mode of interaction (text, voice, or video).'),
  userInput: z.string().describe('The user input text or a description of the user input if using voice or video.'),
});
export type AIChatbotForEmotionalSupportInput = z.infer<typeof AIChatbotForEmotionalSupportInputSchema>;

const AIChatbotForEmotionalSupportOutputSchema = z.object({
  chatbotResponse: z.string().describe('The chatbot response based on the user input and emotion analysis.'),
});
export type AIChatbotForEmotionalSupportOutput = z.infer<typeof AIChatbotForEmotionalSupportOutputSchema>;

export async function aiChatbotForEmotionalSupport(input: AIChatbotForEmotionalSupportInput): Promise<AIChatbotForEmotionalSupportOutput> {
  return aiChatbotForEmotionalSupportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiChatbotForEmotionalSupportPrompt',
  input: {schema: AIChatbotForEmotionalSupportInputSchema},
  output: {schema: AIChatbotForEmotionalSupportOutputSchema},
  prompt: `You are an AI chatbot designed to provide emotional support to users. 
You can interact with the user via text, voice or video.

Analyze the user's input and respond in a way that is appropriate for their emotional state.

Interaction Mode: {{{interactionMode}}}
User Input: {{{userInput}}}

Response:`, 
});

const aiChatbotForEmotionalSupportFlow = ai.defineFlow(
  {
    name: 'aiChatbotForEmotionalSupportFlow',
    inputSchema: AIChatbotForEmotionalSupportInputSchema,
    outputSchema: AIChatbotForEmotionalSupportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
