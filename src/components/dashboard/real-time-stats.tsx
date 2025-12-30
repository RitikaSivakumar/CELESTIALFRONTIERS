'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { HeartPulse, Thermometer, Zap, Wind, Footprints } from 'lucide-react';

type StatCardProps = {
  title: string;
  value: string | number;
  unit: string;
  icon: React.ElementType;
  loading: boolean;
};

function StatCard({ title, value, unit, icon: Icon, loading }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-8 w-24" />
        ) : (
          <div className="text-2xl font-bold">
            {value} <span className="text-xs font-normal text-muted-foreground">{unit}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function RealTimeStats() {
  const [vitals, setVitals] = useState({
    heartRate: 0,
    skinTemp: 0,
    skinConductance: 0,
    breathingRate: 0,
    movement: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVitals({
        heartRate: Math.floor(Math.random() * 41) + 60, // 60-100 bpm
        skinTemp: parseFloat((Math.random() * 2 + 36).toFixed(1)), // 36.0-38.0°C
        skinConductance: parseFloat((Math.random() * 10).toFixed(2)), // 0-10 µS
        breathingRate: Math.floor(Math.random() * 9) + 12, // 12-20 breaths/min
        movement: Math.floor(Math.random() * 500) + 2000, // 2000-2500 steps
      });
      setLoading(false);
    }, 2000); // Simulate real-time updates

    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      <StatCard title="Heart Rate" value={vitals.heartRate} unit="bpm" icon={HeartPulse} loading={loading} />
      <StatCard title="Skin Temperature" value={vitals.skinTemp} unit="°C" icon={Thermometer} loading={loading} />
      <StatCard title="Skin Conductance" value={vitals.skinConductance} unit="μS" icon={Zap} loading={loading} />
      <StatCard title="Breathing Rate" value={vitals.breathingRate} unit="/min" icon={Wind} loading={loading} />
      <StatCard title="Movement" value={vitals.movement} unit="steps" icon={Footprints} loading={loading} />
    </div>
  );
}
