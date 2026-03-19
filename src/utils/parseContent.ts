/**
 * Extract hashtags from text (#tag)
 */
export function extractHashtags(text: string): string[] {
  const matches = text.match(/#(\w+)/g);
  return matches ? [...new Set(matches.map((m) => m.slice(1)))] : [];
}

/**
 * Extract mentions from text (@username)
 */
export function extractMentions(text: string): string[] {
  const matches = text.match(/@(\w+)/g);
  return matches ? [...new Set(matches.map((m) => m.slice(1)))] : [];
}
