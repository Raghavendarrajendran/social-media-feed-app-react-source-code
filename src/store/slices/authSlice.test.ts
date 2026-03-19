import { describe, it, expect, vi } from 'vitest';
import authReducer, {
  loginSuccess,
  loginFailure,
  logout,
  restoreSession,
} from './authSlice';

vi.mock('../../utils/cookie', () => ({
  setSessionCookie: vi.fn(),
  clearSessionCookie: vi.fn(),
  getSessionCookie: vi.fn(),
}));

describe('authSlice', () => {

  it('handles loginSuccess', () => {
    const state = authReducer(undefined, loginSuccess('alice'));
    expect(state.isAuthenticated).toBe(true);
    expect(state.currentUsername).toBe('alice');
    expect(state.error).toBeNull();
  });

  it('handles loginFailure', () => {
    const state = authReducer(undefined, loginFailure('Invalid credentials'));
    expect(state.isAuthenticated).toBe(false);
    expect(state.currentUsername).toBeNull();
    expect(state.error).toBe('Invalid credentials');
  });

  it('handles logout', () => {
    const state = authReducer(
      { isAuthenticated: true, currentUsername: 'alice', loading: false, error: null },
      logout()
    );
    expect(state.isAuthenticated).toBe(false);
    expect(state.currentUsername).toBeNull();
  });

  it('handles restoreSession', () => {
    const state = authReducer(undefined, restoreSession('bob'));
    expect(state.isAuthenticated).toBe(true);
    expect(state.currentUsername).toBe('bob');
  });
});
