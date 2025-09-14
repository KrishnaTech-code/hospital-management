
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for demonstration
const MOCK_USER: User = { id: '1', email: 'admin@hospital.com', name: 'Dr. Admin', role: 'Admin' };

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('hospitalUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === 'admin@hospital.com' && password === 'password123') {
          localStorage.setItem('hospitalUser', JSON.stringify(MOCK_USER));
          setUser(MOCK_USER);
          resolve(true);
        } else {
          resolve(false);
        }
        setLoading(false);
      }, 1000);
    });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('hospitalUser');
    setUser(null);
  }, []);

  const value = { user, login, logout, loading };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
