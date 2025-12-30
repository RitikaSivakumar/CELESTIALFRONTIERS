import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BarChart3 } from 'lucide-react';

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-1.5">
        <h2 className="text-2xl font-bold tracking-tight">Health Reports</h2>
        <p className="text-muted-foreground">
          Track your wellness journey over time.
        </p>
      </div>
      <Alert>
        <BarChart3 className="h-4 w-4" />
        <AlertTitle>Coming Soon!</AlertTitle>
        <AlertDescription>
          Daily and weekly health reports will be available here to help you and
          your assigned doctor track trends, improvements, and risk levels.
        </AlertDescription>
      </Alert>
    </div>
  );
}
