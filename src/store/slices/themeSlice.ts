import { createSlice } from '@reduxjs/toolkit';
import type { Theme } from '../../types';
import { loadTheme, saveTheme } from '../../utils/localStorage';

function getInitialTheme(): Theme {
  try {
    const saved = loadTheme();
    return saved ?? 'light';
  } catch {
    return 'light';
  }
}

const initialState: Theme = getInitialTheme();

const themeSlice = createSlice({
  name: 'theme',
  initialState: initialState as Theme,
  reducers: {
    setTheme(_state, action: { payload: Theme }) {
      saveTheme(action.payload);
      return action.payload;
    },
    toggleTheme(s) {
      const next: Theme = s === 'light' ? 'dark' : 'light';
      saveTheme(next);
      return next;
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
