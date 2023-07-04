// This file has to exist for hooks.server.ts to be called
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	return locals;
}) satisfies PageServerLoad;
