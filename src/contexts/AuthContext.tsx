import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

// 1. Define the shape of your Database Profile
export interface UserProfile {
    id: string;
    username: string | null;
    display_name: string | null;
    bio: string | null;
    theme_color: string | null;
    avatar_url: string | null;
    background_url: string | null;
    role: string;
}

interface AuthContextType {
    user: User | null;
    session: Session | null;
    userProfile: UserProfile | null;
    loading: boolean;
    signOut: () => Promise<void>;
    updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async (userId: string) => {
            try {
                const { data, error } = await supabase
                    .from('users')
                    .select('*')
                    .eq('id', userId)
                    .single();
                
                if (error) console.error('Error fetching profile:', error);
                if (data) setUserProfile(data);
            } catch (err) {
                console.error('Unexpected error fetching profile:', err);
            }
        };

        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchProfile(session.user.id);
            } else {
                setLoading(false);
            }
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            
            if (session?.user) {
                fetchProfile(session.user.id);
            } else {
                setUserProfile(null);
            }
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signOut = async () => {
        await supabase.auth.signOut();
        setUserProfile(null);
    };
    const updateProfile = async (updates: Partial<UserProfile>) => {
        if (!user) return;

        try {
            const { error } = await supabase
                .from('users')
                .update(updates)
                .eq('id', user.id);

            if (error) throw error;

            setUserProfile(prev => prev ? { ...prev, ...updates } : null);
            
        } catch (error) {
            console.error('Error updating profile:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            session, 
            userProfile,
            loading, 
            signOut,
            updateProfile
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}