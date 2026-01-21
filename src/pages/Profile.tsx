import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { userService } from '../services/userService';
import type { User, UserBadge } from '../data/user';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { UserRoundPlus, Ellipsis, Mail, Settings } from 'lucide-react';


function Profile() {
    const { t } = useTranslation();
    const { user: currentUser } = useAuth();
    const { username } = useParams<{ username: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [badges, setBadges] = useState<UserBadge[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [notFound, setNotFound] = useState<boolean>(false);
    const isOwnProfile = currentUser?.id === user?.id;
    const isLoggedIn = !!currentUser;
    const isSupporter = user?.subscription_tier === 'supporter'

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
        return <LoadingSpinner />;
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

    const avatarStyles: React.CSSProperties = {};
    if (isSupporter && user.avatar_ring_enabled && user.avatar_ring_color) {
        avatarStyles.boxShadow = `0 0 20px 5px ${user.avatar_ring_color}`;
        avatarStyles.border = `3px solid ${user.avatar_ring_color}`;
    }

    const profileBorderStyles: React.CSSProperties = {};
    if (isSupporter && user.profile_border_color) {
        profileBorderStyles.borderColor = user.profile_border_color;
        profileBorderStyles.borderWidth = '3px';
    } else {
        profileBorderStyles.borderColor = 'rgba(255, 255, 255, 0.1)';
        profileBorderStyles.borderWidth = '1px';
    }

    const backgroundStyles: React.CSSProperties = {};
    if (user.background_type === 'color' && user.background_url) {
        backgroundStyles.backgroundColor = user.background_url;
    } else if (user.background_type === 'image' && user.background_url) {
        backgroundStyles.backgroundImage = `url(${user.background_url})`;
        backgroundStyles.backgroundSize = 'cover';
        backgroundStyles.backgroundPosition = 'center';
    } else if (user.background_type === 'gradient' && user.background_url) {
        backgroundStyles.backgroundImage = user.background_url;
    }

    return (
        <div 
            className="min-h-screen p-4 md:p-6 flex items-center justify-center" 
            style={{ ...profileBorderStyles, ...backgroundStyles }}
            >
            <div className="w-full max-w-5xl">
                <div className="bg-zinc-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/10">
                    {/* Le buttons (I am learning to use comments)*/}
                    <div className="flex justify-end gap-3">
                        {isLoggedIn && !isOwnProfile && (
                            <>
                                <button
                                    disabled
                                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition cursor-pointer"
                                    title="Message"
                                >
                                    <Mail />
                                </button>
                                <button
                                    disabled
                                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition cursor-pointer"
                                    title="Friendo"
                                >
                                    <UserRoundPlus />
                                </button>
                                <button
                                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition cursor-pointer"
                                    title="Options"
                                >
                                    <Ellipsis />
                                </button>
                            </>
                        )}
                        {isOwnProfile && (
                            <>
                                <button
                                    disabled
                                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition cursor-pointer"
                                    title="Inbox"
                                >
                                    <Mail />
                                </button>
                                <Link
                                    to="/settings"
                                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition cursor-pointer"
                                    title="Settings"
                                >
                                    <Settings />
                                </Link>
                            </>
                        )}
                    </div>
                    {/* Profile Main things */}
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Desktop Edition */}
                        <div className="hidden md:flex flex-col items-center md:items-start">
                            <div className="relative mb-6">
                                <div
                                    className="w-40 h-40 rounded-full overflow-hidden ring-2 ring-white/20"
                                    style={avatarStyles}
                                >
                                    <img
                                        src={user.avatar_url || '/default-avatar.png'}
                                        alt={`${user.username}'s avatar`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
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
                                        <p>{t('profile.noBadges')}</p>
                                    )}
                                </div>
                            </div>
                            <div className="w-full mt-3">
                                <h3 className="text-xl font-semibold mb-3 border-b border-white/20 pb-2">
                                    {t('profile.about')}
                                </h3>
                                <p className="bg-zinc-800/20 rounded-xl p-1 inline-block border border-white/10">
                                    {t('profile.userSince')} {formatDate(user.created_at)}
                                </p>
                            </div>
                        </div>
                        <div className="flex-1">
                            {/* Mobile username/avatar */}
                            <div className="md:hidden flex flex-col items-center mb-6 mt-3">
                                <div className="relative mb-4">
                                    <div
                                        className="w-32 h-32 rounded-full overflow-hidden ring-2 ring-white/20"
                                        style={avatarStyles}
                                    >
                                        <img
                                            src={user.avatar_url || '/default-avatar.png'}
                                            alt={`${user.display_name}'s avatar`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h1 className="text-2xl font-bold">{user.display_name}</h1>
                                    <p className="text-lg capitalize">{user.title}</p>
                                </div>
                            </div>

                            {/* Desktop username */}
                            <div className="hidden md:block mb-6">
                                <h1 className="text-3xl font-bold">{user.display_name}</h1>
                                <p className="text-xl capitalize">{user.title}</p>
                            </div>
                            <div className="bg-zinc-700/60 rounded-xl p-6 border border-white/10 min-h-[200px]">
                                <p className="leading-relaxed">
                                    {user.bio || t('profile.noBio')}
                                </p>
                            </div>

                            {/* Back to Mobile */}
                            <div className="md:hidden space-y-6 mt-6 text-center">
                                <div>
                                    <h3 className="text-xl font-semibold mb-3 border-b border-white/20 pb-2">
                                        {t('profile.badges')}
                                    </h3>
                                    <div className="flex gap-3 flex-wrap justify-center">
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
                                            <p>{t('profile.noBadges')}</p>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-3 border-b border-white/20 pb-2">
                                        {t('profile.about')}
                                    </h3>
                                    <p className="bg-zinc-800/20 rounded-xl p-1 inline-block border border-white/10">
                                        {t('profile.userSince')} {formatDate(user.created_at)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;