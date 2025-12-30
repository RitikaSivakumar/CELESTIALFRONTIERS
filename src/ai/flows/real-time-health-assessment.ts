'use server';

/**
 * @fileOverview This file defines a Genkit flow for real-time health assessment using wearable sensor data.
 *
 * - realTimeHealthAssessment - A function that takes sensor data as input and returns an assessment of the user's mental and physical state.
 * - RealTimeHealthAssessmentInput - The input type for the realTimeHealthAssessment function.
 * - RealTimeHealthAssessmentOutput - The return type for the realTimeHealthAssessment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RealTimeHealthAssessmentInputSchema = z.object({
  heartRate: z.number().describe('Heart rate in beats per minute.'),
  motionData: z.string().describe('Motion data from the wearable device.'),
  gsr: z.number().describe('Galvanic Skin Response value.'),
  speechLatency: z.number().describe('Speech latency in milliseconds.'),
  energyLevel: z.number().describe('Energy level estimation (0-100).'),
  dailyAssessmentScore: z.number().describe('Score from HADES-based daily assessment')
});
export type RealTimeHealthAssessmentInput = z.infer<typeof RealTimeHealthAssessmentInputSchema>;

const RealTimeHealthAssessmentOutputSchema = z.object({
  mentalState: z.string().describe('Overall mental state assessment (e.g., Normal, At-risk, High depression, High anxiety).'),
  physicalState: z.string().describe('Overall physical state assessment (e.g., Normal, Fatigue, Restless).'),
  recommendations: z.array(z.string()).describe('List of recommendations based on the assessment.'),
  alert: z.boolean().describe('Whether a real-time alert should be triggered')
});
export type RealTimeHealthAssessmentOutput = z.infer<typeof RealTimeHealthAssessmentOutputSchema>;

export async function realTimeHealthAssessment(input: RealTimeHealthAssessmentInput): Promise<RealTimeHealthAssessmentOutput> {
  return realTimeHealthAssessmentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'realTimeHealthAssessmentPrompt',
  input: {schema: RealTimeHealthAssessmentInputSchema},
  output: {schema: RealTimeHealthAssessmentOutputSchema},
  prompt: `You are an AI assistant specializing in real-time health assessments based on wearable sensor data.

  Analyze the provided sensor data and user inputs to determine the user's current mental and physical state.
  Provide a concise assessment of both mental and physical states, and offer personalized recommendations for improvement.
  Also, based on the assessment, determine whether a real-time alert should be triggered.

  Consider the following data points:
  - Heart Rate: {{{heartRate}}} bpm
  - Motion Data: {{{motionData}}}
  - GSR: {{{gsr}}}
  - Speech Latency: {{{speechLatency}}} ms
  - Energy Level: {{{energyLevel}}}
  - Daily Assessment Score: {{{dailyAssessmentScore}}}

  Output format:
  {
    "mentalState": "Overall mental state assessment",
    "physicalState": "Overall physical state assessment",
    "recommendations": ["Recommendation 1", "Recommendation 2"],
    "alert": "Whether a real-time alert should be triggered (true/false)"
  }`,
});

const realTimeHealthAssessmentFlow = ai.defineFlow(
  {
    name: 'realTimeHealthAssessmentFlow',
    inputSchema: RealTimeHealthAssessmentInputSchema,
    outputSchema: RealTimeHealthAssessmentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
