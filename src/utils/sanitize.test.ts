import { describe, it, expect } from 'vitest';
import { sanitizeText, sanitizeForStorage } from './sanitize';

describe('sanitize utilities', () => {
  describe('sanitizeText', () => {
    it('escapes HTML entities', () => {
      expect(sanitizeText('<script>alert(1)</script>')).toBe(
        '&lt;script&gt;alert(1)&lt;/script&gt;'
      );
    });

    it('handles empty string', () => {
      expect(sanitizeText('')).toBe('');
    });

    it('trims whitespace', () => {
      expect(sanitizeText('  hello  ')).toBe('hello');
    });

    it('handles non-string input', () => {
      expect(sanitizeText(null as unknown as string)).toBe('');
      expect(sanitizeText(123 as unknown as string)).toBe('');
    });
  });

  describe('sanitizeForStorage', () => {
    it('sanitizes and limits length', () => {
      const long = 'a'.repeat(100);
      expect(sanitizeForStorage(long, 50).length).toBe(50);
    });

    it('escapes dangerous content', () => {
      expect(sanitizeForStorage('<img src=x>')).toBe('&lt;img src=x&gt;');
    });
  });
});
