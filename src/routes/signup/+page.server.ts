import { Account, Client, ID } from 'appwrite';
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { PUBLIC_API_ENDPOINT, PUBLIC_PROJECT_ID } from '$env/static/public';

export const actions: Actions = {
	default: async ({ request }) => {
		let data = await request.formData();
		let email = data.get('email');
		let password = data.get('password');
		let name = data.get('name');
		let passwordConfirm = data.get('confirm-password');

		if (!email) {
			return fail(400, {
				description: "Email can't be empty"
			});
		}

		if (!password) {
			return fail(400, {
				description: "Password can't be empty"
			});
		}

		if (!name) {
			return fail(400, {
				description: "Name can't be empty"
			});
		}

		if (password !== passwordConfirm) {
			return fail(400, {
				description: 'Passwords do not match'
			});
		}

		try {
			let client = new Client().setEndpoint(PUBLIC_API_ENDPOINT).setProject(PUBLIC_PROJECT_ID);
			let account = new Account(client);

			await account.create(ID.unique(), email.toString(), password.toString(), name.toString());
			throw redirect(303, '/login');
		} catch (err: any) {
			console.log(err);
			console.log('Form is invalid');
			return fail(400, {
				description: err.message
			});
		}
	}
};
