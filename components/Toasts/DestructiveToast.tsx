// utils/showToast.ts
'use client';

import { useToast } from '@/hooks/use-toast';

export const useShowToast = () => {
  const { toast } = useToast();

  return (options: {
    title: string;
    description?: string;
    variant?: 'default' | 'destructive';
  }) => {
    const toastStyles = getToastStyles(options.variant);

    toast({
      title: options.title,
      description: options.description,
      variant: options.variant || 'default',
      className: toastStyles,
    });
  };
};

// Helper function to return toast styles based on the variant
const getToastStyles = (variant: 'default' | 'destructive' | undefined) => {
  const isDark = document.documentElement.classList.contains('dark');

  // Define base styles for both types of toast
  const baseStyles =
    'p-4 rounded-lg text-sm font-medium transition-all duration-300';

  // Check for the 'destructive' variant (error toast)
  if (variant === 'destructive') {
    // Error toast always has a red background, no matter the theme
    return `${baseStyles} bg-red-900 text-white ${
      isDark ? 'border-red-800' : 'border-red-500'
    }`;
  }

  // Success toast (default variant) - black for dark mode, white for light mode
  return `${baseStyles} ${
    isDark ? 'bg-black text-white' : 'bg-white text-black'
  } ${isDark ? 'border-gray-800' : 'border-gray-200'}`;
};
