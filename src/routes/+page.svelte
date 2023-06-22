<script>
	import Nav from '$lib/components/Nav.svelte';

	export let data;
		
	console.log(data);
</script>

<Nav />
<h1 class="text-center text-5xl">Laurel Tools</h1>
<p class=" text-center">Get your stuff done without the hassle.</p>

{#if data.authed}
	<p>You are logged in</p>
{/if}
