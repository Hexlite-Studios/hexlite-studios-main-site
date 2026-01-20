import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { supabase } from "../../lib/supabase";

interface UserProfile {
    avatar_url: string | null;
    username: string;
}

function ProfileHeader() {
//    const [showUserMenu, setShowUserMenu] = useState(false);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user: authUser } } = await supabase.auth.getUser();
            
            if (authUser) {
                const { data: profile } = await supabase
                    .from('users')
                    .select('avatar_url, username')
                    .eq('id', authUser.id)
                    .single();
                
                if (profile) {
                    setUser(profile);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        };

        checkUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
            checkUser();
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                // setShowUserMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getUserDisplayName = () => {
        return user?.username || 'User';
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
    };    

    return (
        <header className="bg-zinc-900/50 h-10 text-gray-200">
            <div className="flex justify-between items-center px-3">
                <div className="mt-1">
                    <Link
                        to="/"
                        className="text-gray-200 hover:text-white hover:bg-zinc-800 transition-all duration-200 font-medium px-4 py-1 rounded-lg"
                    >
                        {t('nav.return')}
                    </Link>
                </div>
                <div className="mt-1">
                    {!loading && (
                        <>
                            {user ? (
                                <div>
                                    <Link
                                        to={`/u/${getUserDisplayName()}`}
                                        className="hover:text-white hover:bg-zinc-800 transition-all duration-200 font-medium px-4 py-1 rounded-lg"
                                    >
                                        {t('nav.profile')}
                                    </Link>
                                    <button
                                        onClick={handleSignOut}
                                        className="text-red-400 hover:text-white hover:bg-zinc-800 transition-all duration-200 font-medium px-4 py-1 rounded-lg"
                                    >
                                        {t('nav.signOut')}
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    to="/sign-in"
                                    className="hover:text-white hover:bg-zinc-800 transition-all duration-200 font-medium px-4 py-1 rounded-lg"
                                >
                                    {t('nav.signIn')}
                                </Link>
                            )}
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default ProfileHeader;