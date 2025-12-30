'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  MessageSquare,
  Wind,
  Users,
  BarChart3,
  HeartPulse,
  ClipboardCheck,
  Gamepad2,
  Stethoscope,
  HeartHandshake,
  Settings,
} from 'lucide-react';

import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { AppHeader } from '@/components/app-header';
import { useUser } from '@/lib/hooks/use-user';
import { cn } from '@/lib/utils';
import { Separator } from './ui/separator';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/assessment', label: 'Assessment', icon: ClipboardCheck },
  { href: '/womens-health', label: "Women's Health", icon: HeartHandshake, gender: 'Female' },
  { href: '/chatbot', label: 'AI Coach', icon: MessageSquare },
  { href: '/wellness', label: 'Wellness', icon: Wind },
  { href: '/games', label: 'Games', icon: Gamepad2 },
  { href: '/community', label: 'Community', icon: Users, public: true },
  { href: '/reports', label: 'Reports', icon: BarChart3 },
  { href: '/settings', label: 'Settings', icon: Settings },
];

const doctorNavItems = [
    { href: '/doctor-dashboard', label: 'Doctor View', icon: Stethoscope },
]

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, publicMode } = useUser();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <HeartPulse className="w-6 h-6 text-primary" />
            <span className="text-lg font-semibold font-headline">
              WellGuard
            </span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => {
              if (item.public && !publicMode) {
                return null;
              }
              if (item.gender && item.gender !== user?.gender) {
                return null;
              }
              return (
                <SidebarMenuItem key={item.href}>
                  <Link href={item.href}>
                    <SidebarMenuButton
                      isActive={pathname.startsWith(item.href)}
                      tooltip={item.label}
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
          <Separator className="my-4" />
           <SidebarMenu>
            {doctorNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <Link href={item.href}>
                    <SidebarMenuButton
                      isActive={pathname.startsWith(item.href)}
                      tooltip={item.label}
                      variant="outline"
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              )
            )}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset
        className={cn(
          'min-h-[calc(100svh_-_theme(spacing.4))] m-0 md:m-2 md:rounded-xl'
        )}
      >
        <div className="flex flex-col h-full">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
            <SidebarTrigger className="md:hidden" />
            <AppHeader />
          </header>
          <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
