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

        const formData = await request.formData();
        const file = formData.get('file') as File | null;
        const projectId = formData.get('projectId') as string | null;
        const category = formData.get('category') as string | null;

        if (!file || !projectId) {
            return NextResponse.json({ error: 'Missing file or projectId' }, { status: 400 });
        }

        // Upload to Supabase Storage
        const fileExt = file.name.split('.').pop();
        const fileName = `${projectId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('documents')
            .upload(fileName, file, {
                contentType: file.type,
                cacheControl: '3600',
                upsert: false
            });

        if (uploadError) {
            console.error('Upload Error:', uploadError);
            return NextResponse.json({ error: 'Failed to upload to storage' }, { status: 500 });
        }

        const { data: publicUrlData } = supabase.storage
            .from('documents')
            .getPublicUrl(fileName);

        // Insert into Document table
        const { data: documentRecord, error: dbError } = await supabase
            .from('document')
            .insert({
                projectId,
                uploadedById: user.id,
                name: file.name,
                url: publicUrlData.publicUrl,
                category: category || 'GENERAL',
                sizeBytes: file.size
            })
            .select()
            .single();

        if (dbError) {
            console.error('DB Insert Error:', dbError);
            return NextResponse.json({ error: 'Failed to save document record' }, { status: 500 });
        }

        return NextResponse.json({ success: true, document: documentRecord });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
