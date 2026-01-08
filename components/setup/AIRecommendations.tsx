'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useMenu } from '@/context/MenuContext';
import { ActivityCategory } from '@/types';
import { Loader2 } from 'lucide-react';

interface AIRecommendationsProps {
  isOpen: boolean;
  onClose: () => void;
  category: ActivityCategory;
  categoryTitle: string;
  onAdd: (items: string[]) => void;
}

export const AIRecommendations: React.FC<AIRecommendationsProps> = ({
  isOpen,
  onClose,
  category,
  categoryTitle,
  onAdd,
}) => {
  const { userProfile, getActivitiesByCategory } = useMenu();
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [error, setError] = useState('');

  const generateIdeas = async () => {
    setLoading(true);
    setError('');
    setSuggestions([]);
    
    try {
      const existingItems = getActivitiesByCategory(category).map(a => a.name);
      
      const res = await fetch('/api/generate-ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: categoryTitle, // Send title for better context
          preferences: userProfile.preferences,
          existingItems,
        }),
      });
      
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      
      setSuggestions(data.suggestions);
    } catch (err) {
      setError('Failed to cook up ideas. Chef is busy!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Generate on open if empty
  useEffect(() => {
    if (isOpen && suggestions.length === 0 && !loading && !error) {
      generateIdeas();
    }
  }, [isOpen]);

  const handleAddSelected = () => {
    onAdd(selected);
    onClose();
    setSelected([]);
    setSuggestions([]);
  };

  const toggleSelection = (item: string) => {
    setSelected(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Chef's Specials for {categoryTitle}</DialogTitle>
          <DialogDescription>
             Select the ones you like to add to your menu.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
               <Loader2 className="h-8 w-8 animate-spin text-primary" />
               <p className="text-sm text-muted-foreground">Cooking up fresh ideas...</p>
            </div>
          ) : error ? (
            <div className="text-center py-4 text-destructive">
                <p>{error}</p>
                <Button variant="outline" size="sm" onClick={generateIdeas} className="mt-2">Try Again</Button>
            </div>
          ) : (
            <div className="space-y-2">
               {suggestions.map((item, idx) => (
                 <div key={idx} className="flex items-start space-x-2 p-2 rounded hover:bg-secondary/10">
                   <Checkbox 
                     id={`suggestion-${idx}`} 
                     checked={selected.includes(item)}
                     onCheckedChange={() => toggleSelection(item)}
                   />
                   <label 
                     htmlFor={`suggestion-${idx}`} 
                     className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer pt-0.5"
                   >
                     {item}
                   </label>
                 </div>
               ))}
            </div>
          )}
        </div>

        <DialogFooter className="sm:justify-between">
           <Button variant="ghost" onClick={generateIdeas} type="button" disabled={loading} className="text-xs text-muted-foreground cursor-pointer">
             Regenerate
           </Button>
           <div className="flex space-x-2">
             <Button variant="secondary" type="button" onClick={onClose} className="cursor-pointer">Cancel</Button>
             <Button onClick={handleAddSelected} type="button" disabled={selected.length === 0} className="cursor-pointer">
               Add {selected.length > 0 ? `(${selected.length})` : ''}
             </Button>
           </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
