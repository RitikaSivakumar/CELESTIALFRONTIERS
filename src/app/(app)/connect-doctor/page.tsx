import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';

const doctors = [
  {
    name: 'Dr. Emily Carter',
    specialty: 'Clinical Psychologist',
    image: 'https://i.pravatar.cc/150?img=1',
  },
  {
    name: 'Dr. Ben Miller',
    specialty: 'Psychiatrist',
    image: 'https://i.pravatar.cc/150?img=2',
  },
  {
    name: 'Dr. Olivia Chen',
    specialty: 'Mental Health Counselor',
    image: 'https://i.pravatar.cc/150?img=3',
  },
];

export default function ConnectDoctorPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-1.5">
        <h2 className="text-2xl font-bold tracking-tight">
          Connect with a Doctor
        </h2>
        <p className="text-muted-foreground">
          Based on your assessment, we recommend speaking with a professional.
          Here are some matches.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doctor) => (
          <Card key={doctor.name}>
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
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                <Phone className="mr-2 h-4 w-4" /> Schedule a Call
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
