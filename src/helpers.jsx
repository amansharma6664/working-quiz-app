import { decode } from 'html-entities';

// Shuffle array elements randomly
export function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

// Decode HTML entities
export function decodeText(text) {
  return decode(text);
}

