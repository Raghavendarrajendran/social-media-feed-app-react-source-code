import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from '../index';
import { loginSuccess, loginFailure, loginStart } from '../slices/authSlice';
import { addUser } from '../slices/usersSlice';
import { selectAllUsernames } from '../slices/usersSlice';
import { sanitizeForStorage } from '../../utils/sanitize';

function mockHash(password: string): string {
  return `hash_${btoa(encodeURIComponent(password))}`;
}

export const registerThunk = createAsyncThunk<
  void,
  { name: string; username: string; password: string },
  { state: RootState; dispatch: AppDispatch }
>('auth/register', async (payload, { getState, dispatch }) => {
  const { name, username, password } = payload;
  const sanitizedName = sanitizeForStorage(name, 100);
  const sanitizedUsername = sanitizeForStorage(username, 50);
  const sanitizedPassword = sanitizeForStorage(password, 128);

  if (!sanitizedName || !sanitizedUsername || !sanitizedPassword) {
    throw new Error('All fields are required');
  }

  const usernames = selectAllUsernames(getState());
  if (usernames.includes(sanitizedUsername)) {
    throw new Error('Username already exists');
  }
  if (sanitizedUsername.toLowerCase() === 'admin') {
    throw new Error('Username "admin" is reserved');
  }

  const newUser = {
    id: `u${Date.now()}`,
    name: sanitizedName,
    username: sanitizedUsername,
    passwordHash: mockHash(sanitizedPassword),
    createdAt: new Date().toISOString(),
    isAdmin: false,
  };
  dispatch(addUser(newUser));
});

export const loginThunk = createAsyncThunk<
  void,
  { username: string; password: string },
  { state: RootState; dispatch: AppDispatch }
>('auth/login', async (payload, { getState, dispatch }) => {
  dispatch(loginStart());
  const { username, password } = payload;
  const sanitizedUsername = sanitizeForStorage(username, 50);
  const sanitizedPassword = sanitizeForStorage(password, 128);

  if (!sanitizedUsername || !sanitizedPassword) {
    dispatch(loginFailure('Username and password are required'));
    throw new Error('Username and password are required');
  }

  const users = Object.values(getState().users.items);
  const user = users.find((u) => u.username === sanitizedUsername);
  if (!user) {
    dispatch(loginFailure('Invalid username or password'));
    throw new Error('Invalid username or password');
  }

  const expectedHash = mockHash(sanitizedPassword);
  if (user.passwordHash !== expectedHash) {
    dispatch(loginFailure('Invalid username or password'));
    throw new Error('Invalid username or password');
  }

  dispatch(loginSuccess(sanitizedUsername));
});
