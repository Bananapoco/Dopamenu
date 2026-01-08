'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ActivityCategory } from '@/types';
import { Utensils, Coffee, Pizza, IceCream, Star } from 'lucide-react';

const CATEGORIES: { id: ActivityCategory; title: string; icon: any; color: string }[] = [
  { id: 'appetizer', title: 'Appetizers', icon: Coffee, color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100' },
  { id: 'entree', title: 'Entrées', icon: Utensils, color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100' },
  { id: 'side', title: 'Sides', icon: Pizza, color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-100' },
  { id: 'dessert', title: 'Desserts', icon: IceCream, color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-100' },
  { id: 'special', title: 'Specials', icon: Star, color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100' },
];

export const MenuBoard = ({ onSelectCategory }: { onSelectCategory: (c: ActivityCategory) => void }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
        <h2 className="text-3xl font-bold text-center mb-8 font-serif">Today's Menu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => (
                <Card 
                    key={cat.id} 
                    className={`cursor-pointer hover:scale-105 transition-transform duration-200 border-2 border-transparent hover:border-primary ${cat.id === 'entree' ? 'md:col-span-2 lg:col-span-1' : ''}`}
                    onClick={() => onSelectCategory(cat.id)}
                >
                    <CardHeader className="flex flex-row items-center gap-4">
                        <div className={`p-3 rounded-full ${cat.color}`}>
                            <cat.icon className="w-6 h-6" />
                        </div>
                        <CardTitle className="text-xl">{cat.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">Tap to view options</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
  );
};
