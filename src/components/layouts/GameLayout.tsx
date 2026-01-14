import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Outlet } from "react-router-dom";
import Footer from './Footer';

function GameLayout() {
    const { t } = useTranslation();

    return (
        <div className="bg-zinc-950">
            <div className="bg-zinc-800/60">
                <Link
                    to="/"
                    className="text-gray-200 hover:text-white transition-colors duration-200 flex items-center gap-2 mx-auto"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    {t('nav.return')}
                </Link>
            </div>
            
            <main className="min-h-screen bg-zinc-900 text-gray-200">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}

export default GameLayout;