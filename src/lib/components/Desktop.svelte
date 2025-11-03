<script>
	import Dock from './Dock.svelte';
	import Window from './Window.svelte';
	import { windows, openWindow } from '$lib/stores/windows';
	import AboutApp from './apps/AboutApp.svelte'; // or your custom "UnderConstructionApp"
	import UnderConstruction from './apps/UnderConstruction.svelte';

	// Open "Under Construction" window on startup
	openWindow({
		id: 'under-construction',
		title: 'Under Construction',
		component: UnderConstruction, // or replace with your specific app
		x: 800,
		y: 100,
		height: 400,
		width: 300
	});
</script>

<div
	class="relative h-screen w-screen overflow-hidden bg-[url('/wallpapers/default.jpg')] bg-cover select-none"
>
	{#each $windows as win (win.id)}
		<Window
			id={win.id}
			title={win.title}
			x={win.x ?? 200}
			y={win.y ?? 150}
			width={win.width ?? 600}
			height={win.height ?? 400}
			z={win.z ?? 1}
		>
			<svelte:component this={win.component} {...win.props} />
		</Window>
	{/each}

	<!-- Dock commented out -->
	<!-- <Dock /> -->
</div>
