import { Client, ID, Users } from 'node-appwrite';

import { PUBLIC_PROJECT_ID, PUBLIC_API_ENDPOINT } from '$env/static/public';
import { PRIVATE_API_KEY } from '$env/static/private';

export const client = new Client()
	.setEndpoint(PUBLIC_API_ENDPOINT) // Your Appwrite Endpoint
	.setProject(PUBLIC_PROJECT_ID) // Your project ID
	.setKey(PRIVATE_API_KEY); // Your secret API key
