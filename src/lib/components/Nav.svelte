<script lang="ts">
	export let data;

	import logo from '$lib/assets/logo.png';
	import DarkModeSwitch from './DarkModeSwitch.svelte';
	import Profile from './Profile.svelte';
	import { page } from '$app/stores';

	let toggled = false;

	const handleChangeTheme = () => {
		const desiredTheme = toggled ? 'light' : 'dark';
		document.documentElement.setAttribute('data-theme', desiredTheme);
	};
</script>

<header class="sticky drop-shadow-sm dark:drop-shadow-lg">
	<div class="flex h-24 w-screen items-center justify-center bg-zinc-200 dark:bg-zinc-800">
		<!-- Content wrapper -->
		<div class="mx-16 flex w-full max-w-7xl justify-between">
			<!-- Logo section -->
			<div>
				<a href="/">
					<img src={logo} alt="A wrench and hammer inside a green laurel leaf" class="h-16" />
				</a>
			</div>

			<!-- Controls/nav bar -->
			<div class="flex flex-row items-center space-x-4">
				<nav>
					<a
						href="/ytdl"
						class="text-md rounded-md bg-emerald-600 p-4 text-white hover:bg-emerald-700"
						>Youtube downloader</a
					>
				</nav>
				<DarkModeSwitch />
				{#if data.authed}
					<Profile {data} />
				{:else}
					<a
						href="/login?redirect={$page.url.pathname}"
						class="text-md rounded-md bg-emerald-600 p-4 text-white hover:bg-emerald-700">Login</a
					>
				{/if}
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
