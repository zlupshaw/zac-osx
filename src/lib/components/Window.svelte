<script lang="ts">
	import { closeWindow, focusWindow } from '$lib/stores/windows';
	export let id: string;
	export let title: string;
	export let x = 200;
	export let y = 150;
	export let width = 600;
	export let height = 400;
	export let z = 1;

	let offset = { x: 0, y: 0 };
	let resizing = false;
	let dragging = false;

	function startDrag(e: MouseEvent) {
		if (e.button !== 0) return;
		focusWindow(id);
		dragging = true;
		offset = { x: e.clientX - x, y: e.clientY - y };
		window.addEventListener('mousemove', drag);
		window.addEventListener('mouseup', stopDrag);
	}
	function drag(e: MouseEvent) {
		if (dragging) {
			x = e.clientX - offset.x;
			y = e.clientY - offset.y;
		}
	}
	function stopDrag() {
		dragging = false;
		window.removeEventListener('mousemove', drag);
		window.removeEventListener('mouseup', stopDrag);
	}

	function startResize(e: MouseEvent) {
		resizing = true;
		offset = { x: e.clientX - width, y: e.clientY - height };
		window.addEventListener('mousemove', resize);
		window.addEventListener('mouseup', stopResize);
	}
	function resize(e: MouseEvent) {
		if (resizing) {
			width = Math.max(300, e.clientX - offset.x);
			height = Math.max(200, e.clientY - offset.y);
		}
	}
	function stopResize() {
		resizing = false;
		window.removeEventListener('mousemove', resize);
		window.removeEventListener('mouseup', stopResize);
	}

	function handleClose() {
		closeWindow(id);
	}
	function handleMinimize() {
		height = 40;
	}
	function handleZoom() {
		if (width < window.innerWidth - 80) {
			width = window.innerWidth - 80;
			height = window.innerHeight - 100;
			x = 40;
			y = 60;
		} else {
			width = 600;
			height = 400;
			x = 200;
			y = 150;
		}
	}
</script>

<div
	class="absolute overflow-hidden rounded-md border border-gray-400 bg-gray-100 shadow-md select-none"
	style="top:{y}px; left:{x}px; width:{width}px; height:{height}px; z-index:{z};"
	on:mousedown={() => focusWindow(id)}
>
	<!-- Title bar -->
	<div
		class="flex h-8 cursor-default items-center justify-between border-b border-gray-400 bg-gradient-to-b from-gray-200 to-gray-300 px-3"
		on:mousedown={startDrag}
	>
		<div class="flex items-center gap-2">
			<button
				class="h-3.5 w-3.5 rounded-full border border-red-600 bg-red-500"
				on:click|stopPropagation={handleClose}
				title="Close"
			></button>
			<button
				class="h-3.5 w-3.5 rounded-full border border-yellow-500 bg-yellow-400"
				on:click|stopPropagation={handleMinimize}
				title="Minimize"
			></button>
			<button
				class="h-3.5 w-3.5 rounded-full border border-green-600 bg-green-500"
				on:click|stopPropagation={handleZoom}
				title="Zoom"
			></button>
		</div>
		<div class="flex-1 text-center text-sm font-medium text-gray-700">{title}</div>
		<div class="w-[60px]"></div>
	</div>

	<!-- Content -->
	<div class="relative h-[calc(100%-2rem)] overflow-auto bg-gray-50 text-sm">
		<slot />
	</div>

	<!-- Resize corner -->
	<div class="absolute right-0 bottom-0 h-4 w-4 cursor-se-resize" on:mousedown={startResize}></div>
</div>
