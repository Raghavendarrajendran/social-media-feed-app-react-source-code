import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ThemeToggle } from './ThemeToggle';
import themeReducer from '../store/slices/themeSlice';

function renderWithTheme(initialTheme: 'light' | 'dark' = 'light') {
  const store = configureStore({
    reducer: { theme: themeReducer },
    preloadedState: { theme: initialTheme },
  });
  return { store, ...render(
    <Provider store={store}>
      <ThemeToggle />
    </Provider>
  ) };
}

describe('ThemeToggle', () => {
  it('renders theme toggle button', () => {
    renderWithTheme();
    const btn = screen.getByRole('button', { name: /switch to dark mode/i });
    expect(btn).toBeInTheDocument();
  });

  it('toggles theme on click', async () => {
    const user = userEvent.setup();
    const { store } = renderWithTheme('light');
    const btn = screen.getByRole('button', { name: /switch to dark mode/i });
    await user.click(btn);
    expect(store.getState().theme).toBe('dark');
  });
});
