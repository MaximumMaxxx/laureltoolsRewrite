import { client } from './sdk';
import { Users } from 'node-appwrite';

export async function validUser(email: string, password: string) {
	const users = new Users(client);

	try {
		await users.get;
		return true;
	} catch (err) {
		console.log(err);
		return false;
	}
}
