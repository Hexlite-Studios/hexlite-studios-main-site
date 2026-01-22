import { useTranslation } from 'react-i18next';
import { cn } from '../lib/cn';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { userService } from '../services/userService';
import { useAuth } from '../contexts/AuthContext';
import { UserRoundPlus, Ellipsis, Mail, Settings, Crown } from 'lucide-react';
import type { User, UserBadge } from '../data/user';
import { backgroundThemes, getTheme } from '../lib/colors';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Profile() {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);

    const { user: currentUser } = useAuth();
    const { username } = useParams<{ username: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [badges, setBadges] = useState<UserBadge[]>([]);
    const [notFound, setNotFound] = useState(false);
    const theme = getTheme(user?.theme_color);
    const isOwnProfile = currentUser?.id === user?.id;
    const isLoggedIn = !!currentUser;
    const isSupporter = user?.subscription_tier === 'supporter' || user?.role === 'admin';

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
            <div className={cn(
                    "min-h-screen",
                    "flex items-center justify-center",
                    "p-6 bg-zinc-950 text-white")}>
                <h1 className="text-4xl font-bold mb-4">{t('profile.notFoundTitle')}</h1>
                <p className="text-lg text-gray-300">{t('profile.notFoundMessage')}</p>  
            </div>
        );
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric',
        });
    };
    const bgStyle: React.CSSProperties = {};
    let bgClassName = "bg-zinc-950";

    if (user.background_url) {
        if (user.background_type === 'image') {
            bgStyle.backgroundImage = `url(${user.background_url})`;
            bgStyle.backgroundSize = 'cover';
            bgStyle.backgroundPosition = 'center';
        } 
        else if (user.background_type === 'color') {
            const bgTheme = backgroundThemes[user.background_url] || backgroundThemes['zinc'];
            bgClassName = bgTheme.bg; 
        }
    }

    const AboutDisplay = () => (
        <div className="flex flex-col items-center w-full">
            <div className="w-full">
                <h3 className={cn("text-xl font-semibold mb-3 border-b border-white/20 pb-2", isSupporter && theme.border)}>
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
                <h3 className={cn("text-xl font-semibold mb-3 border-b border-white/20 pb-2", isSupporter && theme.border)}>
                    {t('profile.about')}
                </h3>
                <p className={cn("bg-zinc-800/20 rounded-xl p-1 inline-block border border-white/10", isSupporter && theme.b_light)}>
                    {t('profile.userSince')} {formatDate(user.created_at)}
                </p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen relative flex items-center justify-center p-4 md:p-6 bg-zinc-900">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-zinc-950" />
                <div className={`absolute inset-0 transition-all duration-700 ${bgClassName}`} />
                <div className="absolute inset-0 transition-all duration-700" style={bgStyle} />
            </div>
            <div className="w-full max-w-5xl relative z-10">
                <div className={cn(
                    "overflow-hidden bg-zinc-900/80 backdrop-blur-xl rounded-2xl shadow-2xl ring-1 ring-white/10",
                    isSupporter && theme.ring
                )}>
                    {/* Buttons */}
                    <div className="flex justify-end gap-3 p-6 pb-0">
                        {isLoggedIn && !isOwnProfile && (
                            <>
                                <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition cursor-pointer" title="Message">
                                    <Mail />
                                </button>
                                <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition cursor-pointer" title="Message">
                                    <UserRoundPlus />
                                </button>
                                <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition cursor-pointer" title="Message">
                                    <Ellipsis />
                                </button>
                            </>
                        )}
                        {isOwnProfile && (
                            <>
                                <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition cursor-pointer" title="Message">
                                    <Mail />
                                </button>
                                <Link
                                    to="/settings"
                                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition cursor-pointer"
                                    title={t('profile.settingsButton')}
                                >
                                    <Settings />
                                </Link>
                            </>
                        )}
                    </div>
                    <div className="p-8 pt-2 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 items-start">
                        {/* Avatar, Desktop- Badges and About */}
                        <div className="flex flex-col items-center md:items-start gap-6">
                            <div className={cn(
                                "size-32 md:size-40 rounded-full overflow-hidden ring-2 ring-white/20",
                                isSupporter && theme.ring
                            )}>
                                <img
                                    src={user.avatar_url || '/default-avatar.png'}
                                    alt={`${user.username}'s avatar`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="hidden md:block w-full">
                                <AboutDisplay />
                            </div>
                        </div>
                        {/* Username, Mobile- Badges and About */}
                        <div className="text-center md:text-left space-y-6">
                            <div>
                                <div className="flex flex-col md:flex-row items-center md:items-baseline gap-3 justify-center md:justify-start">
                                    <h1 className="text-3xl font-bold">
                                        {user.display_name || user.username}
                                    </h1>
                                    {isSupporter && (
                                        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                            <Crown className="w-4 h-4" /> {t('profile.supporterBadge')}
                                        </span>
                                    )}
                                </div>
                                <p className="italic mt-1">
                                    @{user.username}
                                </p>
                                <div className={cn("border-t border-white/10 block mt-2", isSupporter && theme.border)} />
                                <p className="text-xl font-semibold mt-2 capitalize">
                                    {user.title || 'User'}
                                </p>
                            </div>
                            <div className={cn("bg-zinc-700/60 rounded-xl p-6 border border-white/10 min-h-[200px]", isSupporter && theme.b_light)}>
                                <p className="leading-relaxed">
                                    {user.bio || t('profile.noBio')}
                                </p>
                            </div>
                            <div className="md:hidden w-full flex justify-center py-2 border-t border-white/5 border-b mb-4">
                                <AboutDisplay />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}