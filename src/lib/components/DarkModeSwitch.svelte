<script lang="ts">
	// Todo: This is severly over engineered
	export let width = 20;
	export let height = 10;
	export let innerPadding = 0.5;

	import 'iconify-icon';
	import { Switch } from '@rgossiaux/svelte-headlessui';
	import { cubicInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import { tweened } from 'svelte/motion';

	let toggled = false;

	let innerSize = height - 2 * innerPadding;

	// Final result is in rem
	$: transformSize = ($slidePos * (width / 2 - innerSize / 2 - innerPadding)) / 4;

	// This is dumb but you can use svelte easing functions on it and that's nice
	const slidePos = tweened(-1, {
		duration: 200,
		easing: cubicInOut
	});

	const handleChangeTheme = () => {
		slidePos.set($slidePos * -1);
		const desiredTheme = toggled ? 'light' : 'dark';
		document.documentElement.setAttribute('data-theme', desiredTheme);
		console.log(`colortheme=${desiredTheme}; path=/`);
		// cookie api is bad
		document.cookie = `colortheme=${desiredTheme};path=/`;
	};
</script>

<Switch
	bind:checked={toggled}
	on:click={handleChangeTheme}
	class="relative grid h-20 grid-cols-1 grid-rows-1 items-center justify-items-center rounded-full border-2 border-solid border-slate-700 bg-emerald-300 transition-all duration-75 dark:border-slate-300 dark:bg-emerald-800"
	style={`height: ${height / 4}rem; width: ${width / 4}rem`}
>
	<span
		class="absolute flex items-center justify-center rounded-full bg-emerald-800 transition-colors dark:bg-emerald-300"
		style="transform: TranslateX({transformSize}rem); height: {innerSize /
			4}rem; width: {innerSize / 4}rem;"
	>
		{#if toggled}
			<iconify-icon
				out:fade={{ duration: 100 }}
				in:fade={{ delay: 100, duration: 100 }}
				icon="carbon:moon"
			/>
		{:else}
			<!-- else content here -->
			<iconify-icon
				out:fade={{ duration: 100 }}
				in:fade={{ delay: 100, duration: 100 }}
				icon="carbon:sun"
				class="text-white"
			/>
		{/if}
	</span>
</Switch>

<style>
</style>
