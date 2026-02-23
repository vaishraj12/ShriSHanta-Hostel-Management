import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ✅ Export mockUsers so other files can use them
export const mockUsers: Record<string, User & { password: string }> = {
  'student@hostel.com': {
    id: '1',
    name: 'Student XYZ',
    email: 'student@hostel.com',
    password: '1234',
    role: 'student',
    roomNumber: 'A-101',
    hostelBlock: 'Shree Shanta Sthanam',
  },
  'warden@hostel.com': {
    id: '2',
    name: 'Warden ABC',
    email: 'warden@hostel.com',
    password: '1234',
    role: 'warden',
    hostelBlock: 'Shree Shanta Sthanam',
  },
  'admin@hostel.com': {
    id: '3',
    name: 'Admin DEF',
    email: 'admin@hostel.com',
    password: '1234',
    role: 'admin',
  },
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string, role: UserRole): boolean => {
    const mockUser = mockUsers[email];
    if (mockUser && mockUser.role === role && mockUser.password === password) {
      const { password, ...userData } = mockUser;
      setUser(userData);
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
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
