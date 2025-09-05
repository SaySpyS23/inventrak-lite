import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '@/types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string, role: 'admin' | 'cashier') => Promise<boolean>;
  signup: (userData: Omit<User, 'id'> & { password: string }) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    // Check for existing auth state on mount
    const storedUser = localStorage.getItem('inventrak_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          isAuthenticated: true,
          user,
          isLoading: false,
        });
      } catch (error) {
        localStorage.removeItem('inventrak_user');
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string, role: 'admin' | 'cashier'): Promise<boolean> => {
    // Mock authentication - replace with real API call
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const user: User = {
        id: '1',
        name: role === 'admin' ? 'Store Owner' : 'Cashier',
        email,
        role,
        companyName: 'Sample Store',
        businessCategory: 'kirana'
      };

      localStorage.setItem('inventrak_user', JSON.stringify(user));
      setAuthState({
        isAuthenticated: true,
        user,
        isLoading: false,
      });
      
      return true;
    } catch (error) {
      return false;
    }
  };

  const signup = async (userData: Omit<User, 'id'> & { password: string }): Promise<boolean> => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user: User = {
        ...userData,
        id: Date.now().toString(),
      };

      localStorage.setItem('inventrak_user', JSON.stringify(user));
      setAuthState({
        isAuthenticated: true,
        user,
        isLoading: false,
      });
      
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('inventrak_user');
    setAuthState({
      isAuthenticated: false,
      user: null,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};