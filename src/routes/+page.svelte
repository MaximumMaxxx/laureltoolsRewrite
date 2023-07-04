<script>
	import { invalidateAll } from '$app/navigation';

	export let data;
</script>

<h1 class="text-center text-5xl">Laurel Tools</h1>
<p class=" text-center">Get your stuff done without the hassle.</p>

{#if data.authed}
	<p>You are logged in</p>
	<button
		on:click={async () => {
			await fetch('/signout', {
				method: 'POST'
			});
			await invalidateAll();
		}}>Sign out</button
	>
{:else}
	<p>You are not logged in</p>
	<a href="/login">Sign in</a>
{/if}

<a href="/app" class="mx-2 rounded-sm bg-blue-400 p-1">To the app</a>
