import { NextResponse } from 'next/server';

export function middleware(req) {
    const token = req.cookies.get('token');
    const authRoutes = ['/dashboard']; // Add protected routes here

    if (authRoutes.includes(req.nextUrl.pathname) && !token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: ['/dashboard', '/profile'], // Protect these routes
};
