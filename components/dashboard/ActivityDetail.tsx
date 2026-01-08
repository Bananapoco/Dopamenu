'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from '@/types';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export const ActivityDetail = ({ activity, onBack, onComplete }: { activity: Activity, onBack: () => void, onComplete: () => void }) => {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(activity.duration * 60);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
            const newTime = prev - 1;
            return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, activity.duration]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-in zoom-in duration-300">
        <Button variant="ghost" onClick={onBack} className="gap-2 cursor-pointer">
            <ArrowLeft className="w-4 h-4" /> Back to Menu
        </Button>
        
        <Card className="border-2 border-primary/20">
            <CardHeader className="text-center space-y-4">
                <CardTitle className="text-3xl font-serif">{activity.name}</CardTitle>
                <div className="text-6xl font-mono tabular-nums text-primary py-4">
                    {formatTime(timeLeft)}
                </div>
            </CardHeader>
            <CardFooter className="flex justify-center gap-4 pb-8">
                <Button size="lg" onClick={toggleTimer} className={`cursor-pointer min-w-[120px] ${isActive ? "bg-secondary text-secondary-foreground hover:bg-secondary/80" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}>
                    {isActive ? 'Pause' : timeLeft < activity.duration * 60 ? 'Resume' : 'Start'}
                </Button>
                <Button size="lg" variant="outline" onClick={onComplete} className="text-green-600 border-green-200 hover:bg-green-50 cursor-pointer">
                    <CheckCircle className="w-4 h-4 mr-2" /> Done
                </Button>
            </CardFooter>
        </Card>
        
        <div className="text-center text-muted-foreground">
            <p>Take your time. Enjoy the dopamine!</p>
        </div>
    </div>
  );
};
