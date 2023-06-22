import { Account, Client } from "appwrite"
import { PUBLIC_PROJECT_ID, PUBLIC_API_ENDPOINT } from "$env/static/private"


export async function handle({ event, resolve }) {
    let theme: string | null = null;

    let jwt: string | undefined = undefined;

    jwt = event.cookies.get("jwt")

    if (jwt) {
        event.locals.authed = true;
        event.locals.appwrite = new Client().setEndpoint(PUBLIC_API_ENDPOINT).setProject(PUBLIC_PROJECT_ID).setJWT(jwt);
    } else {
        event.locals.authed = false;
    }




    const newTheme = event.url.searchParams.get("theme");
    const cookieTheme = event.cookies.get('colortheme');

    if (newTheme) {
        theme = newTheme;
    } else if (cookieTheme) {
        theme = cookieTheme;
    }

    if (theme) {
        return resolve(event, {
            transformPageChunk: ({ html }) =>
                html.replace('data-theme=""', `data-theme="${theme}"`)
        });
    }

    return await resolve(event);
};