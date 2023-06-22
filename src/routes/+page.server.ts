export const actions: Actions = {
    setTheme: async ({ url, cookies }) => {
        const theme = url.searchParams.get('theme');

        if (theme) {
            cookies.set('colortheme', theme, {
                path: '/',
            });
        }
    }
};

export const load = async ({ event }) => event.locals;