const SESSION_COOKIE_NAME = 'session_ref';
const COOKIE_MAX_AGE_DAYS = 7;
const COOKIE_PATH = '/';

/**
 * Safely set a non-sensitive session cookie (username only).
 * Uses SameSite=Strict and HttpOnly would require server; we use Lax for frontend-only.
 */
export function setSessionCookie(username: string): void {
  const expires = new Date();
  expires.setDate(expires.getDate() + COOKIE_MAX_AGE_DAYS);
  const value = encodeURIComponent(username);
  document.cookie = `${SESSION_COOKIE_NAME}=${value}; path=${COOKIE_PATH}; expires=${expires.toUTCString()}; SameSite=Lax`;
}

/**
 * Get the session reference (username) from cookie.
 * Returns null if missing or malformed.
 */
export function getSessionCookie(): string | null {
  try {
    const match = document.cookie.match(
      new RegExp(`(?:^|; )${SESSION_COOKIE_NAME}=([^;]*)`)
    );
    if (!match) return null;
    const value = decodeURIComponent(match[1]);
    return value && value.length > 0 ? value : null;
  } catch {
    return null;
  }
}

/**
 * Clear the session cookie.
 */
export function clearSessionCookie(): void {
  document.cookie = `${SESSION_COOKIE_NAME}=; path=${COOKIE_PATH}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}
