<script lang="ts">
	import { goto } from '$app/navigation';
	import { state } from '$lib/store';
	import { onMount } from 'svelte';

	onMount(async () => {
		await state.checkSession().catch(() => {
			goto('/login');
		});
	});
	const logout = async () => {
		await state.logout();
		goto('/login');
	};
</script>

<h1 class="text-center text-4xl">App</h1>
<button on:click={logout}>Logout</button>
