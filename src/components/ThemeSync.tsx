import { useEffect } from 'react';
import { useAppSelector } from '../hooks/useAppSelector';

export function ThemeSync() {
  const theme = useAppSelector((s) => s.theme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return null;
}
