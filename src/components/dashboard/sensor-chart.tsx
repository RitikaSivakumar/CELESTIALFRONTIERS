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
  spo2: number;
  gsr: number;
};

const generateDataPoint = (): Omit<SensorDataPoint, 'time'> => ({
  heartRate: Math.floor(Math.random() * 41) + 60, // 60-100 bpm
  spo2: Math.floor(Math.random() * 5) + 95, // 95-99%
  gsr: parseFloat((Math.random() * 5 + 1).toFixed(2)), // 1-6 µS
});

export function SensorChart() {
  const [data, setData] = useState<SensorDataPoint[]>([]);

  const chartConfig = {
    heartRate: {
      label: "Heart Rate",
      color: "hsl(var(--chart-1))",
    },
    spo2: {
      label: "SpO2",
      color: "hsl(var(--chart-2))",
    },
    gsr: {
      label: "GSR",
      color: "hsl(var(--chart-3))",
    },
  }

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
          Live feed from your wearable device (simulated).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{
                  top: 5,
                  right: 20,
                  left: 20,
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
                  label={{ value: 'BPM / %', angle: -90, position: 'insideLeft', offset: -10, style: { textAnchor: 'middle', fill: 'hsl(var(--muted-foreground))' } }}
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
                  label={{ value: 'µS', angle: 90, position: 'insideRight', offset: -10, style: { textAnchor: 'middle', fill: 'hsl(var(--muted-foreground))' } }}
                />
                <Tooltip
                  content={<ChartTooltipContent hideLabel />}
                  cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 2, strokeDasharray: '3 3' }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="heartRate"
                  stroke="var(--color-heartRate)"
                  strokeWidth={2}
                  dot={false}
                  name="Heart Rate"
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="spo2"
                  stroke="var(--color-spo2)"
                  strokeWidth={2}
                  dot={false}
                  name="SpO2"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="gsr"
                  stroke="var(--color-gsr)"
                  strokeWidth={2}
                  dot={false}
                  name="GSR"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
