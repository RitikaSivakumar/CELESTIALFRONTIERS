'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '../ui/badge';
import { Phone, MessageSquare, Video } from 'lucide-react';

const patient = {
  name: 'John Doe',
  age: 72,
  image: 'https://i.pravatar.cc/150?img=11',
};

export function PatientInfo() {
  const { toast } = useToast();

  const handleSaveNote = () => {
    toast({
      title: 'Note Saved',
      description: `Your note for ${patient.name} has been saved.`,
    });
  };

  const handleActionClick = (action: string) => {
    toast({
      title: 'Action Triggered',
      description: `Starting a ${action} with ${patient.name}.`,
    });
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={patient.image} alt={patient.name} />
          <AvatarFallback>
            {patient.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-xl">{patient.name}</CardTitle>
          <CardDescription>Age: {patient.age}</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => handleActionClick('Chat')}>
                <MessageSquare className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => handleActionClick('Voice Call')}>
                <Phone className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => handleActionClick('Video Call')}>
                <Video className="h-5 w-5" />
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            Doctor's Notes
          </p>
          <Textarea placeholder={`Add a private note for ${patient.name}...`} />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveNote}>Save Note</Button>
      </CardFooter>
    </Card>
  );
}
