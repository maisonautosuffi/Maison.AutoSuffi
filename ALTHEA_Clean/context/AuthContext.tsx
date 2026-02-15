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
        const syncSession = async () => {
            const { data } = await supabase.auth.getSession();
            const supaUser = data.session?.user;

            if (supaUser) {
                const name =
                    (supaUser.user_metadata?.name as string | undefined) ||
                    (supaUser.user_metadata?.full_name as string | undefined) ||
                    supaUser.email ||
                    'Utilisateur';
                const role = (supaUser.user_metadata?.role as string | undefined) || 'client';

                setUser({
                    id: supaUser.id,
                    email: supaUser.email || '',
                    name,
                    role,
                });
            } else {
                setUser(null);
            }

            setLoading(false);
        };

        syncSession();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
            const supaUser = session?.user;
            if (!supaUser) {
                setUser(null);
                setLoading(false);
                return;
            }

            const name =
                (supaUser.user_metadata?.name as string | undefined) ||
                (supaUser.user_metadata?.full_name as string | undefined) ||
                supaUser.email ||
                'Utilisateur';
            const role = (supaUser.user_metadata?.role as string | undefined) || 'client';

            setUser({
                id: supaUser.id,
                email: supaUser.email || '',
                name,
                role,
            });
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
