import { Client } from 'appwrite';
import { PUBLIC_API_ENDPOINT, PUBLIC_PROJECT_ID } from '$env/static/public';

const sdk = new Client().setEndpoint(PUBLIC_API_ENDPOINT).setProject(PUBLIC_PROJECT_ID);
