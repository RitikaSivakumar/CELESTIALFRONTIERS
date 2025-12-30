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
  // Physiological
  heartRate: z.number().describe('Heart rate in beats per minute (BPM).'),
  hrv: z.number().describe('Heart Rate Variability in ms.'),
  spo2: z.number().describe('Blood oxygen saturation level (%).'),
  breathingRate: z.number().optional().describe('Breaths per minute.'),
  skinTemp: z.number().describe('Skin temperature in Celsius.'),
  gsr: z.number().describe('Galvanic Skin Response (skin conductance) in microsiemens (µS).'),
  // Behavioral
  motionData: z.string().describe('Activity level and posture (e.g., sedentary, light activity, restless).'),
  activityDuration: z.number().optional().describe('Duration of current activity in minutes.'),
  // Environmental
  ambientLight: z.number().optional().describe('Ambient light level in lux.'),
  ambientTemp: z.number().optional().describe('Ambient temperature in Celsius.'),
  humidity: z.number().optional().describe('Ambient humidity percentage.'),
  co2: z.number().optional().describe('CO₂ level in ppm.'),
});
export type RealTimeHealthAssessmentInput = z.infer<typeof RealTimeHealthAssessmentInputSchema>;

const RealTimeHealthAssessmentOutputSchema = z.object({
  fatiguePrediction: z.enum(['Normal', 'Mild Risk', 'High Risk']).describe('Predicted fatigue level for the next 15-30 minutes.'),
  dehydrationRisk: z.enum(['Low', 'Moderate', 'High']).describe('Current estimated dehydration risk.'),
  mentalOverload: z.enum(['Low', 'Elevated', 'High']).describe('Current trend of mental overload or cognitive stress.'),
  burnoutRisk: z.enum(['Low', 'Moderate', 'High', 'Critical']).describe('Long-term burnout probability score based on trends.'),
  recommendations: z.array(z.string()).describe('List of proactive, actionable recommendations based on the assessment.'),
  alert: z.boolean().describe('Whether a real-time alert should be triggered for a caregiver or doctor based on critical risk.'),
});
export type RealTimeHealthAssessmentOutput = z.infer<typeof RealTimeHealthAssessmentOutputSchema>;

export async function realTimeHealthAssessment(input: RealTimeHealthAssessmentInput): Promise<RealTimeHealthAssessmentOutput> {
  return realTimeHealthAssessmentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'realTimeHealthAssessmentPrompt',
  input: {schema: RealTimeHealthAssessmentInputSchema},
  output: {schema: RealTimeHealthAssessmentOutputSchema},
  prompt: `You are an Edge AI assistant for a wearable device, specializing in proactive health predictions. Your goal is to prevent burnout, fatigue, and dehydration before they become critical.

Analyze the provided multimodal sensor data to predict short-term fatigue, estimate dehydration risk, detect mental overload trends, and score long-term burnout probability.
Provide concise risk assessments and a list of gentle, actionable recommendations. Determine if the situation warrants a critical alert.

Analyze the following data:
- Heart Rate (BPM): {{{heartRate}}}
- HRV (ms): {{{hrv}}}
- SpO2 (%): {{{spo2}}}
- Breathing Rate (breaths/min): {{{breathingRate}}}
- Skin Temp (°C): {{{skinTemp}}}
- GSR (µS): {{{gsr}}}
- Motion & Activity: {{{motionData}}}
- Activity Duration (mins): {{{activityDuration}}}
- Ambient Light (lux): {{{ambientLight}}}
- Ambient Temp (°C): {{{ambientTemp}}}
- Humidity (%): {{{humidity}}}
- CO₂ (ppm): {{{co2}}}

Based on this, provide your predictive analysis.`,
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
