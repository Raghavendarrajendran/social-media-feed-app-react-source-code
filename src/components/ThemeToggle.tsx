import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { toggleTheme } from '../store/slices/themeSlice';

export function ThemeToggle() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((s) => s.theme);

  return (
    <button
      type="button"
      onClick={() => dispatch(toggleTheme())}
      className="p-2 rounded-lg bg-[var(--bg-secondary)] hover:opacity-90 transition-opacity"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <span
        className={`inline-block transition-transform duration-500 ease-in-out ${
          theme === 'dark' ? 'rotate-180' : 'rotate-0'
        }`}
        aria-hidden="true"
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </span>
    </button>
  );
}
