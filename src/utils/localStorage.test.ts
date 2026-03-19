import { describe, it, expect, beforeEach } from 'vitest';
import {
  loadPersistedState,
  savePersistedState,
  loadTheme,
  saveTheme,
} from './localStorage';

describe('localStorage utilities', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns null when no state is persisted', () => {
    expect(loadPersistedState()).toBeNull();
  });

  it('saves and loads persisted state', () => {
    const state = {
      users: { items: {} },
      posts: { items: {} },
      comments: { items: {} },
      auth: { isAuthenticated: false, currentUsername: null },
    };
    savePersistedState(state);
    const loaded = loadPersistedState();
    expect(loaded).toBeTruthy();
    expect(loaded?.auth).toEqual(state.auth);
  });

  it('returns null for malformed JSON', () => {
    localStorage.setItem('social_feed_state', 'invalid json{{{');
    expect(loadPersistedState()).toBeNull();
  });

  it('loads and saves theme', () => {
    expect(loadTheme()).toBeNull();
    saveTheme('dark');
    expect(loadTheme()).toBe('dark');
    saveTheme('light');
    expect(loadTheme()).toBe('light');
  });

  it('returns null for invalid theme value', () => {
    localStorage.setItem('social_feed_theme', 'invalid');
    expect(loadTheme()).toBeNull();
  });
});
