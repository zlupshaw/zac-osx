<script lang="ts">
	import '../app.css';
	import BootScreen from '$lib/components/BootScreen.svelte';
	import favicon from '$lib/assets/favicon.svg';
	import Desktop from '$lib/components/Desktop.svelte';
	import { writable } from 'svelte/store';

	const bootDone = writable(false);

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if !$bootDone}
	<BootScreen onFinish={() => bootDone.set(true)} />
{:else}
	<Desktop />
{/if}
