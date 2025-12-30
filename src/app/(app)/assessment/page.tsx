'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useRouter } from 'next/navigation';

const questions = [
  'Feeling nervous, anxious, or on edge',
  'Not being able to stop or control worrying',
  'Worrying too much about different things',
  'Trouble relaxing',
  'Being so restless that it is hard to sit still',
  'Becoming easily annoyed or irritable',
  'Feeling afraid as if something awful might happen',
];

const options = [
  { label: 'Not at all', value: 0 },
  { label: 'Several days', value: 1 },
  { label: 'More than half the days', value: 2 },
  { label: 'Nearly every day', value: 3 },
];

const formSchema = z.object({
  answers: z.array(z.number().min(0).max(3)).length(questions.length, {
    message: 'Please answer all questions.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function AssessmentPage() {
  const router = useRouter();
  const [score, setScore] = useState<number | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      answers: Array(questions.length).fill(undefined),
    },
  });

  function onSubmit(data: FormValues) {
    const totalScore = data.answers.reduce((sum, val) => sum + val, 0);
    setScore(totalScore);
  }

  const renderResult = () => {
    if (score === null) return null;

    if (score <= 4) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Minimal Anxiety</CardTitle>
            <CardDescription>Your assessment score is {score}.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              This is great news! Your score suggests you are experiencing
              minimal to no anxiety. Keep up with your positive habits and
              self-care routines.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push('/dashboard')}>
              Back to Dashboard
            </Button>
          </CardFooter>
        </Card>
      );
    } else if (score <= 9) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Mild Anxiety</CardTitle>
            <CardDescription>Your assessment score is {score}.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Your score suggests you may be experiencing mild anxiety. This is
              a good time to focus on self-care. Here are some suggestions:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Try the{' '}
                <Button
                  variant="link"
                  className="p-0 h-auto"
                  onClick={() => router.push('/wellness')}
                >
                  Breathing Exercise
                </Button>{' '}
                in the Wellness Center.
              </li>
              <li>
                Consider writing down your thoughts in a journal using our AI
                Coach.
              </li>
              <li>
                Engage in a light physical activity like a short walk.
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push('/dashboard')}>
              Back to Dashboard
            </Button>
          </CardFooter>
        </Card>
      );
    } else {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Moderate to Severe Anxiety</CardTitle>
            <CardDescription>Your assessment score is {score}.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Your score suggests you are experiencing a significant level of
              anxiety. It may be beneficial to speak with a professional. We
              can help you connect with a verified doctor.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push('/connect-doctor')}>
              Connect with a Doctor
            </Button>
          </CardFooter>
        </Card>
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-1.5">
        <h2 className="text-2xl font-bold tracking-tight">
          Mental Wellness Check-in
        </h2>
        <p className="text-muted-foreground">
          Over the last 2 weeks, how often have you been bothered by the
          following problems? (GAD-7)
        </p>
      </div>

      {score === null ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardContent className="p-6 space-y-6">
                {questions.map((question, qIndex) => (
                  <FormField
                    key={qIndex}
                    control={form.control}
                    name={`answers.${qIndex}`}
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>{`${qIndex + 1}. ${question}`}</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) => field.onChange(parseInt(value))}
                            defaultValue={field.value?.toString()}
                            className="flex flex-col space-y-1"
                          >
                            {options.map((option, oIndex) => (
                              <FormItem
                                key={oIndex}
                                className="flex items-center space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <RadioGroupItem
                                    value={option.value.toString()}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {option.label}
                                </FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </CardContent>
              <CardFooter>
                <Button type="submit">Submit Assessment</Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      ) : (
        renderResult()
      )}
    </div>
  );
}