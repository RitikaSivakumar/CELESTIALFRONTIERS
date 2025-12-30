import { BreathingExercise } from '@/components/wellness/breathing-exercise';
import { ContentGrid } from '@/components/wellness/content-grid';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function WellnessPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-1.5">
        <h2 className="text-2xl font-bold tracking-tight">Wellness Center</h2>
        <p className="text-muted-foreground">
          Tools and content to help you relax and find balance.
        </p>
      </div>

      <Tabs defaultValue="exercise" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="exercise">Mindful Exercises</TabsTrigger>
          <TabsTrigger value="content">Relaxing Content</TabsTrigger>
        </TabsList>
        <TabsContent value="exercise">
          <Card>
            <CardHeader>
              <CardTitle>Box Breathing</CardTitle>
              <CardDescription>
                A simple technique to calm your nervous system. Follow the
                visual guide.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BreathingExercise />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Calm Scenery</CardTitle>
              <CardDescription>
                Take a moment to immerse yourself in these peaceful scenes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContentGrid />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
