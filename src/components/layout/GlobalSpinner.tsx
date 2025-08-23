import React from 'react';
import { useSpinner } from '@/contexts/SpinnerContext';
import { Loader2 } from 'lucide-react';

const GlobalSpinner: React.FC = () => {
  const { isLoading, loadingMessage } = useSpinner();

  if (!isLoading) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      role="status"
      aria-live="polite"
      aria-label={loadingMessage}
    >
      <div className="flex flex-col items-center gap-4 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground text-center">
          {loadingMessage}
        </p>
      </div>
    </div>
  );
};

export default GlobalSpinner;