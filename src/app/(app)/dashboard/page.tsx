import { HealthAssessment } from '@/components/dashboard/health-assessment';
import { Interventions } from '@/components/dashboard/interventions';
import { SensorChart } from '@/components/dashboard/sensor-chart';

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <HealthAssessment />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-12 lg:col-span-4">
          <SensorChart />
        </div>
        <div className="col-span-12 lg:col-span-3">
          <Interventions />
        </div>
      </div>
    </div>
  );
}
