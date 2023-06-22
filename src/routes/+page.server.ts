import type { Action } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const actions: Action = {
	setTheme: async ({ url, cookies }) => {
		const theme = url.searchParams.get('theme');

		if (theme) {
			cookies.set('colortheme', theme, {
				path: '/'
			});
		}
	}
};

export const load: PageServerLoad = async ({ locals }) => {
	return locals;
};
