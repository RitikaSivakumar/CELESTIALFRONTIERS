'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import './breathing-exercise.css';

const stages = [
  { text: 'Breathe In', duration: 4000 },
  { text: 'Hold', duration: 4000 },
  { text: 'Breathe Out', duration: 4000 },
  { text: 'Hold', duration: 4000 },
];

export function BreathingExercise() {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStageIndex((prevIndex) => (prevIndex + 1) % stages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentStage = stages[currentStageIndex];

  return (
    <div className="flex justify-center items-center h-64 w-full">
      <div className="relative flex items-center justify-center">
        <div
          className={cn(
            'breathing-circle bg-primary/20 rounded-full',
            {
              'animate-breathe-in': currentStage.text === 'Breathe In',
              'animate-breathe-out': currentStage.text === 'Breathe Out',
            }
          )}
        ></div>
        <div className="absolute text-center">
          <p className="text-2xl font-bold text-primary">
            {currentStage.text}
          </p>
          <p className="text-sm text-muted-foreground">for 4 seconds</p>
        </div>
      </div>
    </div>
  );
}
