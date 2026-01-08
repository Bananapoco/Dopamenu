'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useMenu } from '@/context/MenuContext';
import { ActivityCategory, Activity } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Lightbulb, ArrowLeft, Save } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AIRecommendations } from '@/components/setup/AIRecommendations';

const CATEGORIES: { id: ActivityCategory; title: string; description: string; examples: string }[] = [
  { id: 'appetizer', title: 'Appetizers', description: 'Quick dopamine hits (1-5 mins).', examples: 'Jumping jacks, favorite song.' },
  { id: 'entree', title: 'Entrées', description: 'Engaging activities (10-30 mins).', examples: 'Instrument, brisk walk.' },
  { id: 'side', title: 'Sides', description: 'Pairable boosters.', examples: 'Podcast, fidget toy.' },
  { id: 'dessert', title: 'Desserts', description: 'Tempting quick fixes.', examples: 'Social media, games.' },
  { id: 'special', title: 'Specials', description: 'Rare treats.', examples: 'Concert, massage.' },
];

export const MenuEditor = ({ onBack }: { onBack: () => void }) => {
  const { addActivity, removeActivity, getActivitiesByCategory } = useMenu();
  const [activeTab, setActiveTab] = useState<string>('appetizer');
  const [newItemName, setNewItemName] = useState('');
  const [showAI, setShowAI] = useState(false);

  // Derive current category from active tab
  const currentCategory = CATEGORIES.find(c => c.id === activeTab) || CATEGORIES[0];
  const items = getActivitiesByCategory(currentCategory.id);

  const handleAddItem = () => {
    if (!newItemName.trim()) return;
    const newActivity: Activity = {
      id: crypto.randomUUID(),
      name: newItemName,
      category: currentCategory.id,
      duration: 5,
      effort: 'low',
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

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center gap-4 mb-4">
        <Button variant="ghost" size="icon" onClick={onBack} type="button" className="cursor-pointer">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h2 className="text-3xl font-bold text-primary">Edit Menu</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-secondary/30 p-1 rounded-lg">
          {CATEGORIES.map(cat => (
            <TabsTrigger 
                key={cat.id} 
                value={cat.id} 
                className="text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground cursor-pointer"
            >
              {cat.title}
            </TabsTrigger>
          ))}
        </TabsList>

        <Card className="mt-6 border-2 border-primary/10">
          <CardHeader>
            <CardTitle>{currentCategory.title}</CardTitle>
            <CardDescription>{currentCategory.description} <span className="italic">Ex: {currentCategory.examples}</span></CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             {/* Add New Item */}
             <div className="flex space-x-2">
              <Input 
                value={newItemName} 
                onChange={(e) => setNewItemName(e.target.value)} 
                placeholder={`Add new ${currentCategory.title.toLowerCase().slice(0, -1)}...`}
                onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
              />
              <Button onClick={handleAddItem} type="button" className="cursor-pointer">Add</Button>
            </div>

            <Button variant="outline" type="button" className="w-full gap-2 text-primary cursor-pointer" onClick={() => setShowAI(true)}>
                <Lightbulb className="w-4 h-4" /> Need Ideas?
            </Button>

            <ScrollArea className="h-[300px] w-full rounded-md border border-border p-4 bg-background/50">
              {items.length === 0 ? (
                <p className="text-center text-muted-foreground text-sm py-12">No items yet.</p>
              ) : (
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item.id} className="flex justify-between items-center bg-card border border-border/50 p-3 rounded-md shadow-sm animate-in fade-in duration-300">
                      <span className="font-medium">{item.name}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        type="button"
                        onClick={() => removeActivity(item.id)} 
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </ScrollArea>
          </CardContent>
          <CardFooter className="flex justify-end">
             <Button onClick={onBack} size="lg" className="cursor-pointer gap-2">
                 <Save className="w-4 h-4" /> Save & Close
             </Button>
          </CardFooter>
        </Card>
      </Tabs>

      <AIRecommendations 
        isOpen={showAI} 
        onClose={() => setShowAI(false)} 
        category={currentCategory.id}
        categoryTitle={currentCategory.title}
        onAdd={handleAIAdd}
      />
    </div>
  );
};
