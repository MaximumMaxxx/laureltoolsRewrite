import { Account, Avatars, Client } from 'appwrite';
import { PUBLIC_API_ENDPOINT, PUBLIC_PROJECT_ID } from '$env/static/public';

const client = new Client();
client.setEndpoint(PUBLIC_API_ENDPOINT).setProject(PUBLIC_PROJECT_ID);

const account = new Account(client);
const avatars = new Avatars(client);

export const AppwriteService = {
	signOut: async () => {
		await account.deleteSession('current');
	},
	getAccount: async () => {
		return await account.get<any>();
	},
	getAccountPicture: (name: string) => {
		return avatars.getInitials(name.split('').reverse().join(''), 256, 256).toString();
	},
	setSession: (hash: string) => {
		const authCookies: any = {};
		authCookies['a_session_' + PUBLIC_PROJECT_ID] = hash;
		client.headers['X-Fallback-Cookies'] = JSON.stringify(authCookies);
	}
};
