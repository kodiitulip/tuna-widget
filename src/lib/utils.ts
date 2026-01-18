import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseJSON = (json: string): object | null => {
  try {
    const jsonObj = JSON.parse(json);
    if (jsonObj && typeof jsonObj === 'object') return jsonObj;
  } catch (e) {
    if (e) return null;
    return null;
  }
  return null;
};

export const setHTMLAttribute = (qualifiedName: string, value: string) =>
  document.documentElement.setAttribute(qualifiedName, value);

export const cssMatchMedia = (query: string) => window.matchMedia(query).matches;

export const formatMsToMinutes = (ms: number): string => {
  const min = Math.floor(ms / 60000);
  const minStr = String(min).padStart(2, '0');
  const sec = ((ms % 60000) / 1000).toFixed(0);
  const secStr = String(sec).padStart(2, '0');
  return `${minStr}:${secStr}`;
};
