import { fail, type Actions, redirect } from '@sveltejs/kit';
import {
	PUBLIC_API_ENDPOINT,
	PUBLIC_PROJECT_ID,
	PUBLIC_SSR_HOSTNAME,
	PUBLIC_NON_HTTP_APPWRITE_ENDPOINT
} from '$env/static/public';
import * as setCookie from 'set-cookie-parser';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		console.log('Login action called');
		let data = await request.formData();
		let email = data.get('email');
		let password = data.get('password');

		if (!email) {
			console.log('Email is empty');
			return fail(400, {
				description: "Email can't be empty"
			});
		}

		if (!password) {
			console.log('Password is empty');
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

			console.log(cookiesParsed);

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
		// Todo: Make this a redirect
		throw redirect(303, '/');
	}
};
