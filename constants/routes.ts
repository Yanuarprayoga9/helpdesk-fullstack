/**
* The prefix for API authentication routes
* Routes that start with this prefix are used for default redirect if not login
* @type {string}
*/
export const DEFAULT_ISLOGIN_REDIRECT = "/tickets";

  /**
     * An array of routes that are used for authentication
     * These routes will redirect logged in users to /settings
     * @type {string[]}
     */
  export  const authRoutes = [
    "/login",
    "/register",
];
