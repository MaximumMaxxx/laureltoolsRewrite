<script lang="ts">
	import { enhance } from '$app/forms';
	const submitUpdateTheme = ({ action }) => {
		const theme = action.searchParams.get('theme');

		if (theme) {
			document.documentElement.setAttribute('data-theme', theme);
		}
	};
</script>

<ul>
	<form method="post" use:enhance={submitUpdateTheme}>
		<li>
			<button formaction="/?/setTheme&theme=dark">Dark</button>
		</li>
		<li>
			<button formaction="/?/setTheme&theme=light">Light</button>
		</li>
	</form>
</ul>
