
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthContextType } from '../types';
import { getCurrentUser, setCurrentUser, getUsers, setUsers } from '../utils/storage';
import { hashPassword, validateEmail, validatePassword } from '../utils/auth';
import { toast } from 'sonner';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);

    // Auto logout after 5 minutes of inactivity
    let inactivityTimer: NodeJS.Timeout;
    
    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      if (currentUser) {
        inactivityTimer = setTimeout(() => {
          logout();
          toast.info('You have been logged out due to inactivity');
        }, 5 * 60 * 1000); // 5 minutes
      }
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => document.addEventListener(event, resetTimer, true));
    
    resetTimer();

    return () => {
      clearTimeout(inactivityTimer);
      events.forEach(event => document.removeEventListener(event, resetTimer, true));
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address');
      setIsLoading(false);
      return false;
    }

    const users = getUsers();
    const hashedPassword = hashPassword(password);
    const foundUser = users.find(u => u.email === email && u.password === hashedPassword);

    if (foundUser) {
      setUser(foundUser);
      setCurrentUser(foundUser);
      toast.success(`Welcome back, ${foundUser.firstName}!`);
      setIsLoading(false);
      return true;
    } else {
      toast.error('Invalid email or password');
      setIsLoading(false);
      return false;
    }
  };

  const register = async (userData: Omit<User, 'id' | 'createdAt' | 'isAdmin'>): Promise<boolean> => {
    setIsLoading(true);

    if (!validateEmail(userData.email)) {
      toast.error('Please enter a valid email address');
      setIsLoading(false);
      return false;
    }

    const passwordValidation = validatePassword(userData.password);
    if (!passwordValidation.isValid) {
      toast.error(passwordValidation.errors[0]);
      setIsLoading(false);
      return false;
    }

    const users = getUsers();
    const existingUser = users.find(u => u.email === userData.email);

    if (existingUser) {
      toast.error('An account with this email already exists');
      setIsLoading(false);
      return false;
    }

    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      password: hashPassword(userData.password),
      isAdmin: false,
      createdAt: new Date().toISOString()
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setUser(newUser);
    setCurrentUser(newUser);
    toast.success(`Account created successfully! Welcome, ${newUser.firstName}!`);
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    setCurrentUser(null);
    toast.success('You have been logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
