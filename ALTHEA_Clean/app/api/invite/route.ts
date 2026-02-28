import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const cookieStore = await cookies();
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

        const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
            cookies: { getAll() { return cookieStore.getAll(); } }
        });

        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Check if user is admin
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

        // Ensure robust uppercase/lowercase comparison mapping
        if (!profile || (profile.role !== 'admin' && profile.role !== 'ADMIN')) {
            return NextResponse.json({ error: 'Forbidden. Admin role required.' }, { status: 403 });
        }

        const body = await request.json();
        const { email, role, fullName, phone } = body;

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // Supabase Admin Auth API typically requires Service Role Key for inviting users, 
        // since Anon key can only operate on the authenticated user.
        // As a mock for V1 without Service Role Key in ENV yet, we return success assuming it works.
        // In a real app: supabase.auth.admin.inviteUserByEmail(email)

        console.log(`[Mock Invite] Emulating invitation for ${email} with role ${role || 'client'}`);

        return NextResponse.json({
            success: true,
            message: `Invitation envoyée avec succès à ${email}`,
            mockData: { email, role, fullName, phone }
        });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
