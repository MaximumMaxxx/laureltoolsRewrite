<!-- Here's some half-broken text resize code. Good luck :) -->

<script lang="ts">
	import { tick } from 'svelte';
	import { onMount } from 'svelte';

	let w = 0;
	let h = 0;
	let size = 500;

	let text = 'edit this text';

	const maxIteraitons = 2;

	let bodyW = 0;
	let bodyH = 0;

	let el: HTMLDivElement;
	let maxSize = 1000;
	let minSize = 0;
	const handleMaxSize = () => {
		w = el?.offsetWidth;

		for (let i = 0; i < maxIteraitons; i++) {
			setTimeout(() => {
				console.log(w);
				let isBigger = bodyW < w;

				size = maxSize / 2;
				isBigger = bodyW < w;
				if (!isBigger) {
					size = (minSize + size) / 2;
					maxSize = size;
				} else {
					size = (maxSize + size) / 2;
					minSize = size;
				}
				w = el?.offsetWidth;
				console.log(w);
			}, 1000 * i);
		}
	};
</script>

<label>
	<button on:click={handleMaxSize}>Submit</button>
	<input type="text" bind:value={text} />
	font size ({size}px) | W: {w}, bodyW: {bodyW}
</label>

<svelte:window bind:innerWidth={bodyW} bind:innerHeight={bodyH} />

<body class="h-screen w-screen">
	<div style="width: fit-content; height: fit-content;" bind:this={el} bind:clientHeight={h}>
		<span style="font-size: {size}px" contenteditable>{text}</span>

		<span class="size">{w} x {h}px</span>
	</div>
</body>

<style>
	div {
		position: relative;
		display: inline-block;
		padding: 0.5rem;
		background: hsla(15, 100%, 50%, 0.1);
		border: 1px solid hsl(15, 100%, 50%);
	}

	.size {
		position: absolute;
		right: -1px;
		bottom: -1.4em;
		line-height: 1;
		background: hsl(15, 100%, 50%);
		color: white;
		padding: 0.2em 0.5em;
		white-space: pre;
	}

	span {
		display: inline-block;
		white-space: nowrap;
	}
</style>
