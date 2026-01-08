'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Activity, ActivityCategory } from '@/types';
import { useMenu } from '@/context/MenuContext';
import { ArrowLeft, Play } from 'lucide-react';

export const CategoryView = ({ category, onSelectActivity, onBack }: { category: ActivityCategory, onSelectActivity: (a: Activity) => void, onBack: () => void }) => {
  const { getActivitiesByCategory } = useMenu();
  const items = getActivitiesByCategory(category);

  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={onBack} size="icon" className="cursor-pointer">
                    <ArrowLeft className="w-6 h-6" />
                </Button>
                <h2 className="text-3xl font-bold capitalize">{category}s</h2>
            </div>
            {items.length > 1 && (
                <Button 
                    onClick={() => {
                        const random = items[Math.floor(Math.random() * items.length)];
                        onSelectActivity(random);
                    }} 
                    className="bg-secondary text-secondary-foreground hover:bg-secondary/80 cursor-pointer"
                >
                    Surprise Me! 🎲
                </Button>
            )}
        </div>
        
        <div className="grid gap-4">
            {items.map(item => (
                <Card key={item.id} className="cursor-pointer hover:bg-secondary/20 transition-colors" onClick={() => onSelectActivity(item)}>
                    <CardContent className="p-6 flex justify-between items-center">
                        <span className="text-lg font-medium">{item.name}</span>
                        <Play className="w-5 h-5 text-primary opacity-50" />
                    </CardContent>
                </Card>
            ))}
            
            {items.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    <p>No items in this category yet.</p>
                </div>
            )}
        </div>
    </div>
  );
};
