
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Droplets,
  Smile,
  Zap,
  Angry,
  Meh,
  Frown,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { NutrientGuide } from '@/components/womens-health/nutrient-guide';

export default function WomensHealthPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-1.5">
        <h2 className="text-2xl font-bold tracking-tight">
          Women's Health Dashboard
        </h2>
        <p className="text-muted-foreground">
          Your personal space for cycle tracking and wellness insights.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cycle Calendar</CardTitle>
              <CardDescription>
                Track your cycle and view predictions. Today is{' '}
                <Badge variant="secondary">Period: Day 2</Badge>.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar
                mode="single"
                selected={new Date()}
                className="rounded-md border"
              />
            </CardContent>
            <CardFooter className="gap-2">
              <Button variant="outline">Edit Period Dates</Button>
              <p className="text-xs text-muted-foreground">
                Previous Cycle: 29 days (Regular)
              </p>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Daily Log</CardTitle>
              <CardDescription>
                How are you feeling today? Log your symptoms and mood.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Symptoms</Label>
                <div className="flex flex-wrap gap-4">
                  {[
                    'Cramps',
                    'Bloating',
                    'Headache',
                    'Fatigue',
                    'Acne',
                    'Nausea',
                    'Tender Breasts'
                  ].map((symptom) => (
                    <div key={symptom} className="flex items-center space-x-2">
                      <Checkbox id={`symptom-${symptom}`} />
                      <Label htmlFor={`symptom-${symptom}`} className="font-normal">
                        {symptom}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Mood</Label>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Smile />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Meh />
                  </Button>
                   <Button variant="outline" size="icon">
                    <Frown />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Angry />
                  </Button>
                </div>
              </div>
                 <div className="space-y-2">
                <Label>Flow</Label>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Droplets className="text-red-300"/>
                  </Button>
                  <Button variant="outline" size="icon">
                    <Droplets className="text-red-400"/>
                  </Button>
                   <Button variant="outline" size="icon">
                    <Droplets className="text-red-600"/>
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Today's Log</Button>
            </CardFooter>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle>PCOS & Hormonal Health Check</CardTitle>
               <CardDescription>A quick check-in for your hormonal wellness.</CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                <Zap className="h-4 w-4" />
                <AlertTitle>Self-Assessment Available</AlertTitle>
                <AlertDescription>
                  Take a 5-minute guided check to review symptoms related to hormonal health. This is not a diagnosis.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Start Assessment</Button>
            </CardFooter>
          </Card>

        </div>
        <div className="space-y-6">
          <Card className="bg-primary/10 border-primary/20">
            <CardHeader>
              <CardTitle>Daily Insight</CardTitle>
              <CardDescription>Phase: Menstrual</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="font-semibold">Energy Levels May Be Lower</p>
              <p className="text-sm text-muted-foreground">
                It's normal to feel more tired during your period. Your body is working hard. Prioritize
                rest and consider light exercise like walking or stretching to ease discomfort.
              </p>
            </CardContent>
          </Card>

          <NutrientGuide currentPhase="Menstrual" />

          <Card>
            <CardHeader>
              <CardTitle>Period Pain Management</CardTitle>
              <CardDescription>
                Experiencing cramps? Here are some tips to help.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="list-disc pl-5 text-sm space-y-2 text-muted-foreground">
                <li>Apply a heating pad to your lower abdomen.</li>
                <li>Stay hydrated by drinking plenty of water.</li>
                <li>Try gentle stretches or a warm bath.</li>
                <li>Consider over-the-counter pain relief if needed.</li>
                <li>Avoid caffeine and salty foods which can worsen bloating.</li>
              </ul>
              <p className="text-xs text-muted-foreground pt-2">
                If pain is severe or unusual, please consult a doctor.
              </p>
            </CardContent>
            <CardFooter>
                <Button className="w-full" variant="secondary">Manage the pain</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
