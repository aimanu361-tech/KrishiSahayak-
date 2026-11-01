import React, { createContext, useContext, useState, useEffect } from 'react';
import { FarmerUser } from '../types';

interface AuthContextType {
  user: FarmerUser | null;
  isAuthenticated: boolean;
  login: (phone: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (farmerData: Omit<FarmerUser, 'id'>, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateLocation: (lat: number, lng: number, address?: string, village?: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'krishisahayak_farmer_profile';

const DEFAULT_DEMO_USER: FarmerUser = {
  id: 'farmer_001',
  name: 'Ramesh Gowda',
  phone: '9876543210',
  village: 'Pandavapura, Mandya',
  latitude: 12.5028,
  longitude: 76.6669,
  locationAddress: 'Pandavapura Taluk, Mandya District, Karnataka, India',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FarmerUser | null>(() => {
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    // Provide default pre-authenticated demo farmer for immediate accessibility,
    // but allow testing the login and registration flows anytime.
    return DEFAULT_DEMO_USER;
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    } catch {
      // Storage full or unavailable
    }
  }, [user]);

  const login = async (phone: string, _password: string): Promise<{ success: boolean; error?: string }> => {
    // Artificial slight delay for realistic UX
    await new Promise((r) => setTimeout(r, 400));

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      return { success: false, error: 'errPhoneInvalid' };
    }

    // In demo mode, accept registered phone or default demo user
    let existingProfile: FarmerUser | null = null;
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.phone === cleanPhone) {
          existingProfile = parsed;
        }
      }
    } catch {
      // ignore
    }

    const authenticatedUser: FarmerUser = existingProfile || {
      id: `farmer_${Date.now()}`,
      name: cleanPhone === '9876543210' ? 'Ramesh Gowda' : 'Farmer Patil',
      phone: cleanPhone,
      village: 'Mandya Rural, Karnataka',
      latitude: 12.5218,
      longitude: 76.8951,
      locationAddress: 'Mandya, Karnataka, India',
    };

    setUser(authenticatedUser);
    return { success: true };
  };

  const register = async (
    farmerData: Omit<FarmerUser, 'id'>,
    _password: string
  ): Promise<{ success: boolean; error?: string }> => {
    await new Promise((r) => setTimeout(r, 500));

    const newUser: FarmerUser = {
      ...farmerData,
      id: `farmer_${Date.now()}`,
    };

    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(USER_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const updateLocation = (lat: number, lng: number, address?: string, village?: string) => {
    setUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        latitude: lat,
        longitude: lng,
        locationAddress: address || prev.locationAddress,
        village: village || prev.village,
      };
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateLocation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
