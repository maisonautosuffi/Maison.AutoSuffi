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

        // The DB has no "title" column, only "description". We concatenate title and description.
        const combinedDescription = body.title ? `${body.title}\n\n${body.description || ''}` : body.description;

        const { data, error } = await supabase
            .from('issues')
            .insert({
                project_id: body.projectId,
                milestone_id: body.milestoneId || null,
                category: body.category || 'AUTRE', // DB requires category
                description: combinedDescription || 'Nouvelle réserve',
                priority: body.severity || 'MEDIUM', // Map severity to priority
                status: 'OPEN'
            })
            .select()
            .single();

        if (error) {
            console.error('Issue DB Error:', error);
            return NextResponse.json({ error: 'Failed to record issue: ' + error.message, details: error }, { status: 500 });
        }

        // Optional: Log audit trail
        await supabase.from('audit_events').insert({
            actor_id: user.id,
            action: 'CREATE_ISSUE',
            resource_type: 'ISSUE',
            resource_id: data.id,
            details: JSON.stringify({ description: data.description })
        });

        return NextResponse.json({ success: true, issue: data });
    } catch (error) {
        console.error('Issues API Error:', error);
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

        let query = supabase.from('issues').select('*').order('created_at', { ascending: false });

        if (projectId) {
            query = query.eq('project_id', projectId);
        }

        const { data: issues, error } = await query;

        if (error) throw error;

        return NextResponse.json({ issues });
    } catch (error) {
        console.error('Error fetching issues:', error);
        return NextResponse.json(
            { error: 'Failed to fetch issues' },
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
        const { id, projectId, milestoneId, ...updates } = body;

        // Map keys to match DB schema
        if (projectId) updates.project_id = projectId;
        if (milestoneId) updates.milestone_id = milestoneId;

        if (!id) {
            return NextResponse.json({ error: 'Issue ID is required' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('issues')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Issue Update Error:', error);
            return NextResponse.json({ error: 'Failed to update issue' }, { status: 500 });
        }

        await supabase.from('audit_events').insert({
            actor_id: user.id,
            action: 'UPDATE_ISSUE',
            resource_type: 'ISSUE',
            resource_id: id,
            details: JSON.stringify(updates)
        });

        return NextResponse.json({ success: true, issue: data });
    } catch (error) {
        console.error('Issues Update API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Issue ID is required' }, { status: 400 });
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
            .from('issues')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Issue Delete Error:', error);
            return NextResponse.json({ error: 'Failed to delete issue' }, { status: 500 });
        }

        await supabase.from('audit_events').insert({
            actor_id: user.id,
            action: 'DELETE_ISSUE',
            resource_type: 'ISSUE',
            resource_id: id,
            details: JSON.stringify({ issueId: id })
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Issues Delete API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
