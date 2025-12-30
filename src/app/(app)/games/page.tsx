import {
  BookHeart,
  Palette,
  Music,
  Layers,
  Bike,
  Wind,
  Gamepad2,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const games = [
  {
    title: 'Gratitude Journal',
    prompt:
      'Write down three things you are grateful for today and share one with a friend.',
    icon: BookHeart,
    toast: {
      title: 'Gratitude Shared!',
      description: 'A great way to connect and lift spirits.',
    },
  },
  {
    title: 'Coloring Therapy',
    prompt:
      'Choose a coloring page and spend 15 minutes filling it with colors, focusing on each stroke.',
    icon: Palette,
    toast: {
      title: 'Creative Mind!',
      description: 'Coloring is a wonderful way to practice mindfulness.',
    },
  },
  {
    title: 'Mood Music',
    prompt: 'Pick a song that makes you happy and dance or sing along for 5 minutes.',
    icon: Music,
    toast: {
      title: 'Good Vibrations!',
      description: 'Music is a powerful tool to shift your mood.',
    },
  },
  {
    title: 'Positive Affirmation',
    prompt:
      'Draw a card and repeat the affirmation aloud three times, reflecting on its meaning.',
    icon: Layers,
    toast: {
      title: 'Power of Positivity!',
      description: 'Affirmations help build a positive mindset.',
    },
  },
  {
    title: 'Mini Exercise',
    prompt:
      'Do a 5-minute stretch or movement routine while focusing on how your body feels.',
    icon: Bike,
    toast: {
      title: 'Body & Mind!',
      description: 'A little movement can make a big difference.',
    },
  },
  {
    title: 'Mindful Breathing',
    prompt:
      'Take 10 deep breaths, counting each inhale and exhale, focusing only on your breathing.',
    icon: Wind,
    toast: {
      title: 'Well Done!',
      description: 'You just took a great step to calm your mind.',
    },
  },
];

export default function GamesPage() {
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-1.5">
        <h2 className="text-2xl font-bold tracking-tight">Wellness Games</h2>
        <p className="text-muted-foreground">
          Engage in these simple activities to boost your mood and well-being.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <Card key={game.title}>
            <CardHeader className="flex flex-row items-center gap-4 space-y-0">
              <game.icon className="w-8 h-8 text-primary" />
              <CardTitle>{game.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{game.prompt}</p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => toast(game.toast)}
              >
                I Did It!
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
