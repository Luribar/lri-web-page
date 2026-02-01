import { writable } from 'svelte/store';

type Theme = 'light' | 'dark';

const storedTheme = typeof localStorage !== 'undefined' ? localStorage.getItem('theme') as Theme | null : null;

export const theme = writable<Theme>(storedTheme || 'dark');

if (typeof localStorage !== 'undefined') {
  theme.subscribe(value => {
    localStorage.setItem('theme', value);
  });
}
