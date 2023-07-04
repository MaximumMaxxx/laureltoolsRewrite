<!-- routes/login/+page.svelte -->
<script>
	export let form;
	import 'iconify-icon';
</script>

<div>
	<h1 class="mt-4 text-center text-5xl text-zinc-700 dark:text-white">Login</h1>
	<div class="mx-auto flex max-w-sm flex-col items-center">
		<form method="POST" class="flex w-full flex-col items-center" action="?/email">
			{#if form?.description}
				<p>{form.description}</p>
			{/if}
			<div class="flex w-full flex-col">
				<label for="email" class="text-sm text-gray-700 dark:text-zinc-200">Email</label>
				<input
					type="email"
					id="email"
					name="email"
					required
					class="bg-slate-50 dark:bg-zinc-600 dark:text-white"
				/>
			</div>
			<div class="mt-6 flex w-full flex-col">
				<label for="password" class="text-sm text-gray-700 dark:text-zinc-200">Password</label>
				<input
					type="password"
					id="password"
					name="password"
					required
					class="bg-slate-50 dark:bg-zinc-600 dark:text-white"
				/>
			</div>
			<button type="submit" class="mt-6 w-full rounded-md bg-emerald-600 p-3 text-white"
				>Login</button
			>
		</form>
		<!-- Oauth providers -->
		<form method="POST" action="?/discord" class="w-full">
			<button
				class="mt-6 flex w-full justify-center gap-2 rounded-md bg-[#586AEA] p-3 text-white"
				type="submit"
			>
				<iconify-icon icon="ic:baseline-discord" height="1.5rem" class="inline-block" />
				Sign in with Discord</button
			>
		</form>
	</div>
</div>
