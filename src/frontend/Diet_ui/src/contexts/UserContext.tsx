import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Test account credentials for development
const TEST_ACCOUNT = {
  email: 'test@example.com',
  password: 'test123',
  id: '1',
  displayName: 'Test User',
  photoURL: null,
  preferences: {
    theme: 'light' as const,
    notifications: true,
    language: 'en',
  },
};

export interface UserData {
  age: number;
  gender: string;
  weight: number;
  height: number;
  activity_level: string;
  dietary_restrictions: string[];
  health_conditions: string[];
  preferred_cuisine: string;
  food_type: string;
  current_mood: string;
  calorieGoal: number;
  proteinGoal: number;
  carbsGoal: number;
  fatGoal: number;
  waterGoal: number;
}

interface User {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  userData?: UserData;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  isDarkMode: boolean;
  hasCompletedForm: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  toggleTheme: () => void;
  updateUserData: (data: UserData) => Promise<void>;
  getUserData: () => UserData | undefined;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('isDarkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const navigate = useNavigate();

  // Check if user has completed the initial form
  const hasCompletedForm = user?.userData !== undefined;

  useEffect(() => {
    // Check for saved user data
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      console.log('Loading saved user from localStorage:', parsedUser.email);
      // Also load the user-specific userData
      const userSpecificData = localStorage.getItem(`userData_${parsedUser.email}`);
      if (userSpecificData) {
        parsedUser.userData = JSON.parse(userSpecificData);
        console.log('Loaded user-specific userData for:', parsedUser.email);
      } else {
        console.log('No user-specific data found for:', parsedUser.email);
      }
      setUser(parsedUser);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock login - replace with actual authentication
      const userData = localStorage.getItem(`userData_${email}`);
      console.log('Login attempt for:', email, 'Has userData:', !!userData);
      
      const mockUser: User = {
        uid: '123',
        email,
        displayName: email.split('@')[0],
        photoURL: null,
        // Check if we have saved user data
        userData: userData ? JSON.parse(userData) : undefined,
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      console.log('User logged in:', email, 'Redirecting to:', mockUser.userData ? '/dashboard' : '/form');
      navigate(mockUser.userData ? '/dashboard' : '/form');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, displayName: string) => {
    setIsLoading(true);
    try {
      // Mock registration - replace with actual authentication
      const mockUser: User = {
        uid: '123',
        email,
        displayName,
        photoURL: null,
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      navigate('/form');
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    // Clear current session but preserve user-specific data for next login
    setUser(null);
    localStorage.removeItem('user');
    navigate('/auth');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const updateUserData = async (data: any) => {
    if (!user) return;
    
    // Validate required fields
    if (!data.weight || !data.height || !data.age || !data.gender || !data.activity_level) {
      console.error('Missing required fields:', { weight: data.weight, height: data.height, age: data.age, gender: data.gender, activity_level: data.activity_level });
      throw new Error('Please fill in all required fields');
    }
    
    // Calculate BMR and nutritional goals if not already provided
    let userData: UserData;
    
    if (!data.calorieGoal) {
      try {
        // Calculate BMR using Harris-Benedict equation
        const weightKg = Number(data.weight);
        const heightCm = Number(data.height);
        const age = Number(data.age);
        const gender = String(data.gender);
        
        if (isNaN(weightKg) || isNaN(heightCm) || isNaN(age)) {
          throw new Error('Weight, height, and age must be numbers');
        }
        
        let bmr: number;
        if (gender.toLowerCase() === 'male') {
          bmr = 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * age);
        } else {
          bmr = 447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * age);
        }
        
        // Activity multipliers
        const activityMultipliers: any = {
          'sedentary': 1.2,
          'light': 1.375,
          'moderate': 1.55,
          'active': 1.725,
          'very_active': 1.9
        };
        
        const activity_level = String(data.activity_level || 'moderate');
        const dailyCalories = Math.round(bmr * (activityMultipliers[activity_level] || 1.55));
        
        // Calculate macronutrient goals
        const proteinGoal = Math.round((dailyCalories * 0.3) / 4);
        const fatGoal = Math.round((dailyCalories * 0.25) / 9);
        const carbsGoal = Math.round((dailyCalories * 0.45) / 4);
        const waterGoal = Math.round(weightKg * 35);
        
        userData = {
          ...data,
          calorieGoal: dailyCalories,
          proteinGoal,
          carbsGoal,
          fatGoal,
          waterGoal,
        };
      } catch (error) {
        console.error('Error calculating nutritional goals:', error);
        throw new Error('Failed to calculate nutritional goals');
      }
    } else {
      userData = data;
    }
    
    const updatedUser = {
      ...user,
      userData,
    };
    
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    localStorage.setItem(`userData_${user.email}`, JSON.stringify(userData));
    // Clear cached diet plan so it regenerates with updated profile data
    localStorage.removeItem(`dietPlan_${user.email}`);
    console.log('User data updated and saved for:', user.email, 'Nutritional goals calculated');
    navigate('/dashboard');
  };

  const getUserData = () => {
    return user?.userData;
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        isDarkMode,
        hasCompletedForm,
        login,
        register,
        logout,
        toggleTheme,
        updateUserData,
        getUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
} 