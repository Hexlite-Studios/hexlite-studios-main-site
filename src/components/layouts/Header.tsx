import { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { HexliteLogo, DefaultConcept } from "../../assets/Assets";
import { useTranslation } from 'react-i18next';

interface NavLink {
        label: string;
        path: string;
}

function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const { t } = useTranslation();

    const navLinks: NavLink[] = [
        { label: t('nav.games'), path: '/' },
        { label: t('nav.about'), path: '/about' },
        { label: t('nav.resources'), path: '/resources' },
    ];

    return (
        <header className="bg-zinc-950 text-gray-200 p-2 shadow-lg border-b border-zinc-800 md:h-20">
            <nav className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div>
                        <Link to="/" className="flex items-center gap-3">
                            <img src={HexliteLogo} alt="Hexlite Studios Logo" className="h-16 w-16" />
                            <span className="font-bold text-2xl">{t('nav.branding')}</span>
                        </Link>
                    </div>

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
                                        `}>
                                        </span>
                                    </Link>
                            );
                        })}
                    </div>

                    <div>
                        <div className="hidden md:flex items-center gap-4">
                            <Link to="/login" className="text-lg hover:text-white transition-colors duration-150 hover:drop-shadow-xl/25">
                                {t('nav.signIn')}
                            </Link>
                            <img src={DefaultConcept} alt="User Avatar" className="h-10 w-10 rounded-full bg-gray-600 hover:ring-2 ring-gray-400" />
                        </div>

                        <button 
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden"
                            aria-label="Toggle Mobile Menu"
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
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-800 mt-5">
                        <div className="flex flex-col gap-4 text-center">           
                            <Link 
                                to="/"
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200 px-4 py-2 rounded-lg font-medium"
                            >
                                Home
                            </Link>

                            {navLinks.map((link) => {
                                const isActive = location.pathname === link.path;
                                return (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`
                                            text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200
                                            font-medium px-4 py-2 rounded-lg
                                            ${isActive ? 'text-white bg-gray-800' : ''}
                                        `}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}

                            <div className="border-t border-gray-700 my-2" />
                            
                            <Link 
                                to="/login"
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200 px-4 py-2 rounded-lg font-medium"
                            >
                                Sign in                                    
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}

export default Header;
