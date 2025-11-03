import { writable } from 'svelte/store';

// Shape of a window entry
export interface WindowEntry {
	id: string; // unique identifier
	title: string; // window title
	component: any; // Svelte component reference
	props?: Record<string, any>; // optional props for the component
	x?: number; // position
	y?: number;
	width?: number;
	height?: number;
	z?: number; // for stacking order
}

// Main list of open windows
export const windows = writable<WindowEntry[]>([]);

// Track which window is focused (on top)
export const activeWindow = writable<string | null>(null);

// Utility: open a new window
export function openWindow(entry: Omit<WindowEntry, 'z'>) {
	windows.update((list) => {
		// Prevent duplicate IDs
		if (list.some((w) => w.id === entry.id)) return list;

		const nextZ = list.length ? Math.max(...list.map((w) => w.z || 0)) + 1 : 1;
		return [...list, { ...entry, z: nextZ }];
	});
	activeWindow.set(entry.id);
}

// Utility: bring an existing window to front
export function focusWindow(id: string) {
	windows.update((list) => {
		const maxZ = list.length ? Math.max(...list.map((w) => w.z || 0)) + 1 : 1;
		return list.map((w) => (w.id === id ? { ...w, z: maxZ } : w));
	});
	activeWindow.set(id);
}

// Utility: close a window
export function closeWindow(id: string) {
	windows.update((list) => list.filter((w) => w.id !== id));
	if (activeWindow === id) activeWindow.set(null);
}
