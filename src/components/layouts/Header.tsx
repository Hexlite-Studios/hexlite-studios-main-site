import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from "react-router-dom";
import { HexliteLogo, DefaultConcept } from "../../assets/Assets";
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';

interface NavLink {
    label: string;
    path: string;
}

function Header() {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const location = useLocation();
    const { t } = useTranslation();
    const { user, signOut, loading } = useAuth();

    const navLinks: NavLink[] = [
        { label: t('nav.games'), path: '/' },
        { label: t('nav.about'), path: '/about' },
        { label: t('nav.resources'), path: '/resources' },
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowUserMenu(false);
            }
        };

        if (showUserMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showUserMenu]);

    const handleSignOut = async () => {
        await signOut();
        setShowUserMenu(false);
    };

    const getUserDisplayName = () => {
        if (!user) return '';
        return user.user_metadata?.name || user.email?.split('@')[0] || 'User';
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
                                                src={DefaultConcept}
                                                alt="User Avatar"
                                                className="h-10 w-10 rounded-full bg-gray-600 hover:ring-2 ring-gray-400 transition-all"
                                            />
                                        </button>
                                        {showUserMenu && (
                                            <div className="absolute right-0 mt-2 w-48 bg-zinc-800 rounded-lg shadow-lg py-2 z-50 border border-zinc-700">
                                                <Link
                                                    to="/profile"
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
                </div>
            </nav>
        </header>
    );
}

export default Header;