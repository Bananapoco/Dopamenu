'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { useMenu } from '@/context/MenuContext';

export const Questionnaire = ({ onNext }: { onNext: () => void }) => {
  const { userProfile, updatePreferences } = useMenu();
  const [indoor, setIndoor] = useState(userProfile.preferences.indoor);
  const [sensory, setSensory] = useState(userProfile.preferences.sensory);

  const handleSubmit = () => {
    updatePreferences({ indoor, sensory });
    onNext();
  };

  return (
    <Card className="animate-in slide-in-from-right duration-300">
      <CardHeader>
        <CardTitle>Chef's Preferences</CardTitle>
        <CardDescription>Help us tailor the menu to your taste.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label className="text-lg">Where do you prefer to recharge?</Label>
          <div className="flex items-center space-x-2">
            <Switch 
                checked={!indoor} 
                onCheckedChange={(checked) => setIndoor(!checked)} 
                id="location-mode"
            />
            <Label htmlFor="location-mode" className="font-normal cursor-pointer">
                {indoor ? "Mostly Indoors" : "Mostly Outdoors"}
            </Label>
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-lg">Sensory Preference</Label>
          <RadioGroup 
            value={sensory} 
            onValueChange={(v) => setSensory(v as 'quiet' | 'stimulating' | 'balanced')}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="quiet" id="quiet" />
              <Label htmlFor="quiet" className="cursor-pointer">Quiet & Calming</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="balanced" id="balanced" />
              <Label htmlFor="balanced" className="cursor-pointer">Balanced</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="stimulating" id="stimulating" />
              <Label htmlFor="stimulating" className="cursor-pointer">Stimulating & Active</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} className="w-full cursor-pointer">Continue to Menu Prep</Button>
      </CardFooter>
    </Card>
  );
};
