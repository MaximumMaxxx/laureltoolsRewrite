import type { Appwrite, Account } from 'appwrite';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			authed: boolean;
			account: any;
			darkTheme: boolean;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
