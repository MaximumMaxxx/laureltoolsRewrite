import { Account, Client } from 'appwrite';
import { PUBLIC_PROJECT_ID, PUBLIC_API_ENDPOINT } from '$env/static/public';
import { AppwriteService } from '$lib/AppwriteService';
import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
	// let theme: string | null = null;
	console.log(`Resolving request on ${event.url.pathname}`);

	const sessionNames = [
		'a_session_' + PUBLIC_PROJECT_ID.toLowerCase(),
		'a_session_' + PUBLIC_PROJECT_ID.toLowerCase() + '_legacy'
	];

	const hash = event.cookies.get(sessionNames[0]) ?? event.cookies.get(sessionNames[1]) ?? '';
	AppwriteService.setSession(hash);

	try {
		const account = await AppwriteService.getAccount();
		event.locals.authed = true;
		event.locals.account = account;
		console.log(`You be authed on ${account.name} ${event.url.pathname}`);
	} catch (err) {
		console.log(`Not authed on ${event.url.pathname}`);
		event.locals.authed = false;
	}

	if (event.url.pathname.startsWith('/app')) {
		if (!event.locals.authed) {
			throw redirect(303, '/login?redirect=' + event.url.pathname);
		}
	}

	// 	console.log(`Session: ${account.prefs}`);
	// 	event.locals.authed = true;
	// } else {
	// 	event.locals.authed = false;
	// }

	// const newTheme = event.url.searchParams.get('theme');
	// const cookieTheme = event.cookies.get('colortheme');

	// if (newTheme) {
	// 	theme = newTheme;
	// } else if (cookieTheme) {
	// 	theme = cookieTheme;
	// }

	// if (theme) {
	// 	return resolve(event, {
	// 		transformPageChunk: ({ html }) => html.replace('data-theme=""', `data-theme="${theme}"`)
	// 	});
	// }

	return await resolve(event);
}
