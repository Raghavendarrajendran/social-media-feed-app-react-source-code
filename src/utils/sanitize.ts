/**
 * Sanitize user input for display.
 * Removes or escapes potentially dangerous characters.
 * Do NOT use dangerouslySetInnerHTML with user content.
 */
export function sanitizeText(input: string): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

/**
 * Trim and limit length for safe storage.
 */
export function sanitizeForStorage(input: string, maxLength = 5000): string {
  const sanitized = sanitizeText(input);
  return sanitized.slice(0, maxLength);
}
