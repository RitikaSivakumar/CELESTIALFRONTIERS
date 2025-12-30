'use client';

import { useEffect, useState } from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

type SensorDataPoint = {
  time: string;
  heartRate: number;
  gsr: number;
};

const generateDataPoint = (): Omit<SensorDataPoint, 'time'> => ({
  heartRate: Math.floor(Math.random() * 41) + 60, // 60-100 bpm
  gsr: parseFloat((Math.random() * 5 + 1).toFixed(2)), // 1-6 µS
});

export function SensorChart() {
  const [data, setData] = useState<SensorDataPoint[]>([]);

  useEffect(() => {
    // Initial data fill
    const initialData: SensorDataPoint[] = [];
    for (let i = 9; i >= 0; i--) {
      const d = new Date();
      d.setSeconds(d.getSeconds() - i * 5);
      initialData.push({
        time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        ...generateDataPoint(),
      });
    }
    setData(initialData);

    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [
          ...prevData.slice(1),
          {
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            ...generateDataPoint(),
          },
        ];
        return newData;
      });
    }, 5000); // Add new data point every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Real-Time Vitals</CardTitle>
        <CardDescription>
          Live feed from your wearable device.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ChartContainer config={{}}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="time"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  yAxisId="left"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                  domain={[50, 110]}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value.toFixed(1)}`}
                  domain={[0, 8]}
                />
                <Tooltip
                  content={<ChartTooltipContent hideLabel />}
                  cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 2, strokeDasharray: '3 3' }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="heartRate"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  dot={false}
                  name="Heart Rate (BPM)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="gsr"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  dot={false}
                  name="Skin Response (µS)"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}