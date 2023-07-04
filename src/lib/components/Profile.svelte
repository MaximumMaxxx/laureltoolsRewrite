<script>
	import { AppwriteService } from '$lib/AppwriteService';
	import { invalidateAll } from '$app/navigation';

	export let data;

	const logout = async () => {
		await fetch('/signout', {
			method: 'POST'
		});
		await invalidateAll();
	};

	async function getpfp() {
		const url = AppwriteService.getAccountPicture(data.account.name);
		return url;
	}

	let promise = getpfp();
</script>

<!-- <button
	class="relative h-12 w-12 rounded-full border-2 border-solid border-black bg-red-400"
	on:click={(opened = !opened)}
> -->
<!-- {#if opened}
		<div class="absolute h-10 w-4 bg-black" />
	{/if} -->
<!-- </button> -->

<button
	class="relative h-12 w-12 rounded-full border-2 border-solid border-black dark:border-zinc-300"
	title="logout"
	on:click={logout}
>
	{#await promise}
		<span class="h-full w-full rounded-full bg-zinc-300" />
	{:then url}
		<img src={url} alt="" class="rounded-full" />
	{:catch error}
		<span>{error}</span>
	{/await}
	<!-- Show the pfp here -->
</button>
