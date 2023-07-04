import { AppwriteService } from '$lib/AppwriteService';
import { Redirect, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async () => {
	try {
		AppwriteService.signOut();
	} catch (err: any) {
		console.log(err);
	}

	throw redirect(303, '/');
};
