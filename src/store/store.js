import { writable } from 'svelte/store';

export const feed = writable({});
export const feedUrl = writable();
export const userAgent = writable();
export const feedImage = writable(null);
export const feedTitle = writable(null);
export const feedItems = writable([]);
export const player = writable(null);
export const playerTime = writable(0);
export const chapters = writable(null);
export const chapterIndex = writable(0);
export const chapterImage = writable(null);
export const chapterText = writable('');
export const transcriptIndex = writable(0);
export const transcript = writable([]);
export const displayPage = writable('main');
export const apps = writable([]);
