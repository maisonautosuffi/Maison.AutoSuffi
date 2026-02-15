import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');

    if (isDashboard) {
        const session = request.cookies.get('auth_session');

        // Exception for demo mode (optional, for testing without login)
        // To enable strict security, remove this condition
        const isDemo = request.nextUrl.searchParams.get('demo') === 'true';
        if (isDemo) return NextResponse.next();

        if (!session) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
};
