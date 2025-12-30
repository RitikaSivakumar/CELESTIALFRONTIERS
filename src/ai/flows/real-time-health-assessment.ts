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
  heartRate: z.number().describe('Heart rate in beats per minute (BPM) from MAX30102.'),
  hrv: z.number().describe('Heart Rate Variability in ms from MAX30102.'),
  spo2: z.number().describe('Blood oxygen saturation level (%) from MAX30102.'),
  motionData: z.string().describe('Activity level and posture from MPU6050 (e.g., sedentary, light activity, restless).'),
  skinTemp: z.number().describe('Skin temperature in Celsius from NTC/DS18B20.'),
  gsr: z.number().describe('Galvanic Skin Response (skin conductance) in microsiemens (µS) from GSR/EDA sensor.'),
  ambientLight: z.number().describe('Ambient light level in lux from BH1750.'),
});
export type RealTimeHealthAssessmentInput = z.infer<typeof RealTimeHealthAssessmentInputSchema>;

const RealTimeHealthAssessmentOutputSchema = z.object({
  mentalState: z.string().describe('Overall mental state assessment (e.g., Calm, Mild Stress, High Stress).'),
  physicalState: z.string().describe('Overall physical state assessment (e.g., Rested, Fatigued, Dehydrated).'),
  recommendations: z.array(z.string()).describe('List of actionable recommendations based on the assessment.'),
  alert: z.boolean().describe('Whether a real-time alert should be triggered for a caregiver or doctor.'),
});
export type RealTimeHealthAssessmentOutput = z.infer<typeof RealTimeHealthAssessmentOutputSchema>;

export async function realTimeHealthAssessment(input: RealTimeHealthAssessmentInput): Promise<RealTimeHealthAssessmentOutput> {
  return realTimeHealthAssessmentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'realTimeHealthAssessmentPrompt',
  input: {schema: RealTimeHealthAssessmentInputSchema},
  output: {schema: RealTimeHealthAssessmentOutputSchema},
  prompt: `You are an AI assistant specializing in real-time health assessments based on wearable sensor data for seniors, students, and professionals.

Analyze the provided sensor data to determine the user's current mental and physical state. Look for signs of fatigue, dehydration, stress, and poor well-being.
Provide a concise assessment of both mental and physical states, and offer personalized, actionable recommendations for improvement.
Determine if the situation warrants a real-time alert to a caregiver.

Consider the following data points:
- Heart Rate (BPM): {{{heartRate}}}
- Heart Rate Variability (ms): {{{hrv}}}
- SpO2 (%): {{{spo2}}}
- Motion & Activity: {{{motionData}}}
- Skin Temperature (°C): {{{skinTemp}}}
- Galvanic Skin Response (µS): {{{gsr}}}
- Ambient Light (lux): {{{ambientLight}}}

Based on this, provide your analysis.`,
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
