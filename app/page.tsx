'use client';

import { useMenu } from '@/context/MenuContext';
import { Wizard } from '@/components/setup/Wizard';
import { Dashboard } from '@/components/dashboard/Dashboard';

export default function Home() {
  const { userProfile } = useMenu();
  
  // Check if menu has items to determine if setup is complete
  const hasMenu = userProfile.menu.length > 0;

  return (
    <main className="min-h-screen bg-background text-foreground">
      {hasMenu ? <Dashboard /> : <Wizard />}
    </main>
  );
}
