import type { Actions } from './$types';
import { createUser } from '$lib/server/createUser';
import { fail, redirect } from '@sveltejs/kit';

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
			await createUser(email, password, name);
			throw redirect(303, '/login');
		} catch (err: any) {
			console.log('Form is invalid');
			return fail(400, {
				description: err.message
			});
		}
	}
};
