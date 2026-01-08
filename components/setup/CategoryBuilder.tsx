'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useMenu } from '@/context/MenuContext';
import { ActivityCategory, Activity } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Lightbulb } from 'lucide-react';
import { AIRecommendations } from './AIRecommendations';

const CATEGORIES: { id: ActivityCategory; title: string; description: string; examples: string }[] = [
  { id: 'appetizer', title: 'Appetizers', description: 'Quick dopamine hits (1-5 mins, low effort).', examples: 'Jumping jacks, favorite song, quick stretch.' },
  { id: 'entree', title: 'Entrées', description: 'Engaging activities (10-30 mins, moderate effort).', examples: 'Playing an instrument, brisk walk, journaling.' },
  { id: 'side', title: 'Sides', description: 'Pairable boosters (low additional effort).', examples: 'Podcast, fidget toy, upbeat playlist.' },
  { id: 'dessert', title: 'Desserts', description: 'Tempting quick fixes (use sparingly).', examples: 'Social media scroll, video game session.' },
  { id: 'special', title: 'Specials', description: 'Rare treats (planned, higher effort/cost).', examples: 'Concert, massage, vacation outing.' },
];

export const CategoryBuilder = ({ onNext }: { onNext: () => void }) => {
  const { addActivity, removeActivity, getActivitiesByCategory } = useMenu();
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [newItemName, setNewItemName] = useState('');
  const [showAI, setShowAI] = useState(false);

  const currentCategory = CATEGORIES[currentCategoryIndex];
  const items = getActivitiesByCategory(currentCategory.id);

  const handleAddItem = () => {
    if (!newItemName.trim()) return;
    const newActivity: Activity = {
      id: crypto.randomUUID(),
      name: newItemName,
      category: currentCategory.id,
      duration: 5, // Default, editable later?
      effort: 'low', // Default
    };
    addActivity(newActivity);
    setNewItemName('');
  };

  const handleAIAdd = (items: string[]) => {
    items.forEach(name => {
      addActivity({
        id: crypto.randomUUID(),
        name,
        category: currentCategory.id,
        duration: 5,
        effort: 'low',
      });
    });
  };

  const handleNextCategory = () => {
    if (currentCategoryIndex < CATEGORIES.length - 1) {
      setCurrentCategoryIndex(prev => prev + 1);
    } else {
      onNext();
    }
  };
  
  const handlePrevCategory = () => {
      if (currentCategoryIndex > 0) {
          setCurrentCategoryIndex(prev => prev - 1);
      }
  }

  return (
    <Card className="animate-in slide-in-from-right duration-300">
      <CardHeader>
        <div className="flex justify-between items-center">
            <CardTitle>{currentCategory.title}</CardTitle>
            <span className="text-sm text-muted-foreground">{currentCategoryIndex + 1} / {CATEGORIES.length}</span>
        </div>
        <CardDescription>{currentCategory.description}</CardDescription>
        <p className="text-sm text-muted-foreground italic mt-2">Examples: {currentCategory.examples}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Input 
            value={newItemName} 
            onChange={(e) => setNewItemName(e.target.value)} 
            placeholder="Add an activity..." 
            onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
          />
          <Button onClick={handleAddItem} type="button" className="cursor-pointer">Add</Button>
        </div>
        
        <Button variant="outline" type="button" className="w-full gap-2 text-primary cursor-pointer" onClick={() => setShowAI(true)}>
            <Lightbulb className="w-4 h-4" /> Need Ideas?
        </Button>

        <ScrollArea className="h-[200px] w-full rounded-md border border-border p-4">
          {items.length === 0 ? (
            <p className="text-center text-muted-foreground text-sm py-8">No items yet. Add some above!</p>
          ) : (
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item.id} className="flex justify-between items-center bg-secondary/20 p-2 rounded-md animate-in fade-in duration-300">
                  <span>{item.name}</span>
                  <Button variant="ghost" size="icon" type="button" onClick={() => removeActivity(item.id)} className="h-8 w-8 text-destructive cursor-pointer">
                    <X className="w-4 h-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="secondary" type="button" onClick={handlePrevCategory} disabled={currentCategoryIndex === 0} className="cursor-pointer">Back</Button>
        <Button onClick={handleNextCategory} type="button" className="cursor-pointer">
            {currentCategoryIndex === CATEGORIES.length - 1 ? "Finish Menu" : "Next Category"}
        </Button>
      </CardFooter>

      <AIRecommendations 
        isOpen={showAI} 
        onClose={() => setShowAI(false)} 
        category={currentCategory.id}
        categoryTitle={currentCategory.title}
        onAdd={handleAIAdd}
      />
    </Card>
  );
};
