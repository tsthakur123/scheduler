"use client";
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: any;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null); // Add state for token
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const router = useRouter();

  useEffect(() => {
    // Access localStorage only on the client side
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setUser(storedToken); // Or decode it if you need user data from token
    }
    setIsLoading(false); // Finished loading
  }, []);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    setToken(token);
    setUser(token); // Or decode the token to get user details
    router.push('/interview'); // Redirect after login
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    router.push('/login'); // Redirect to login after logout
  };

  if (isLoading) {
    // Optionally, render a loading spinner or nothing while the context is loading
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
