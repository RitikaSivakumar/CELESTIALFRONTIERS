'use client';

import {
  getNutrientRecommendation,
  type NutrientRecommendationInput,
  type NutrientRecommendationOutput,
} from '@/ai/flows/nutrient-cycle-recommendation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { useEffect, useState } from 'react';
import { Leaf } from 'lucide-react';
import { Button } from '../ui/button';

type NutrientGuideProps = {
  currentPhase: 'Menstrual' | 'Follicular' | 'Ovulatory' | 'Luteal';
};

export function NutrientGuide({ currentPhase }: NutrientGuideProps) {
  const [data, setData] = useState<NutrientRecommendationOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecommendation() {
      setLoading(true);
      setError(null);
      try {
        const input: NutrientRecommendationInput = { cyclePhase: currentPhase };
        const result = await getNutrientRecommendation(input);
        setData(result);
      } catch (e) {
        console.error('Failed to get nutrient recommendation:', e);
        setError('Could not load dietary recommendations at this time.');
      } finally {
        setLoading(false);
      }
    }
    fetchRecommendation();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <Leaf className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
        <CardDescription>{data.summary}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.recommendations.map((rec, index) => (
          <div key={index}>
            <h4 className="font-semibold text-sm">{rec.nutrient}</h4>
            <p className="text-sm text-muted-foreground mb-2">
              {rec.reason}
            </p>
            <p className="text-sm">
              <span className="font-medium">Foods:</span>{' '}
              <span className="text-muted-foreground">{rec.foods.join(', ')}</span>
            </p>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full">Explore Recipes</Button>
      </CardFooter>
    </Card>
  );
}
