'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChefAvatar } from '@/components/shared/ChefAvatar';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Utensils, Coffee, Zap, Info } from 'lucide-react';

const ConceptCard = ({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className="flex flex-col items-center text-center p-4 bg-white/50 dark:bg-black/20 rounded-xl border border-border/50 backdrop-blur-sm"
    >
        <div className="p-3 bg-primary/10 rounded-full mb-3 text-primary">
            <Icon className="w-6 h-6" />
        </div>
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
);

export const Landing = ({ onStart }: { onStart: () => void }) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-background to-secondary/30">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl w-full space-y-12"
            >
                {/* Hero Section */}
                <div className="text-center space-y-6">
                    <motion.div 
                        animate={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 5, repeatType: "reverse" }}
                        className="inline-block"
                    >
                        <ChefAvatar className="text-8xl drop-shadow-lg" />
                    </motion.div>
                    
                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-primary font-serif">
                            Dopamenu
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            A curated menu of dopamine-boosting activities for your brain.
                        </p>
                    </div>
                </div>

                {/* Concept Explanation */}
                <div className="grid md:grid-cols-3 gap-6">
                    <ConceptCard 
                        icon={Utensils}
                        title="The Menu Concept"
                        description="Just like a restaurant, pick activities based on your energy levels—from quick snacks to main courses."
                        delay={0.2}
                    />
                    <ConceptCard 
                        icon={Zap}
                        title="Dopamine Boosts"
                        description="Combat low motivation with pre-planned rewards. Skip the decision fatigue and get straight to doing."
                        delay={0.4}
                    />
                    <ConceptCard 
                        icon={Coffee}
                        title="Neuro-Friendly"
                        description="Designed for ADHD & autistic brains: gentle visuals, clear choices, and no overwhelming clutter."
                        delay={0.6}
                    />
                </div>

                {/* Call to Action */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex justify-center pt-8"
                >
                    <Button 
                        onClick={onStart} 
                        size="lg" 
                        className="text-lg px-8 py-8 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 group bg-primary text-primary-foreground cursor-pointer"
                    >
                        Let's Create Your Menu
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </motion.div>
                
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-center text-sm text-muted-foreground italic"
                >
                    "Skip the 'what now?' struggle."
                </motion.p>
            </motion.div>
        </div>
    );
};
