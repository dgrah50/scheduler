import { useState, useEffect } from 'react';
import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function unixToDDMMYYYY(unixTimestamp: number) {
  // Convert the Unix timestamp to a JavaScript Date object
  const date = new Date(unixTimestamp * 1000);

  // Extract the day, month, and year from the Date object
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript
  const year = date.getFullYear();

  // Combine the day, month, and year into the DD/MM/YYYY format
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}

export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    const mediaQueryList = window.matchMedia('(max-width: 1023px)');
    handleMediaQueryChange(new MediaQueryListEvent('change', { matches: mediaQueryList.matches }));

    mediaQueryList.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQueryList.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  return isMobile;
};
