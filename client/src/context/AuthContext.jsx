import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth.service';
import { userService } from '../services/user.service';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check current session on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const response = await authService.getMe();
        if (response?.data?.user) {
          setUser(response.data.user);
          setIsAuthenticated(true);
        }
      } catch (err) {
        // Not authenticated or session expired
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const signup = async (data) => {
    return authService.signup(data);
  };

  const verifyOtp = async (data) => {
    return authService.verifyOtp(data);
  };

  const resendOtp = async (data) => {
    return authService.resendOtp(data);
  };

  const login = async (data) => {
    const response = await authService.login(data);
    if (response?.data?.user) {
      setUser(response.data.user);
      setIsAuthenticated(true);
    }
    return response;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUserProfile = async (data) => {
    const response = await userService.updateProfile(data);
    if (response?.data?.user) {
      setUser(response.data.user);
    }
    return response;
  };

  const refreshUser = async () => {
    try {
      const response = await authService.getMe();
      if (response?.data?.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      }
    } catch {
      // Ignore
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    signup,
    verifyOtp,
    resendOtp,
    login,
    logout,
    updateUserProfile,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

