'use client';

import React, { useState } from 'react';
import { ChefAvatar } from '@/components/shared/ChefAvatar';
import { MenuBoard } from './MenuBoard';
import { CategoryView } from './CategoryView';
import { ActivityDetail } from './ActivityDetail';
import { MenuEditor } from './MenuEditor';
import { Activity, ActivityCategory } from '@/types';
import { Button } from '@/components/ui/button';
import { useMenu } from '@/context/MenuContext';
import { Settings, Pencil } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

type DashboardView = 'menu' | 'category' | 'activity' | 'edit';

export const Dashboard = () => {
  const [view, setView] = useState<DashboardView>('menu');
  const [selectedCategory, setSelectedCategory] = useState<ActivityCategory | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const { userProfile, updatePreferences } = useMenu();

  const handleCategorySelect = (category: ActivityCategory) => {
    setSelectedCategory(category);
    setView('category');
  };

  const handleActivitySelect = (activity: Activity) => {
    setSelectedActivity(activity);
    setView('activity');
  };

  const handleRandomize = () => {
    const all = userProfile.menu;
    if (all.length === 0) return;
    const random = all[Math.floor(Math.random() * all.length)];
    setSelectedActivity(random);
    setView('activity');
  };
  
  const handleBackToMenu = () => {
      setView('menu');
      setSelectedCategory(null);
  };
  
  const handleBackToCategory = () => {
      setView('category');
      setSelectedActivity(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 min-h-screen flex flex-col">
       <header className="py-6 flex items-center justify-between">
         <div className="flex items-center gap-3">
             <ChefAvatar className="text-4xl" />
             <h1 className="text-2xl font-bold text-primary">Dopamenu</h1>
         </div>
         <div className="flex items-center gap-2">
             {view === 'menu' && (
                 <>
                    <Button onClick={handleRandomize} variant="default" className="bg-secondary text-secondary-foreground hover:bg-secondary/80 cursor-pointer hidden sm:flex">
                        Chef's Surprise! 🎲
                    </Button>
                    <Button onClick={() => setView('edit')} variant="ghost" size="icon" className="cursor-pointer" title="Edit Menu">
                        <Pencil className="w-5 h-5" />
                    </Button>
                 </>
             )}
             <Dialog>
                <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="cursor-pointer" title="Settings">
                        <Settings className="w-5 h-5" />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Restaurant Settings</DialogTitle>
                    </DialogHeader>
                    <div className="flex items-center space-x-2 py-4">
                        <Switch 
                            id="quiet-mode" 
                            checked={userProfile.preferences.quietMode} 
                            onCheckedChange={(c) => updatePreferences({ quietMode: c })} 
                        />
                        <Label htmlFor="quiet-mode">Quiet Mode (Reduce Animations)</Label>
                    </div>
                </DialogContent>
             </Dialog>
         </div>
       </header>
       
       <main className="flex-1">
         {view === 'menu' && (
            <>
                <div className="sm:hidden mb-6 flex justify-center">
                    <Button onClick={handleRandomize} variant="default" className="bg-secondary text-secondary-foreground hover:bg-secondary/80 w-full cursor-pointer">
                        Chef's Surprise! 🎲
                    </Button>
                </div>
                <MenuBoard onSelectCategory={handleCategorySelect} />
            </>
         )}
         {view === 'category' && selectedCategory && (
             <CategoryView 
                category={selectedCategory} 
                onSelectActivity={handleActivitySelect} 
                onBack={handleBackToMenu}
             />
         )}
         {view === 'activity' && selectedActivity && (
             <ActivityDetail 
                activity={selectedActivity} 
                onBack={selectedCategory ? handleBackToCategory : handleBackToMenu}
                onComplete={handleBackToMenu}
             />
         )}
         {view === 'edit' && (
             <MenuEditor onBack={handleBackToMenu} />
         )}
       </main>
    </div>
  );
};
