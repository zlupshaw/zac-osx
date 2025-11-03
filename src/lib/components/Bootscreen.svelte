<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	export let onFinish;
	let visible = writable(true);

	onMount(() => {
		setTimeout(() => {
			visible.set(false);
			onFinish && onFinish();
		}, 3000);
	});
</script>

{#if $visible}
	<div class="fixed inset-0 flex items-center justify-center bg-[#3B66B0]">
		<div
			class="relative flex h-[260px] w-[420px] flex-col items-center justify-center border border-gray-400 bg-[#f9f9f9] text-gray-900 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
			style="background-image: repeating-linear-gradient(
				0deg,
				#f9f9f9,
				#f9f9f9 1px,
				#f3f3f3 1px,
				#f3f3f3 2px
			);"
		>
			<!-- Apple logo -->
			<img src="/icons/acorn.svg" alt="Zac OS X" class="h-24 w-24" />

			<!-- Title -->
			<div class="mb-3 font-serif text-3xl text-gray-800">Zac OS X</div>

			<!-- Progress bar -->
			<div class="h-3 w-48 overflow-hidden rounded-sm border border-gray-400 bg-[#d9d9d9]">
				<div
					class="h-full bg-gradient-to-b from-[#bfbfbf] to-[#9e9e9e]"
					style="animation: load 3s linear forwards;"
				></div>
				<style>
					@keyframes load {
						from {
							width: 0%;
						}
						to {
							width: 100%;
						}
					}
				</style>
			</div>

			<!-- Footer text -->
			<div class="mt-3 text-sm text-gray-700">Welcome to Zacintosh.</div>
		</div>
	</div>
{/if}

<style>
	@keyframes load {
		from {
			width: 0%;
		}
		to {
			width: 100%;
		}
	}
</style>
