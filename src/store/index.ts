import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice';
import authReducer from './slices/authSlice';
import postsReducer from './slices/postsSlice';
import commentsReducer from './slices/commentsSlice';
import themeReducer from './slices/themeSlice';
import toastReducer from './slices/toastSlice';
import {
  loadPersistedState,
  savePersistedState,
  type PersistedState,
} from '../utils/localStorage';
import { mockUsers } from '../data/mockData';

const persisted = loadPersistedState();
const hasValidPersistedState =
  persisted &&
  typeof persisted === 'object' &&
  'users' in persisted &&
  'auth' in persisted &&
  'posts' in persisted &&
  'comments' in persisted;

// Seed user IDs that must always exist (admin, alice, bob)
const SEED_USER_IDS = ['u_admin', 'u1', 'u2'];

function mergeWithSeedUsers(persistedUsers: { items?: Record<string, unknown> }): { items: Record<string, unknown> } {
  const items = { ...(persistedUsers?.items ?? {}) };
  for (const u of mockUsers) {
    if (SEED_USER_IDS.includes(u.id)) {
      items[u.id] = u;
    }
  }
  return { items };
}

const preloadedState = hasValidPersistedState
  ? {
      ...(persisted as Record<string, unknown>),
      users: mergeWithSeedUsers((persisted as { users?: { items?: Record<string, unknown> } }).users ?? {}),
    }
  : undefined;

export const store = configureStore({
  reducer: {
    users: usersReducer,
    auth: authReducer,
    posts: postsReducer,
    comments: commentsReducer,
    theme: themeReducer,
    toast: toastReducer,
  },
  preloadedState: preloadedState as never,
});

store.subscribe(() => {
  const state = store.getState();
  const toPersist: PersistedState = {
    users: state.users,
    auth: state.auth,
    posts: state.posts,
    comments: state.comments,
  };
  savePersistedState(toPersist);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
