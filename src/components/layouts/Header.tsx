import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from "react-router-dom";
import { HexliteLogo, DefaultConcept } from "../../assets/Assets";
import { useTranslation } from 'react-i18next';
import { supabase } from '../../lib/supabase';

interface NavLink {
    label: string;
    path: string;
}

interface UserProfile {
    avatar_url: string | null;
    username: string;
}

function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const { t } = useTranslation();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const navLinks: NavLink[] = [
        { label: t('nav.games'), path: '/' },
        { label: t('nav.about'), path: '/about' },
        { label: t('nav.resources'), path: '/resources' },
    ];

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user: authUser } } = await supabase.auth.getUser();
            
            if (authUser) {
                // Fetch user profile data from users table
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
                setShowUserMenu(false);
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
        setShowUserMenu(false);
        setMobileMenuOpen(false);
    };

    return (
        <header className="bg-zinc-950 text-gray-200 p-2 shadow-lg border-b border-zinc-800 md:h-20">
            <nav className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div>
                        <Link 
                            to="/" 
                            className="flex items-center gap-3"
                        >
                            <img src={HexliteLogo} alt="Hexlite Studios Logo" className="h-16 w-16"/>
                            <span className="font-bold text-2xl">{t('nav.branding')}</span>
                        </Link>
                    </div>

                    {/* Desktop Edition */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.path;
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className="relative group text-lg hover:text-white transition-colors duration-300"
                                >
                                    {link.label}
                                    <span className={`
                                        absolute left-0 -bottom-1 w-full h-0.5 bg-white transition-all duration-300 
                                        ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                                    `}></span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* User Section */}
                    <div className="hidden md:flex items-center gap-4">
                        {!loading && (
                            <>
                                {user ? (
                                    <div className="relative" ref={dropdownRef}>
                                        <button
                                            onClick={() => setShowUserMenu(!showUserMenu)}
                                            className="flex items-center gap-2 hover:text-white transition-colors duration-150"
                                        >
                                            <span className="text-lg">
                                                {t('nav.greeting')}, {getUserDisplayName()}
                                            </span>
                                            <img
                                                src={user.avatar_url || DefaultConcept}
                                                alt="User Avatar"
                                                className="h-10 w-10 rounded-full bg-gray-600 hover:ring-2 ring-gray-400 transition-all object-cover"
                                            />
                                        </button>
                                        {showUserMenu && (
                                            <div className="absolute right-0 mt-2 w-48 bg-zinc-800 rounded-lg shadow-lg py-2 z-50 border border-zinc-700">
                                                <Link
                                                    to={`/u/${getUserDisplayName()}`}
                                                    onClick={() => setShowUserMenu(false)}
                                                    className="block px-4 py-2 hover:bg-zinc-700 transition-colors"
                                                >
                                                    {t('nav.profile')}
                                                </Link>
                                                <button
                                                    onClick={handleSignOut}
                                                    className="w-full text-left px-4 py-2 hover:bg-zinc-700 transition-colors text-red-400"
                                                >
                                                    {t('nav.signOut')}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <>
                                        <Link
                                            to="/sign-in"
                                            className="text-lg hover:text-white transition-colors duration-150 hover:drop-shadow-xl/25"
                                        >
                                            {t('nav.signIn')}    
                                        </Link>
                                        <img 
                                            src={DefaultConcept}
                                            alt="Default Avatar"
                                            className="h-10 w-10 rounded-full bg-gray-600"
                                        />
                                    </>
                                )}
                            </>
                        )}
                    </div>
                    {/* Mobile Edition */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="hover:text-white transition-colors"
                            aria-label="Toggle mobile menu"
                        >   
                            <svg 
                                className="h-6 w-6"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {mobileMenuOpen ? (
                                    <path d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden">
                    {mobileMenuOpen && (
                        <div className="py-4 mt-3">
                            <div className="flex flex-col gap-4">
                                {!loading && user && (
                                    <>
                                        <div className="flex items-center gap-3 px-4">
                                            <img
                                                src={user.avatar_url || DefaultConcept}
                                                alt="User Avatar"
                                                className="h-12 w-12 rounded-full bg-gray-600 mb-1 object-cover"
                                            />
                                            <div>
                                                <p className="font-semibold text-xl">{getUserDisplayName()}</p>
                                            </div>
                                        </div>
                                        <div className="border-t border-zinc-700" />
                                    </>
                                )}
                                {navLinks.map((link) => {
                                    const isActive = location.pathname === link.path;
                                    return (
                                        <Link
                                            key={link.path}
                                            to={link.path}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={`
                                                text-gray-300 hover:text-white hover:bg-zinc-800 transition-all duration-200
                                                font-medium px-4 py-2 rounded-lg
                                                ${isActive ? 'text-white bg-zinc-800' : ''}
                                            `}
                                        >
                                            {link.label}
                                        </Link>
                                    );
                                })}
                                {!loading && (
                                    <>
                                        <div className="border-t border-zinc-700 my-2" />
                                        {user ? (
                                            <button
                                                onClick={handleSignOut}
                                                className="text-left text-red-400 hover:text-white hover:bg-zinc-800 transition-all duration-200 font-medium px-4 py-2 rounded-lg"
                                            >
                                                {t('nav.signOut')}
                                            </button>
                                        ) : (
                                            <Link
                                                to="/sign-in"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="text-left text-gray-300 hover:text-white hover:bg-zinc-800 transition-all duration-200 font-medium px-4 py-2 rounded-lg"
                                            >
                                                {t('nav.signIn')}
                                            </Link>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Header;