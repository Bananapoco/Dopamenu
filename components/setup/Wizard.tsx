'use client';

import React, { useState } from 'react';
import { ChefAvatar } from '@/components/shared/ChefAvatar';
import { Button } from '@/components/ui/button';
import { useMenu } from '@/context/MenuContext';
import { Questionnaire } from './Questionnaire';
import { CategoryBuilder } from './CategoryBuilder';
import { MenuReview } from './MenuReview';
import { Landing } from './Landing';

type Step = 'welcome' | 'questionnaire' | 'builder' | 'review';

export const Wizard = () => {
  const [step, setStep] = useState<Step>('welcome');

  const handleNext = () => {
    if (step === 'welcome') setStep('questionnaire');
    else if (step === 'questionnaire') setStep('builder');
    else if (step === 'builder') setStep('review');
    else if (step === 'review') {
        // Finalize
    }
  };

  if (step === 'welcome') return <Landing onStart={handleNext} />;

  return (
    <div className="max-w-3xl mx-auto p-6 min-h-screen flex flex-col justify-center">
      <div className="mb-8 flex justify-center">
        <ChefAvatar className="text-4xl" />
      </div>

      {step === 'questionnaire' && <Questionnaire onNext={handleNext} />}
      {step === 'builder' && <CategoryBuilder onNext={handleNext} />}
      {step === 'review' && <MenuReview onComplete={handleNext} />}
    </div>
  );
};
