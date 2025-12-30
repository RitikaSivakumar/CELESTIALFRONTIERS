'use client';

import {
  getSmartIntervention,
  type SmartInterventionInput,
} from '@/ai/flows/smart-interventions-notifications';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useUser, type AgeGroup } from '@/lib/hooks/use-user';
import { Droplet, Pill, Sparkles, Activity } from 'lucide-react';
import { useState } from 'react';

export function Interventions() {
  const { toast } = useToast();
  const { ageGroup } = useUser();
  const [loading, setLoading] = useState(false);

  const handleSimpleToast = (title: string, description: string) => {
    toast({
      title,
      description,
    });
  };

  const handleSmartIntervention = async () => {
    if (!ageGroup) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'User information not available.',
      });
      return;
    }
    setLoading(true);
    try {
      const input: SmartInterventionInput = {
        // This is a generalized intervention, so we use a neutral state
        userState: 'Normal',
        ageGroup: ageGroup as AgeGroup,
      };
      const result = await getSmartIntervention(input);
      toast({
        title: 'A Boost for You!',
        description: result.message,
      });
    } catch (error) {
      console.error('Smart intervention failed:', error);
      toast({
        variant: 'destructive',
        title: 'AI Error',
        description: 'Could not generate a message at this time.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Actions</CardTitle>
        <CardDescription>
          Quick actions and reminders to support your well-being.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className="h-20 flex-col gap-2"
          onClick={() =>
            handleSimpleToast(
              'Hydration Reminder',
              "Time to drink a glass of water! Staying hydrated is key."
            )
          }
        >
          <Droplet className="w-6 h-6 text-primary" />
          <span>Hydrate</span>
        </Button>
        <Button
          variant="outline"
          className="h-20 flex-col gap-2"
          onClick={() =>
            handleSimpleToast(
              'Medication Reminder',
              "Don't forget to take your scheduled medication."
            )
          }
        >
          <Pill className="w-6 h-6 text-green-500" />
          <span>Medication</span>
        </Button>
        <Button
          variant="outline"
          className="h-20 flex-col gap-2"
          onClick={() =>
            handleSimpleToast(
              'Movement Reminder',
              "Time for a quick stretch or a short walk. Get that body moving!"
            )
          }
        >
          <Activity className="w-6 h-6 text-orange-500" />
          <span>Move</span>
        </Button>
        <Button
          variant="outline"
          className="h-20 flex-col gap-2"
          onClick={handleSmartIntervention}
          disabled={loading}
        >
          <Sparkles className="w-6 h-6 text-yellow-500" />
          <span>Get a Boost</span>
        </Button>
      </CardContent>
    </Card>
  );
}
