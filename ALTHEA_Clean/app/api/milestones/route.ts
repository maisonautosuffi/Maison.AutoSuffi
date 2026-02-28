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

        const { data, error } = await supabase
            .from('milestone')
            .insert({
                projectId: body.projectId,
                label: body.label,
                weight: body.weight || 10,
                status: 'NOT_STARTED'
            })
            .select()
            .single();

        if (error) {
            console.error('Milestone DB Error:', error);
            return NextResponse.json({ error: 'Failed to record milestone' }, { status: 500 });
        }

        // Optional: Log audit trail
        await supabase.from('audit_trail').insert({
            userId: user.id,
            action: 'CREATE_MILESTONE',
            entityType: 'MILESTONE',
            entityId: data.id,
            details: { label: data.label }
        });

        return NextResponse.json({ success: true, milestone: data });
    } catch (error) {
        console.error('Milestones API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
