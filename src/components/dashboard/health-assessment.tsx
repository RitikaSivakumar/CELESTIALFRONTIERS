'use client';

import { useState, useEffect } from 'react';
import {
  realTimeHealthAssessment,
  type RealTimeHealthAssessmentInput,
  type RealTimeHealthAssessmentOutput,
} from '@/ai/flows/real-time-health-assessment';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { BrainCircuit, Droplets, Activity, Wind, AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const mockMotionData = [
  'sedentary',
  'light activity',
  'moderate activity',
  'restless movement',
  'good posture',
  'slumped posture',
];

export function HealthAssessment() {
  const [assessment, setAssessment] =
    useState<RealTimeHealthAssessmentOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const runAssessment = async () => {
    // Note: No setLoading(true) here to avoid constant UI flicker on interval updates
    const mockInput: RealTimeHealthAssessmentInput = {
      heartRate: Math.floor(Math.random() * 41) + 60, // 60-100 bpm
      hrv: Math.floor(Math.random() * 51) + 30, // 30-80 ms
      spo2: Math.floor(Math.random() * 5) + 95, // 95-99%
      motionData:
        mockMotionData[Math.floor(Math.random() * mockMotionData.length)],
      skinTemp: parseFloat((Math.random() * 2 + 36).toFixed(1)), // 36.0-38.0°C
      gsr: parseFloat((Math.random() * 10).toFixed(2)), // 0-10 µS
      breathingRate: Math.floor(Math.random() * 5) + 16, // 16-20
      activityDuration: Math.floor(Math.random() * 120),
      ambientLight: Math.floor(Math.random() * 801) + 100, // 100-900 lux
    };

    try {
      const result = await realTimeHealthAssessment(mockInput);
      setAssessment(result);
      setError(null);
    } catch (e) {
      console.error('Health assessment failed:', e);
      setError('Failed to load health assessment. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runAssessment();
    // The interval has been removed to prevent excessive API calls.
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <Skeleton className="h-4 w-24" />
              </CardTitle>
              <Skeleton className="h-4 w-4 rounded-sm" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Assessment Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">{error}</p>
        </CardContent>
      </Card>
    );
  }
  
  if (!assessment) return null;

  return (
    <>
    {assessment.alert && (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>High Risk Detected!</AlertTitle>
        <AlertDescription>
          Critical risk levels detected. Consider using the Emergency Key to contact your doctor immediately.
        </AlertDescription>
      </Alert>
    )}
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Fatigue</CardTitle>
          <Wind className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold">{assessment.fatiguePrediction}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Dehydration</CardTitle>
          <Droplets className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold">{assessment.dehydrationRisk}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Mental Overload</CardTitle>
          <BrainCircuit className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold">{assessment.mentalOverload}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Burnout Risk</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold">{assessment.burnoutRisk}</div>
        </CardContent>
      </Card>
      {assessment?.recommendations && assessment.recommendations.length > 0 && (
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-sm text-muted-foreground list-disc pl-4">
              {assessment.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
    </>
  );
}
