<script lang="ts">
	import { openWindow, windows } from '$lib/stores/windows';
	import FinderApp from './apps/FinderApp.svelte';
	import TerminalApp from './apps/TerminalApp.svelte';
	import SettingsApp from './apps/SettingsApp.svelte';
	import AboutApp from './apps/AboutApp.svelte';
	import { get } from 'svelte/store';

	const apps = [
		{
			id: 'finder',
			icon: '/docks/finder.png',
			title: 'Finder',
			component: FinderApp,
			x: 300,
			y: 600
		},
		{
			id: 'terminal',
			icon: '/docks/terminal.png',
			title: 'Terminal',
			component: TerminalApp,
			x: 500,
			y: 200
		},
		{
			id: 'settings',
			icon: '/docks/settings.png',
			title: 'Settings',
			component: SettingsApp,
			x: 500,
			y: 900
		},
		{
			id: 'about',
			icon: '/docks/about.png',
			title: 'About',
			component: AboutApp,
			x: 800,
			y: 900
		}
	];

	function launch(app) {
		const open = get(windows).some((w) => w.id === app.id);
		if (!open) {
			openWindow({
				id: app.id,
				title: app.title,
				component: app.component,
				props: { title: app.title, id: app.id, x: app.x, y: app.y }
			});
		}
	}
</script>

<!-- Dock background -->
<div
	class="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-5 rounded-3xl border border-white/30 bg-gradient-to-t from-gray-400/50 to-gray-100/60 px-6 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-lg"
>
	{#each apps as app}
		<button
			class="relative flex flex-col items-center transition-transform hover:scale-110 active:scale-95"
			on:click={() => launch(app)}
			title={app.title}
		>
			<img src={app.icon} alt={app.title} class="h-10 w-10 rounded-md" />
			<!-- Dot indicator for open apps -->
			{#if $windows.find((w) => w.id === app.id)}
				<div class="absolute -bottom-2 h-2 w-2 rounded-full bg-gray-700"></div>
			{/if}
		</button>
	{/each}
</div>
