'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, Activity, ActivityCategory } from '@/types';

interface MenuContextType {
  userProfile: UserProfile;
  updatePreferences: (preferences: Partial<UserProfile['preferences']>) => void;
  addActivity: (activity: Activity) => void;
  removeActivity: (id: string) => void;
  updateActivity: (activity: Activity) => void;
  getActivitiesByCategory: (category: ActivityCategory) => Activity[];
}

const defaultProfile: UserProfile = {
  preferences: {
    indoor: true,
    sensory: 'balanced',
    quietMode: false,
  },
  menu: [],
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile>(defaultProfile);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('dopamenu-profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure preferences are merged if new fields added
        setUserProfile(prev => ({
            ...parsed,
            preferences: { ...prev.preferences, ...parsed.preferences }
        }));
      } catch (e) {
        console.error("Failed to load profile", e);
      }
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem('dopamenu-profile', JSON.stringify(userProfile));
    }
  }, [userProfile, loaded]);

  useEffect(() => {
    if (userProfile.preferences.quietMode) {
        document.body.classList.add('reduce-motion');
    } else {
        document.body.classList.remove('reduce-motion');
    }
  }, [userProfile.preferences.quietMode]);

  const updatePreferences = (preferences: Partial<UserProfile['preferences']>) => {
    setUserProfile((prev) => ({ 
        ...prev, 
        preferences: { ...prev.preferences, ...preferences } 
    }));
  };

  const addActivity = (activity: Activity) => {
    setUserProfile((prev) => ({ ...prev, menu: [...prev.menu, activity] }));
  };

  const removeActivity = (id: string) => {
    setUserProfile((prev) => ({
      ...prev,
      menu: prev.menu.filter((a) => a.id !== id),
    }));
  };

  const updateActivity = (activity: Activity) => {
    setUserProfile((prev) => ({
      ...prev,
      menu: prev.menu.map((a) => (a.id === activity.id ? activity : a)),
    }));
  };

  const getActivitiesByCategory = (category: ActivityCategory) => {
    return userProfile.menu.filter((a) => a.category === category);
  };

  return (
    <MenuContext.Provider
      value={{
        userProfile,
        updatePreferences,
        addActivity,
        removeActivity,
        updateActivity,
        getActivitiesByCategory,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};
