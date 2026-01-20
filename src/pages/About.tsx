import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import type { teamMember } from '../data/theteam';
import { teamService } from '../services/teamService.ts';
import LoadingSpinner from '../components/LoadingSpinner.tsx';

export default function About() {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    
    const [teamMembers, setTeamMembers] = useState<teamMember[]>([]);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const data = await teamService.getAll();
                setTeamMembers(data);
            } catch (error) {
                console.error('Error fetching team members:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTeam();
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="min-h-screen">
            <div className="px-4 py-16 max-w-3xl mx-auto text-center">
                <h1 className="text-4xl font-bold mb-10">
                    {t('about.title')}
                </h1>

                <section className="mb-8 p-8">
                    <h2 className="text-2xl font-bold mb-4">
                        {t('about.mission.title')}
                    </h2>
                    <p className="text-white">
                        {t('about.mission.missionStatement')}
                    </p>
                </section>

                <section className="mb-8 p-8">
                    <h2 className="text-2xl font-bold mb-4">
                        {t('about.team.title')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {teamMembers.map((member) => (
                            <div 
                                key={member.id} 
                                className="mb-4 bg-zinc-800 rounded-xl hover:scale-105 transition-all duration-300 p-5 ring-1 ring-yellow-500/20 hover:ring-yellow-500/50 hover:text-white"
                            >
                                <img className="w-24 h-24 rounded-full mx-auto mb-2 object-cover" 
                                    src={member.icon}
                                    alt={t(member.name)}
                                />
                                <h3 className="text-xl font-bold">{t(member.name)}</h3>
                                <p className="mt-2 font-semibold">{t(member.role)}</p>
                                <p className="mt-3 border-t border-yellow-600/30 pt-2">{t(member.bio)}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>  
        </div>
    );
}