'use client';

import { HealthAssessment } from '@/components/dashboard/health-assessment';
import { Interventions } from '@/components/dashboard/interventions';
import { SensorChart } from '@/components/dashboard/sensor-chart';
import { RealTimeStats } from '@/components/dashboard/real-time-stats';
import { useUser } from '@/lib/hooks/use-user';

export default function DashboardPage() {
  const { publicMode } = useUser();

  return (
    <div className="flex-1 space-y-4">
      <RealTimeStats />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4 space-y-4">
          <SensorChart />
        </div>
        <div className="lg:col-span-3 space-y-4">
          <HealthAssessment />
          <Interventions />
        </div>
      </div>
    </div>
  );
}
