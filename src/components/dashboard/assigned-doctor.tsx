'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Phone,
  MessageSquare,
  Video,
  ShieldAlert,
  HelpCircle,
  Smile,
} from 'lucide-react';
import { Badge } from '../ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const doctor = {
  name: 'Dr. Emily Carter',
  specialty: 'Clinical Psychologist',
  image: 'https://i.pravatar.cc/150?img=1',
  availability: 'Online',
};

const quickPhrases = [
  { text: "I'm feeling anxious", icon: HelpCircle },
  { text: 'I need to talk', icon: MessageSquare },
  { text: 'I am feeling better', icon: Smile },
];

export function AssignedDoctor() {
  const { toast } = useToast();

  const handleActionClick = (action: string) => {
    toast({
      title: 'Action Triggered',
      description: `Your request to "${action}" has been sent to ${doctor.name}.`,
    });
  };

  const handleEmergency = () => {
    toast({
      variant: 'destructive',
      title: 'Emergency Alert Sent!',
      description: `${doctor.name} has been notified and granted temporary priority access to your real-time data.`,
    });
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="items-center text-center">
        <Avatar className="w-24 h-24 mb-4">
          <AvatarImage src={doctor.image} alt={doctor.name} />
          <AvatarFallback>
            {doctor.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
        <CardTitle>{doctor.name}</CardTitle>
        <CardDescription>{doctor.specialty}</CardDescription>
        <Badge
          variant={
            doctor.availability === 'Online' ? 'default' : 'secondary'
          }
          className={
            doctor.availability === 'Online'
              ? 'bg-green-500 hover:bg-green-600 text-primary-foreground'
              : ''
          }
        >
          {doctor.availability}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            Quick Actions
          </p>
          <div className="grid grid-cols-1 gap-2">
            {quickPhrases.map((phrase) => (
              <Button
                key={phrase.text}
                variant="outline"
                className="justify-start"
                onClick={() => handleActionClick(phrase.text)}
              >
                <phrase.icon className="mr-2 h-4 w-4" />
                {phrase.text}
              </Button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            Connect
          </p>
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleActionClick('Chat')}
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleActionClick('Voice Call')}
            >
              <Phone className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleActionClick('Video Call')}
            >
              <Video className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="w-full mt-4">
              <ShieldAlert className="mr-2 h-5 w-5" />
              Emergency Key
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Activate Emergency Mode?</AlertDialogTitle>
              <AlertDialogDescription>
                This will immediately alert your assigned doctor,{' '}
                <strong>{doctor.name}</strong>, and grant them temporary,
                priority access to your real-time health data. Only use this in
                a critical situation.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                onClick={handleEmergency}
              >
                Confirm Emergency
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}
