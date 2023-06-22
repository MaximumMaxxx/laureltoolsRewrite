import { Users, ID } from 'node-appwrite';
import { client } from './sdk';

export async function createUser(email: string, password: string, name: string) {
	const users = new Users(client);

	console.log('Creating user...');
	console.log(`email: ${email}`);
	console.log(`password: ${password}`);
	console.log(`name: ${name}`);

	try {
		await users.create(ID.unique(), email, null, password, name);
	} catch (err) {
		throw new Error(err.message);
	}
}
