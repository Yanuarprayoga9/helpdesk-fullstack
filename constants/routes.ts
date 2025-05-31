/**
* The prefix for API authentication routes
* Routes that start with this prefix are used for default redirect if not login
* @type {string}
*/
export const DEFAULT_ISLOGIN_REDIRECT_ROUTE = "/private/tickets";
export const PRIVATE_ROUTE = "/private";
export const CONSOLE_ROUTE = `${PRIVATE_ROUTE}/console`;

export const CONSOLE_PROJECTS_ROUTE = `${CONSOLE_ROUTE}/projects`;
export const CONSOLE_CATEGORIES_ROUTE = `${CONSOLE_ROUTE}/categories`;
export const CONSOLE_USERS_ROUTE = `${CONSOLE_ROUTE}/users`;
export const CONSOLE_TICKETS_ROUTE = `${CONSOLE_ROUTE}/tickets`;
export const TICKETS_ROUTE = `${PRIVATE_ROUTE}/tickets`;
export const PROJECTS_ROUTE = `${PRIVATE_ROUTE}/projects`;
  /**
     * An array of routes that are used for authentication
     * These routes will redirect logged in users to /settings
     * @type {string[]}
     */
  export  const authRoutes = [
    "/login",
    "/register",
];



