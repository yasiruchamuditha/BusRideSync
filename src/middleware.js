import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('token'); // Retrieve the token from cookies

  // Protected routes
  const protectedRoutes = ['/home', '/profile'];

  // Check if the route is protected and the user is not authenticated
  if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL('/', req.url)); // Redirect to the login page
  }

  return NextResponse.next(); // Allow access if authenticated
}

export const config = {
  matcher: ['/home', '/profile'], // Apply middleware to these routes
};
