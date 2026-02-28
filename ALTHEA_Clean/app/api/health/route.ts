import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() { return cookieStore.getAll() }
                }
            }
        );

        // Test database connection using the V1 models
        const { count: profileCount, error: profileError } = await supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true });

        if (profileError) throw profileError;

        const { count: projectCount, error: projectError } = await supabase
            .from('project')
            .select('*', { count: 'exact', head: true });

        if (projectError) throw projectError;

        return NextResponse.json({
            status: 'ok',
            database: 'connected',
            stats: {
                profiles: profileCount,
                projects: projectCount,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Health check failed:', error);
        return NextResponse.json(
            {
                status: 'error',
                database: 'disconnected',
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
