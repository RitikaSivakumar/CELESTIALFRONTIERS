'use client';

import { HealthAssessment } from '@/components/dashboard/health-assessment';
import { SensorChart } from '@/components/dashboard/sensor-chart';
import { RealTimeStats } from '@/components/dashboard/real-time-stats';
import { PatientInfo } from '@/components/doctor-dashboard/patient-info';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import { ShieldAlert, Video, BarChartHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DoctorDashboardPage() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex flex-col space-y-1.5">
        <h2 className="text-2xl font-bold tracking-tight">Doctor Dashboard</h2>
        <p className="text-muted-foreground">Viewing patient: John Doe</p>
      </div>

      <Alert variant="destructive" className="items-start">
        <ShieldAlert className="h-5 w-5" />
        <div className="flex-1">
          <AlertTitle>Emergency Alert Triggered!</AlertTitle>
          <AlertDescription>
            John Doe has activated their emergency key. Immediate attention may be
            required. Patient's real-time data stream is now prioritized.
          </AlertDescription>
          <div className="mt-4 flex gap-4">
            <Button>
              <Video className="mr-2 h-4 w-4" /> Connect via Video
            </Button>
            <Button variant="outline">
              <BarChartHorizontal className="mr-2 h-4 w-4" /> View Critical Data
            </Button>
          </div>
        </div>
      </Alert>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4 space-y-4">
          <PatientInfo />
          <RealTimeStats />
          <SensorChart />
        </div>
        <div className="lg:col-span-3 space-y-4">
          <HealthAssessment />
        </div>
      </div>
    </div>
  );
}
