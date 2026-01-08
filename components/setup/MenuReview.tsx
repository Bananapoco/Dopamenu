'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useMenu } from '@/context/MenuContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ActivityCategory } from '@/types';

const CATEGORIES: { id: ActivityCategory; title: string }[] = [
  { id: 'appetizer', title: 'Appetizers' },
  { id: 'entree', title: 'Entrées' },
  { id: 'side', title: 'Sides' },
  { id: 'dessert', title: 'Desserts' },
  { id: 'special', title: 'Specials' },
];

export const MenuReview = ({ onComplete }: { onComplete: () => void }) => {
  const { userProfile } = useMenu();

  return (
    <Card className="animate-in zoom-in duration-300 w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Your Dopamenu Preview</CardTitle>
        <CardDescription>Here's your personalized menu. Ready to open for business?</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-6">
            {CATEGORIES.map((cat) => {
              const items = userProfile.menu.filter(a => a.category === cat.id);
              if (items.length === 0) return null;
              
              return (
                <div key={cat.id} className="space-y-2">
                  <h3 className="font-semibold text-primary border-b border-primary/20 pb-1">{cat.title}</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {items.map(item => (
                      <li key={item.id} className="bg-muted p-2 rounded text-sm flex items-center before:content-['•'] before:mr-2 before:text-primary">
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
            
            {userProfile.menu.length === 0 && (
                <p className="text-center text-muted-foreground italic">Your menu is empty! Go back and add some tasty activities.</p>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <Button onClick={onComplete} className="w-full text-lg py-6 cursor-pointer" disabled={userProfile.menu.length === 0}>
            Open My Dopamenu Restaurant 🍽️
        </Button>
      </CardFooter>
    </Card>
  );
};
