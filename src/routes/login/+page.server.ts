import { fail, redirect } from '@sveltejs/kit';
import {
	PUBLIC_API_ENDPOINT,
	PUBLIC_PROJECT_ID,
	PUBLIC_SSR_HOSTNAME,
	PUBLIC_NON_HTTP_APPWRITE_ENDPOINT
} from '$env/static/public';
import * as setCookie from 'set-cookie-parser';
import { Account, Client } from 'appwrite';

export const actions = {
	email: async ({ request, cookies }) => {
		let data = await request.formData();
		let email = data.get('email');
		let password = data.get('password');

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

		try {
			// We have to bypass the appwrite sdk becuase of first party cookie issues
			// This whole back basically makes a request to the email api and then proxies the cookie in response

			const response = await fetch(`${PUBLIC_API_ENDPOINT}/account/sessions/email`, {
				method: 'POST',
				headers: {
					'X-Appwrite-Project': PUBLIC_PROJECT_ID,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: email,
					password: password
				})
			});

			const json = await response.json();

			if (json.code >= 400) {
				console.log(json);
				return fail(400, {
					description: json.message
				});
			}

			const ssrHostname =
				PUBLIC_SSR_HOSTNAME === 'localhost' ? PUBLIC_SSR_HOSTNAME : '.' + PUBLIC_SSR_HOSTNAME;
			const appwriteHostname =
				PUBLIC_NON_HTTP_APPWRITE_ENDPOINT === 'localhost'
					? PUBLIC_NON_HTTP_APPWRITE_ENDPOINT
					: '.' + PUBLIC_NON_HTTP_APPWRITE_ENDPOINT;

			const cookieStr = (response.headers.get('set-cookie') ?? '')
				.split(appwriteHostname)
				.join(ssrHostname);

			const cookiesArray = setCookie.splitCookiesString(cookieStr);
			const cookiesParsed = cookiesArray.map((cookie) => setCookie.parseString(cookie));

			for (const cookie of cookiesParsed) {
				cookies.set(cookie.name, cookie.value, {
					domain: cookie.domain,
					secure: cookie.secure,
					sameSite: cookie.sameSite as any,
					path: cookie.path,
					maxAge: cookie.maxAge,
					httpOnly: cookie.httpOnly,
					expires: cookie.expires
				});
			}
		} catch (err: any) {
			console.log(err);
			return fail(400, {
				description: err
			});
		}

		const url = new URL(request.url);
		const searchParams = new URLSearchParams(url.search);
		const redirectTo = searchParams.get('redirect');

		throw redirect(303, redirectTo ?? '/');
	},
	discord: async ({ request, cookies }) => {
		// Appwrite's oatuh is not super well documented so I'll explain it here
		// First we have to make a request to the oauth2 endpoint to get the redirect url
		// Then we have to redirect the user to that url
		// Then when they authorize the app, discord will redirect them to the success url which is actually on the appwrite server
		// Appwrite will then set a cookie with the session id and redirect the user to the redirect url
		// Problem is that appwrite sets the cookie on the appwrite domain and not the sveltekit domain
		// Thus you have to set a custom domain for appwrite and then it'll be happy

		const redir = await fetch(
			`${PUBLIC_API_ENDPOINT}/account/sessions/oauth2/discord?success=http://${PUBLIC_SSR_HOSTNAME}/`,
			{
				headers: {
					'X-Appwrite-Project': PUBLIC_PROJECT_ID
				}
			}
		);
		const redirectURL = redir.url;

		throw redirect(303, redirectURL);
	}
};
