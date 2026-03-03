import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

        const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
            cookies: { getAll() { return cookieStore.getAll() } }
        });

        const { data: projects, error } = await supabase
            .from('projects')
            .select('*')
            .order('createdAt', { ascending: false });

        if (error) throw error;

        return NextResponse.json({ projects });
    } catch (error) {
        console.error('Error fetching projects:', error);
        return NextResponse.json(
            { error: 'Failed to fetch projects' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const cookieStore = await cookies();
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

        const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
            cookies: { getAll() { return cookieStore.getAll() } }
        });

        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        const generatedId = `PRJ-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

        const { data, error } = await supabase
            .from('projects')
            .insert({
                id: generatedId,
                name: body.name,
                client_name: body.clientName,
                location: body.location,
                status: body.status || 'PRE_STUDY',
                progress: body.progress || 0
            })
            .select()
            .single();

        if (error) {
            console.error('Project DB Error:', error);
            return NextResponse.json({ error: 'Failed to record project: ' + error.message, details: error }, { status: 500 });
        }

        await supabase.from('audit_events').insert({
            actor_id: user.id,
            action: 'CREATE_PROJECT',
            resource_type: 'PROJECT',
            resource_id: data.id,
            details: JSON.stringify({ name: data.name })
        });

        return NextResponse.json({ success: true, project: data });
    } catch (error) {
        console.error('Projects API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
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

        // Ideally, check if user is admin or project owner before deleting
        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Project Delete Error:', error);
            return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
        }

        await supabase.from('audit_events').insert({
            actor_id: user.id,
            action: 'DELETE_PROJECT',
            resource_type: 'PROJECT',
            resource_id: id,
            details: JSON.stringify({ projectId: id })
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Projects Delete API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
