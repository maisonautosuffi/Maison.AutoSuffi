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
            .from('issue')
            .insert({
                projectId: body.projectId,
                milestoneId: body.milestoneId || null,
                reportedById: user.id,
                title: body.title,
                description: body.description,
                severity: body.severity || 'MEDIUM',
                status: 'OPEN'
            })
            .select()
            .single();

        if (error) {
            console.error('Issue DB Error:', error);
            return NextResponse.json({ error: 'Failed to record issue' }, { status: 500 });
        }

        // Optional: Log audit trail
        await supabase.from('audit_trail').insert({
            userId: user.id,
            action: 'CREATE_ISSUE',
            entityType: 'ISSUE',
            entityId: data.id,
            details: { title: data.title }
        });

        return NextResponse.json({ success: true, issue: data });
    } catch (error) {
        console.error('Issues API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
