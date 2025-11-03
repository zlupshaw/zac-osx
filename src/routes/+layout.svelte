<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Desktop from '$lib/components/Desktop.svelte';
	import Bootscreen from '$lib/components/Bootscreen.svelte';

	import { writable } from 'svelte/store';

	const bootDone = writable(false);

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if !$bootDone}
	<Bootscreen onFinish={() => bootDone.set(true)} />
{:else}
	<Desktop />
{/if}
