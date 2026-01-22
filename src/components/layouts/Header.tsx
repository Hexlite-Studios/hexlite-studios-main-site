import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { HexliteLogo, DefaultConcept } from '../../assets/Assets';
import { House, Info, Book, X, Menu, LogIn, LogOut } from 'lucide-react';

interface NavLink {
    label: string;
    path: string;
    icon: React.ElementType;
}

export default function Header() {
    const { t } = useTranslation();
    const { user, userProfile, signOut, loading } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const location = useLocation();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const navLinks: NavLink[] = [
        { label: t('nav.home'), path: '/', icon: House },
        { label: t('nav.about'), path: '/about', icon: Info },
        { label: t('nav.resources'), path: '/resources', icon: Book },
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowUserMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSignOut = async () => {
        await signOut();
        setShowUserMenu(false);
        setMobileMenuOpen(false);
    }

    const avatarSrc = userProfile?.avatar_url || DefaultConcept;
    const username = userProfile?.username || user?.email?.split('@')[0] || 'User';

  return (
    <header className="bg-zinc-950 text-gray-300 p-2 shadow-lg border-b border-zinc-800 h-20 sticky top-0 z-50">
        <nav className="mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
            <div className="flex items-center justify-between">
                {/* Left Side */}
                <Link to="/" className="flex items-center gap-3">
                    <img
                        src={HexliteLogo}
                        alt="Hexlite Logo"
                        className="h-12 w-12 md:h-16 md:w-16"
                    />
                    <span className="font-bold text-xl md:text-2xl hover:text-white transition-colors">
                        {t('nav.branding')}
                    </span>
                </Link>
                {/* Centeral zone - desktop exclusive*/}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.path;
                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`relative group flex items-center gap-2 text-lg transition-colors duration-300 ${isActive ? 'text-white font-medium' : 'hover:text-white'}`}
                            >
                                {link.label}
                                <span className={`
                                        absolute left-0 -bottom-1 w-full h-0.5 bg-white transition-all duration-300 
                                        ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                                `}>
                                </span>
                            </Link>
                        );
                    })}
                </div>
                {/* Right Side - Also desktop exclusive, 3rd go at this*/}
                <div className="hidden md:flex items-center gap-4">
                    {!loading && (
                        <>
                            {user ? (
                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        className="flex items-center gap-3 py-1 px-2 rounded-full transition-all border border-transparent hover:border-zinc-800 hover:text-white"
                                    >
                                        <span className="font-semibold text-medium text-right">
                                            {t('nav.greeting')}, {username}
                                        </span>
                                        <img
                                            src={avatarSrc}
                                            alt={`${username}'s avatar`}
                                            className="h-12 w-12 rounded-full object-cover border-2 border-zinc-800"
                                        />
                                    </button>
                                    {showUserMenu && (
                                        <div className="absolute right-0 mt-2 w-48 bg-zinc-800 rounded-lg shadow-lg py-2 z-50 border border-zinc-700">
                                            <Link
                                                to={`/u/${userProfile?.username || username}`}
                                                onClick={() => setShowUserMenu(false)}
                                                className="block px-4 py-2 hover:bg-zinc-700 transition-colors"
                                            >
                                                {t('nav.profile')}
                                            </Link>
                                            <Link
                                                to="/settings"
                                                onClick={() => setShowUserMenu(false)}
                                                className="block px-4 py-2 hover:bg-zinc-700 transition-colors"
                                            >
                                                {t('nav.settings')}
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
                                        className="flex items-center gap-3 py-1 px-2 rounded-full transition-all border border-transparent hover:border-zinc-800 hover:text-white"
                                    >
                                        <span className="font-semibold text-medium text-right">{t('nav.signIn')}</span> 
                                        <img src={DefaultConcept} alt="Default Avatar" className="h-12 w-12 rounded-full object-cover border-2 border-zinc-800" />
                                    </Link>
                                </>
                            )}
                        </>
                    )}
                </div>
                {/* Mobile Menu Buttons */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="hover:text-white p-2"
                    >
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
                {mobileMenuOpen && (
                    <div className="md:hidden absolute top-20 left-0 w-full bg-zinc-950 border-b-2 border-zinc-600 pb-2 px-4">
                        <div className="flex flex-col space-y-4 pt-4">
                            {user && (
                                <>
                                    <Link
                                        to={`/u/${userProfile?.username || username}`}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center border-b border-zinc-800 pb-4 mb-4"
                                    >
                                        <img src={avatarSrc} className="h-10 w-10 rounded-full object-cover" alt="Avatar" />
                                        <span className="ml-3 text-lg font-semibold">{username}</span>
                                    </Link>
                                </>
                            )}
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 p-3 rounded-lg text-lg ${location.pathname === link.path ? 'bg-zinc-900 text-white' : ''}`}
                                >
                                    <link.icon className="w-5 h-5" />
                                    {link.label}
                                </Link>
                            ))}
                            { user ? (
                                <> 
                                    <Link
                                        to="/settings"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center text-lg gap-3 pt-4 pl-3 border-t border-zinc-800 mt-4"
                                    >
                                        <Info className="w-5 h-5" />
                                        {t('nav.settings')}
                                    </Link>
                                    <button
                                        onClick={handleSignOut}
                                        className="flex items-center font-bold text-lg gap-3 p-3 mt-4 text-red-500"
                                    >
                                        <LogOut className="w-5 h-5" />
                                        {t('nav.signOut')}
                                    </button>
                                </>
                            ) : (   
                                <Link
                                    to="/sign-in"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center font-bold text-lg gap-3 p-3 pt-4 border-t border-zinc-800 mt-4 text-green-500"
                                >
                                    <LogIn className="w-5 h-5" />
                                    {t('nav.signIn')}
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    </header>
  );
}