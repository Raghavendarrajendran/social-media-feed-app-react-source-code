import { describe, it, expect } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../slices/usersSlice';
import authReducer from '../slices/authSlice';
import postsReducer from '../slices/postsSlice';
import commentsReducer from '../slices/commentsSlice';
import themeReducer from '../slices/themeSlice';
import toastReducer from '../slices/toastSlice';
import { registerThunk, loginThunk } from './authThunks';

function createStore() {
  return configureStore({
    reducer: {
      auth: authReducer,
      users: usersReducer,
      posts: postsReducer,
      comments: commentsReducer,
      theme: themeReducer,
      toast: toastReducer,
    },
    preloadedState: {
      users: {
        items: {
          u1: {
            id: 'u1',
            name: 'Alice',
            username: 'alice',
            passwordHash: 'hash_' + btoa(encodeURIComponent('password123')),
            createdAt: '2024-01-01',
          },
        },
      },
    },
  });
}

describe('authThunks', () => {
  describe('registerThunk', () => {
    it('adds user and succeeds when username is unique', async () => {
      const testStore = createStore();
      await testStore.dispatch(
        registerThunk({ name: 'Bob', username: 'bob', password: 'pass123' })
      );
      const users = Object.values(testStore.getState().users.items);
      expect(users.some((u) => u.username === 'bob')).toBe(true);
    });

    it('rejects when username already exists', async () => {
      const testStore = createStore();
      const result = await testStore.dispatch(
        registerThunk({ name: 'Alice 2', username: 'alice', password: 'pass' })
      );
      expect(result.type).toBe('auth/register/rejected');
      expect((result as { error: { message: string } }).error?.message).toBe(
        'Username already exists'
      );
    });

    it('rejects when username is admin (reserved)', async () => {
      const testStore = configureStore({
        reducer: {
          auth: authReducer,
          users: usersReducer,
          posts: postsReducer,
          comments: commentsReducer,
          theme: themeReducer,
          toast: toastReducer,
        },
        preloadedState: {
          users: {
            items: {
              u1: {
                id: 'u1',
                name: 'Bob',
                username: 'bob',
                passwordHash: 'hash_x',
                createdAt: '2024-01-01',
              },
            },
          },
        },
      });
      const result = await testStore.dispatch(
        registerThunk({ name: 'Admin', username: 'admin', password: 'pass' })
      );
      expect(result.type).toBe('auth/register/rejected');
      expect((result as { error: { message: string } }).error?.message).toContain(
        'reserved'
      );
    });

    it('rejects when fields are empty', async () => {
      const testStore = createStore();
      const result = await testStore.dispatch(
        registerThunk({ name: '', username: '', password: '' })
      );
      expect(result.type).toBe('auth/register/rejected');
      expect((result as { error: { message: string } }).error?.message).toBe(
        'All fields are required'
      );
    });
  });

  describe('loginThunk', () => {
    it('dispatches loginSuccess for valid credentials', async () => {
      const testStore = createStore();
      await testStore.dispatch(
        loginThunk({ username: 'alice', password: 'password123' })
      );
      expect(testStore.getState().auth.isAuthenticated).toBe(true);
      expect(testStore.getState().auth.currentUsername).toBe('alice');
    });

    it('dispatches loginFailure for invalid username', async () => {
      const testStore = createStore();
      await testStore.dispatch(
        loginThunk({ username: 'unknown', password: 'password123' })
      );
      expect(testStore.getState().auth.isAuthenticated).toBe(false);
      expect(testStore.getState().auth.error).toBeTruthy();
    });

    it('dispatches loginFailure for wrong password', async () => {
      const testStore = createStore();
      await testStore.dispatch(
        loginThunk({ username: 'alice', password: 'wrongpassword' })
      );
      expect(testStore.getState().auth.isAuthenticated).toBe(false);
      expect(testStore.getState().auth.error).toBeTruthy();
    });
  });
});
