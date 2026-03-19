import { createSlice } from '@reduxjs/toolkit';
import type { AuthState } from '../../types';
import { setSessionCookie, clearSessionCookie } from '../../utils/cookie';

const initialState: AuthState = {
  isAuthenticated: false,
  currentUsername: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: { payload: string }) {
      state.isAuthenticated = true;
      state.currentUsername = action.payload;
      state.loading = false;
      state.error = null;
      setSessionCookie(action.payload);
    },
    loginFailure(state, action: { payload: string }) {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.currentUsername = null;
    },
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.currentUsername = null;
      state.error = null;
      clearSessionCookie();
    },
    restoreSession(state, action: { payload: string }) {
      state.isAuthenticated = true;
      state.currentUsername = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const {
  loginSuccess,
  loginFailure,
  loginStart,
  logout,
  restoreSession,
  clearError,
} = authSlice.actions;
export default authSlice.reducer;
