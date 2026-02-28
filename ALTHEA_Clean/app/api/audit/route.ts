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

        const body = await request.json();

        // Insert into audit_trail
        const { data, error } = await supabase
            .from('audit_trail')
            .insert({
                userId: user.id,
                action: body.action,
                entityType: body.entityType,
                entityId: body.entityId,
                details: body.details || {}
            })
            .select()
            .single();

        if (error) {
            console.error('Audit Log DB Error:', error);
            return NextResponse.json({ error: 'Failed to record audit log' }, { status: 500 });
        }

        return NextResponse.json({ success: true, auditLog: data });
    } catch (error) {
        console.error('Audit Log API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
