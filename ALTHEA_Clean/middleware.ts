import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createSupabaseMiddlewareClient } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
    const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');

    if (isDashboard) {
        // Exception for demo mode (optional, for testing without login)
        // To enable strict security, remove this condition
        const isDemo = request.nextUrl.searchParams.get('demo') === 'true';
        if (isDemo) return NextResponse.next();

        const response = NextResponse.next();
        const supabase = createSupabaseMiddlewareClient(request, response);

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        return response;
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
};
