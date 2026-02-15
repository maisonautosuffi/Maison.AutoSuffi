'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import type { AuthChangeEvent, Session } from '@supabase/supabase-js';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (userData: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    login: () => { },
    logout: () => { },
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const buildUserFromSupabase = async (supaUser: { id: string; email?: string | null; user_metadata?: Record<string, unknown> }) => {
            const { data: profile } = await supabase
                .from('profiles')
                .select('role, full_name')
                .eq('user_id', supaUser.id)
                .maybeSingle();

            const nameFromProfile = profile?.full_name || null;
            const nameFromMetadata =
                (supaUser.user_metadata?.name as string | undefined) ||
                (supaUser.user_metadata?.full_name as string | undefined) ||
                undefined;

            const name = nameFromProfile || nameFromMetadata || supaUser.email || 'Utilisateur';
            const role = profile?.role || (supaUser.user_metadata?.role as string | undefined) || 'client';

            return {
                id: supaUser.id,
                email: supaUser.email || '',
                name,
                role,
            };
        };

        const syncSession = async () => {
            const { data } = await supabase.auth.getSession();
            const supaUser = data.session?.user;

            if (supaUser) {
                const built = await buildUserFromSupabase(supaUser);
                setUser(built);
            } else {
                setUser(null);
            }

            setLoading(false);
        };

        syncSession();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (_event: AuthChangeEvent, session: Session | null) => {
            const supaUser = session?.user;
            if (!supaUser) {
                setUser(null);
                setLoading(false);
                return;
            }

            const built = await buildUserFromSupabase(supaUser);
            setUser(built);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const login = (userData: User) => {
        setUser(userData);
    };

    const logout = async () => {
        try {
            await supabase.auth.signOut();
        } catch (e) {}
        setUser(null);
        router.push('/');
        router.refresh(); // Refresh to update server components/middleware
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
