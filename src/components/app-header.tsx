'use client';

import { Bell, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUser } from '@/lib/hooks/use-user';
import { Switch } from '@/components/ui/switch';
import { Label } from './ui/label';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function AppHeader() {
  const { user, publicMode, setPublicMode, setUser } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    setUser(null);
    router.push('/');
  };

  return (
    <div className="w-full flex items-center gap-4">
      <div>
        <h1 className="text-lg font-semibold md:text-xl">
          Welcome back, {user?.name}!
        </h1>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="public-mode"
            checked={publicMode}
            onCheckedChange={setPublicMode}
          />
          <Label htmlFor="public-mode" className="text-sm text-muted-foreground">
            Public Support Mode
          </Label>
        </div>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full h-8 w-8">
              <UserCircle className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/settings" passHref>
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </Link>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
