/**
 * Strips all emojis from a string using comprehensive Unicode ranges.
 */
export const stripEmojis = (input: string): string => {
  if (input === null || input === undefined) return '';
  if (typeof input !== 'string') return '';
  
  // Regex pattern covering standard emojis, presentation selectors, flags, ZWJ sequences, dingbats, etc.
  const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F1E6}-\u{1F1FF}]|[\u{1F191}-\u{1F251}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA70}-\u{1FAFF}]|[\u{2b50}]|[\u{1F004}]|[\u{231a}]|[\u{231b}]|[\u{23e9}-\u{23ec}]|[\u{23f0}]|[\u{23f3}]|[\u{25fe}]|[\u{fe0f}]|[\u{200d}]/gu;
  
  return input.replace(emojiRegex, '').trim();
};
