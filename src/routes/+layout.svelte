<script lang="ts">
	import '../app.css';
	import 'iconify-icon';
	export let data;
	import Nav from '$lib/components/Nav.svelte';
</script>

<html class="h-full bg-gray-100 dark:bg-slate-700" lang="en">
	<Nav {data} />
	<body class="h-full">
		<slot />
	</body>
</html>
