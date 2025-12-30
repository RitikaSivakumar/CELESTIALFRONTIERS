'use client';

import { HealthAssessment } from '@/components/dashboard/health-assessment';
import { SensorChart } from '@/components/dashboard/sensor-chart';
import { RealTimeStats } from '@/components/dashboard/real-time-stats';
import { PatientInfo } from '@/components/doctor-dashboard/patient-info';

export default function DoctorDashboardPage() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex flex-col space-y-1.5">
        <h2 className="text-2xl font-bold tracking-tight">Doctor Dashboard</h2>
        <p className="text-muted-foreground">
          Viewing patient: John Doe
        </p>
      </div>
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
