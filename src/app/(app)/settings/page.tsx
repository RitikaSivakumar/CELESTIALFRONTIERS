'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { SettingsIcon } from '@/components/settings-icon';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <SettingsIcon className="h-8 w-8 text-primary" />
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Settings Corner</h2>
          <p className="text-muted-foreground">
            Manage your wearable and application preferences.
          </p>
        </div>
      </div>

      <Accordion type="multiple" defaultValue={['display', 'notifications']}>
        <Card>
          <AccordionItem value="display">
            <AccordionTrigger className="px-6">
              <div className="flex flex-col items-start">
                <CardTitle className="text-lg">Display &amp; Brightness</CardTitle>
                <CardDescription className="text-sm font-normal">
                  Customize your watch face and display settings.
                </CardDescription>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pt-2">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="brightness">Brightness</Label>
                  <div className="flex items-center gap-4 w-1/2">
                    <Slider id="brightness" defaultValue={[75]} max={100} step={1} />
                    <span>75%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="screen-timeout">Screen Timeout</Label>
                  <Select defaultValue="30s">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select timeout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15s">15 seconds</SelectItem>
                      <SelectItem value="30s">30 seconds</SelectItem>
                      <SelectItem value="1m">1 minute</SelectItem>
                      <SelectItem value="5m">5 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="always-on">Always-On Display</Label>
                  <Switch id="always-on" />
                </div>
                 <div className="flex items-center justify-between">
                  <Label htmlFor="font-size">Font Size</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Card>
        
        <Card className="mt-4">
          <AccordionItem value="notifications">
            <AccordionTrigger className="px-6">
              <div className="flex flex-col items-start">
                <CardTitle className="text-lg">Notifications & Alerts</CardTitle>
                <CardDescription className="text-sm font-normal">
                  Manage how you receive alerts and reminders.
                </CardDescription>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pt-2">
               <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="vibration">Vibration</Label>
                  <Switch id="vibration" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sound">Sound</Label>
                  <Switch id="sound" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="dnd">Do Not Disturb</Label>
                  <Switch id="dnd" />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Card>

        <Card className="mt-4">
          <AccordionItem value="health">
            <AccordionTrigger className="px-6">
              <div className="flex flex-col items-start">
                <CardTitle className="text-lg">Health &amp; Sensors</CardTitle>
                <CardDescription className="text-sm font-normal">
                  Control data collection and health alerts.
                </CardDescription>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pt-2">
               <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="hr-sensor">Heart Rate Sensor</Label>
                  <Switch id="hr-sensor" defaultChecked />
                </div>
                 <div className="flex items-center justify-between">
                  <Label htmlFor="eda-sensor">EDA Sensor</Label>
                  <Switch id="eda-sensor" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="temp-sensor">Temperature Sensor</Label>
                  <Switch id="temp-sensor" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sampling-freq">Data Sampling Frequency</Label>
                  <Select defaultValue="normal">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (Conserve Battery)</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="high">High (More Detail)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Card>

        <Card className="mt-4">
          <AccordionItem value="privacy">
             <AccordionTrigger className="px-6">
              <div className="flex flex-col items-start">
                <CardTitle className="text-lg">Privacy & Security</CardTitle>
                <CardDescription className="text-sm font-normal">
                  Manage data sharing and account security.
                </CardDescription>
              </div>
            </AccordionTrigger>
             <AccordionContent className="px-6 pt-2">
               <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="doctor-access">Doctor Data Access</Label>
                  <Switch id="doctor-access" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="caregiver-sharing">Caregiver Summary Sharing</Label>
                  <Switch id="caregiver-sharing" />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Emergency Access Rules</Label>
                   <Button variant="outline">Manage</Button>
                </div>
                <div className="flex items-center justify-between">
                  <Label>Export or Delete My Data</Label>
                   <Button variant="outline">Go</Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Card>
      </Accordion>
    </div>
  );
}
