import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: Record<string, User> = {
  'student@hostel.com': {
    id: '1',
    name: 'XYZ',
    email: 'student@hostel.com',
    role: 'student',
    roomNumber: 'A-101',
    hostelBlock: 'Shree Shanta Sthanam',
  },
  'admin@hostel.com': {
    id: '2',
    name: 'AB',
    email: 'admin@hostel.com',
    role: 'admin',
  },
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string, role: UserRole): boolean => {
    const mockUser = mockUsers[email];
    if (mockUser && mockUser.role === role && password === 'password') {
      setUser(mockUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
