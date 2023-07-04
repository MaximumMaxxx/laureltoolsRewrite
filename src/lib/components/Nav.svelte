<script lang="ts">
	import type {} from '../../app';
	export let locals;

	import { Switch } from '@rgossiaux/svelte-headlessui';
	import { slide } from 'svelte/transition';
	import { elasticInOut } from 'svelte/easing';
	import logo from '$lib/assets/logo.png';
	import DarkModeSwitch from './DarkModeSwitch.svelte';

	let toggled = false;

	const handleChangeTheme = () => {
		const desiredTheme = toggled ? 'light' : 'dark';
		document.documentElement.setAttribute('data-theme', desiredTheme);
	};
</script>

<header class="sticky drop-shadow-lg">
	<div class="flex h-24 w-screen items-center justify-center bg-zinc-800">
		<!-- Content wrapper -->
		<div class="flex w-full max-w-6xl justify-between px-16">
			<!-- Logo section -->
			<div>
				<a href="/">
					<img src={logo} alt="A wrench and hammer inside a green laurel leaf" class="h-16" />
				</a>
			</div>

			<!-- Controls/nav bar -->
			<div class="flex flex-row items-center space-x-4">
				<DarkModeSwitch />
				<nav>
					<a href="/app" class="text-md rounded-md bg-emerald-600 p-4 text-white"
						>Youtube downloader</a
					>
				</nav>
			</div>
		</div>

		<!-- <form
		method="post"
		use:enhance={submitUpdateTheme}
		action="/?/setTheme&theme={toggled ? 'dark' : 'light'}"
		class="inline-block"
	>
		<span class="text-sm">Light</span>

		<div class="relative mt-0 inline-flex w-10 flex-col items-center justify-center align-middle">
			<button
				type="submit"
				on:click={() => {
					toggled = !toggled;
				}}
				class="top-0 m-0 block h-5 w-10 rounded-full bg-slate-500 p-0"
			/>
			<div
				class="pointer-events-none absolute top-1 inline h-3 w-3 {toggled
					? '-translate-x-2.5'
					: 'translate-x-2.5'} rounded-full bg-red-600"
				transition:slide={{
					easing: elasticIn,
					duration: 400
				}}
			/>
		</div>
		<span class="text-sm">Dark</span>
	</form> -->
	</div>
</header>

<style>
</style>
