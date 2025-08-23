import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SpinnerContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  loadingMessage: string;
  setLoadingMessage: (message: string) => void;
  withLoading: <T>(promise: Promise<T>, message?: string) => Promise<T>;
}

const SpinnerContext = createContext<SpinnerContextType | undefined>(undefined);

interface SpinnerProviderProps {
  children: ReactNode;
}

export const SpinnerProvider: React.FC<SpinnerProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('جاري التحميل...');

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const withLoading = async <T,>(promise: Promise<T>, message = 'جاري التحميل...'): Promise<T> => {
    setLoadingMessage(message);
    setLoading(true);
    
    try {
      const result = await promise;
      return result;
    } finally {
      setLoading(false);
    }
  };

  const value: SpinnerContextType = {
    isLoading,
    setLoading,
    loadingMessage,
    setLoadingMessage,
    withLoading,
  };

  return <SpinnerContext.Provider value={value}>{children}</SpinnerContext.Provider>;
};

export const useSpinner = (): SpinnerContextType => {
  const context = useContext(SpinnerContext);
  if (context === undefined) {
    throw new Error('useSpinner must be used within a SpinnerProvider');
  }
  return context;
};