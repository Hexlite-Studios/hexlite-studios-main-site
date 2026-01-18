import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { userService } from '../services/userService';
import type { User, UserBadge } from '../data/user';


function Profile() {
    const { t } = useTranslation();
    const { username } = useParams<{ username: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [badges, setBadges] = useState<UserBadge[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [notFound, setNotFound] = useState<boolean>(false);

    useEffect(() => {
        const fetchUser = async () => {
            if (!username) {
                setNotFound(true);
                setLoading(false);
                return;
            }

            const userData = await userService.getByUsername(username);
            
            if (userData) {
                setUser(userData);
                
                const userBadges = await userService.getUserBadges(userData.id);
                setBadges(userBadges);

            } else {
                setNotFound(true);
            }
            
            setLoading(false);
        };

        fetchUser();
    }, [username]);

    if (loading) {
        return (
            <div className="min-h-screen p-6 flex items-center justify-center">
                <p className="text-xl">{t('loading')}</p>
            </div>
        );
    }

    if (notFound || !user) {
        return (
            <div className="min-h-screen p-6 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">{t('profile.notFoundTitle')}</h1>
                    <p className="text-lg">{t('profile.notFoundMessage')}</p>
                </div>
            </div>
        );
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div
            className="min-h-screen p-6 flex items-center justify-center"
        >
            <div className="w-full max-w-5xl">
                <div className="bg-zinc-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/10">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex flex-col items-center md:items-start">
                            <div className="w-40 h-40 rounded-full overflow-hidden mb-6 ring-4 ring-white/20">
                                <img
                                    src={user.avatar_url || '/default-avatar.png'}
                                    alt={user.username}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="w-full">
                                <h3 className="text-xl font-semibold mb-3 border-b border-white/20 pb-2">
                                    {t('profile.badges')}
                                </h3>
                                <div className="flex gap-3 flex-wrap justify-center md:justify-start">
                                    {badges && badges.length > 0 ? (
                                        badges.map((badge) => (
                                            <div
                                                key={badge.badge_id}
                                                className="w-12 h-12 bg-white/10 rounded-lg flex items-center cursor-pointer justify-center hover:bg-white/20 transition-all"
                                                title={badge.badge_description}
                                            >
                                                <span className="text-2xl">{badge.badge_icon_url}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-400 text-sm">{t('profile.noBadges')}</p>
                                    )}
                                </div>
                            </div>

                            <div className="w-full mt-6">
                                <h3 className="text-xl font-semibold mb-3 border-b border-white/20 pb-2">
                                    {t('profile.about')}
                                </h3>
                                <p className="text-sm text-gray-300">
                                    {t('profile.userSince')} {formatDate(user.created_at)}
                                </p>
                                
                                {(user.discord_username || user.youtube_username || user.twitch_username) && (
                                    <div className="mt-3 space-y-1 text-sm">
                                        {user.discord_username && (
                                            <p className="text-gray-300">(Discord) {user.discord_username}</p>
                                        )}
                                        {user.youtube_username && (
                                            <p className="text-gray-300">(YT) {user.youtube_username}</p>
                                        )}
                                        {user.twitch_username && (
                                            <p className="text-gray-300">(Twitch) {user.twitch_username}</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-end gap-3 mb-4">
                                <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </button>
                                <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </button>
                            </div>
                            <div className="mb-6">
                                <h1 className="text-3xl font-bold">{user.username}</h1>
                                <p className="text-xl capitalize">{user.title}</p>
                            </div>
                            <div className="bg-white/5 rounded-xl p-6 border border-white/10 min-h-[250px]">
                                <p className="leading-relaxed">
                                    {user.bio || t('profile.noBio')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;