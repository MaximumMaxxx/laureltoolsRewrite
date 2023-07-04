<script lang="ts">
	import '../app.css';
	import 'iconify-icon';
	export let data;
	import Nav from '$lib/components/Nav.svelte';
</script>

<html class="min-h-screen bg-zinc-100 transition-colors duration-200 dark:bg-zinc-700" lang="en">
	<Nav {data} />
	<body class="flex flex-col items-center">
		<div class="mx-16 w-full max-w-7xl">
			<slot />
		</div>
	</body>
</html>
