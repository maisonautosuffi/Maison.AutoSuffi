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
            .from('project_milestones')
            .insert({
                project_id: body.projectId,
                label: body.label,
                status: 'NOT_STARTED'
            })
            .select()
            .single();

        if (error) {
            console.error('Milestone DB Error:', error);
            return NextResponse.json({ error: 'Failed to record milestone: ' + error.message, details: error }, { status: 500 });
        }

        // Optional: Log audit trail
        await supabase.from('audit_events').insert({
            actor_id: user.id,
            action: 'CREATE_MILESTONE',
            resource_type: 'MILESTONE',
            resource_id: String(data.id),
            details: JSON.stringify({ label: data.label })
        });

        return NextResponse.json({ success: true, milestone: data });
    } catch (error) {
        console.error('Milestones API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const projectId = searchParams.get('projectId');

        const cookieStore = await cookies();
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

        const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
            cookies: { getAll() { return cookieStore.getAll() } }
        });

        let query = supabase.from('project_milestones').select('*').order('created_at', { ascending: true });

        if (projectId) {
            query = query.eq('project_id', projectId);
        }

        const { data: milestones, error } = await query;

        if (error) throw error;

        return NextResponse.json({ milestones });
    } catch (error) {
        console.error('Error fetching milestones:', error);
        return NextResponse.json(
            { error: 'Failed to fetch milestones' },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
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
        const { id, projectId, ...updates } = body;

        // Map projectId to project_id if it exists in updates
        if (updates.projectId) {
            updates.project_id = updates.projectId;
            delete updates.projectId;
        }

        if (!id) {
            return NextResponse.json({ error: 'Milestone ID is required' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('project_milestones')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Milestone Update Error:', error);
            return NextResponse.json({ error: 'Failed to update milestone' }, { status: 500 });
        }

        await supabase.from('audit_events').insert({
            actor_id: user.id,
            action: 'UPDATE_MILESTONE',
            resource_type: 'MILESTONE',
            resource_id: String(id),
            details: JSON.stringify(updates)
        });

        return NextResponse.json({ success: true, milestone: data });
    } catch (error) {
        console.error('Milestones Update API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Milestone ID is required' }, { status: 400 });
        }

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

        const { error } = await supabase
            .from('project_milestones')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Milestone Delete Error:', error);
            return NextResponse.json({ error: 'Failed to delete milestone' }, { status: 500 });
        }

        await supabase.from('audit_events').insert({
            actor_id: user.id,
            action: 'DELETE_MILESTONE',
            resource_type: 'MILESTONE',
            resource_id: String(id),
            details: JSON.stringify({ milestoneId: id })
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Milestones Delete API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
