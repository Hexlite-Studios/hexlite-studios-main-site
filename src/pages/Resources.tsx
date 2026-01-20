import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Resources() {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    })

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="min-h-screen p-6 items-center text-center">
            <h1 className="text-4xl font-bold pt-10">{t('resources.title')}</h1>
            <div className="flex flex-col items-center pt-40">
                <p className="text-lg max-w-3xl mx-auto mb-6">
                    {t('resources.description')}
                </p>
                <a 
                    href="https://www.linkedin.com/company/hexlite-studios/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-56 mt-4 p-3 bg-gray-600 text-center rounded hover:bg-gray-700 text-white hover:ring-1 ring-white/75 transition duration-300"
                >
                    {t('resources.visitLinkedIn')}
                </a>
                <a 
                    href="https://chrisproductions-production.up.railway.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-56 mt-4 p-3 bg-gray-600 text-center rounded hover:bg-gray-700 text-white hover:ring-1 ring-white/75 transition duration-300"
                >
                    {t('resources.visitMusician')}
                </a>
            </div>
        </div>
    );
}