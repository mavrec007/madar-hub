import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { SpinnerProvider } from './contexts/SpinnerContext';
import AppRoutes from './routes/AppRoutes';
import GlobalSpinner from './components/layout/GlobalSpinner';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="system">
          <SpinnerProvider>
            <AuthProvider>
              <NotificationProvider>
                <AppRoutes />
                <GlobalSpinner />
                <Toaster 
                  position="top-center"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      direction: 'rtl',
                    },
                  }}
                />
              </NotificationProvider>
            </AuthProvider>
          </SpinnerProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;