/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/", "/login",
  , "/auth/new-verification"];
/**
* The prefix for API authentication routes
* Routes that start with this prefix are used for default redirect if not login
* @type {string[]}
*/
export const protectedRoutes = ["/dashboard/tickets", "/dashboard/projects", "/dashboard/users", "/dashboard"];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
  "/login",
  "/register",
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
//   export const apiAuthPrefix = "/api/auth";


/**
* The prefix for API authentication routes
* Routes that start with this prefix are used for default redirect if not login
* @type {string}
*/
export const DEFAULT_ISLOGIN_REDIRECT = "/dashboard";




/**
* An array of routes that are used for authentication
* These routes will redirect logged in users to /settings
* @type {string[]}
*/
export const adminRoutes = [
  "/admin",
];
