import { describe, it, expect, beforeEach } from 'vitest';
import {
  setSessionCookie,
  getSessionCookie,
  clearSessionCookie,
} from './cookie';

describe('cookie utilities', () => {
  beforeEach(() => {
    document.cookie.split(';').forEach((c) => {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });
  });

  it('sets and gets session cookie', () => {
    setSessionCookie('alice');
    expect(getSessionCookie()).toBe('alice');
  });

  it('returns null when cookie is not set', () => {
    expect(getSessionCookie()).toBeNull();
  });

  it('clears session cookie', () => {
    setSessionCookie('bob');
    expect(getSessionCookie()).toBe('bob');
    clearSessionCookie();
    expect(getSessionCookie()).toBeNull();
  });

  it('handles special characters in username', () => {
    setSessionCookie('user_name-123');
    expect(getSessionCookie()).toBe('user_name-123');
  });
});
