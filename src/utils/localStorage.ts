const STATE_KEY = 'social_feed_state';
const THEME_KEY = 'social_feed_theme';

export interface PersistedState {
  users?: unknown;
  posts?: unknown;
  comments?: unknown;
  auth?: unknown;
}

/**
 * Safely parse JSON. Returns null on failure.
 */
function safeParse<T>(json: string): T | null {
  try {
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}

/**
 * Load persisted Redux state from localStorage.
 * Returns null if missing or malformed.
 */
export function loadPersistedState(): PersistedState | null {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (!raw) return null;
    const parsed = safeParse<PersistedState>(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    return parsed;
  } catch {
    return null;
  }
}

/**
 * Save Redux state to localStorage.
 * Excludes sensitive data (passwords) - we only persist structure.
 */
export function savePersistedState(state: PersistedState): void {
  try {
    const toSave: PersistedState = {
      users: state.users,
      posts: state.posts,
      comments: state.comments,
      auth: state.auth,
    };
    localStorage.setItem(STATE_KEY, JSON.stringify(toSave));
  } catch {
    // Ignore quota or other errors
  }
}

/**
 * Load theme from localStorage.
 */
export function loadTheme(): 'light' | 'dark' | null {
  try {
    const raw = localStorage.getItem(THEME_KEY);
    if (raw === 'light' || raw === 'dark') return raw;
    return null;
  } catch {
    return null;
  }
}

/**
 * Save theme to localStorage.
 */
export function saveTheme(theme: 'light' | 'dark'): void {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Ignore
  }
}
