export type ActivityCategory = 'appetizer' | 'entree' | 'side' | 'dessert' | 'special';

export type ActivityEffort = 'low' | 'medium' | 'high';

export interface Activity {
  id: string;
  name: string;
  category: ActivityCategory;
  duration: number; // minutes
  effort: ActivityEffort;
  tags?: string[];
}

export interface UserPreferences {
  indoor: boolean;
  sensory: 'quiet' | 'stimulating' | 'balanced';
  quietMode?: boolean;
}

export interface UserProfile {
  preferences: UserPreferences;
  menu: Activity[];
}
