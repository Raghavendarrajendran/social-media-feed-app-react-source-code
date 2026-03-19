import DOMPurify from 'dompurify';

/**
 * Sanitize HTML for safe display.
 * Allows only safe formatting tags: p, br, strong, em, u, s, ul, ol, li, a (with href).
 * Use with dangerouslySetInnerHTML only after sanitization.
 */
export function sanitizeHtml(html: string): string {
  if (typeof html !== 'string') return '';
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 's', 'ul', 'ol', 'li', 'a'],
    ALLOWED_ATTR: ['href'],
    ALLOW_DATA_ATTR: false,
  });
}

/**
 * Check if content appears to be HTML (from rich text editor).
 */
export function isHtmlContent(content: string): boolean {
  return typeof content === 'string' && /<[a-z][\s\S]*>/i.test(content);
}
