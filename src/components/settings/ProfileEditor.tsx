import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import ImageUploader from './ImageUploader';
import { Camera } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ProfileEditor() {
    const { t } = useTranslation();
    const { userProfile, updateProfile } = useAuth();
    const [displayName, setDisplayName] = useState('');
    const [bio, setBio] = useState('');
    const [themeColor, setThemeColor] = useState('zinc');
    const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
    const [previewBg, setPreviewBg] = useState<string | null>(null);
    const [isDirty, setIsDirty] = useState(false);
    const isSupporter = userProfile?.role === 'supporter' || userProfile?.role === 'admin';

    useEffect(() => {
        if (userProfile) {
            setDisplayName(userProfile.display_name || userProfile.username || '');
            setBio(userProfile.bio || '');
            setThemeColor(userProfile.theme_color || 'zinc');
        }
    }, [userProfile]);

    useEffect(() => {
        if (!userProfile) return;
        const hasChanges = 
            displayName !== (userProfile.display_name || userProfile.username) ||
            bio !== (userProfile.bio || '') ||
            themeColor !== (userProfile.theme_color || 'zinc') ||
            previewAvatar !== null ||
            previewBg !== null;
        setIsDirty(hasChanges);
    }, [displayName, bio, themeColor, previewAvatar, previewBg, userProfile]);

    const activeAvatar = previewAvatar || userProfile?.avatar_url || null;
    const activeBg = previewBg || userProfile?.background_url || null;

    const handleSave = async () => {
        try {
            await updateProfile({ 
                display_name: displayName, 
                bio, 
                theme_color: themeColor,
                avatar_url: activeAvatar,
                background_url: activeBg
            });
            setPreviewAvatar(null);
            setPreviewBg(null);
            alert("Profile updated!");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="space-y-10">
            <section className="relative group rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl">
                <div className="h-32 md:h-48 w-full bg-zinc-800 relative">
                    {activeBg ? (
                        <img src={activeBg} alt="Cover" className="w-full h-full object-cover opacity-100" />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-90" />
                    <div className="absolute top-4 right-4 z-20">
                        {isSupporter ? (
                            <ImageUploader 
                                type="background" 
                                currentImage={activeBg} 
                                onUploadComplete={setPreviewBg}
                            >
                                <button className="flex items-center gap-2 bg-black/50 hover:bg-black/70 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-bold transition-all border border-white/10 hover:border-emerald-500/50">
                                    <Camera className="w-3 h-3" />
                                    {t('settings.profile.changebackground')}
                                </button>
                            </ImageUploader>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                <div className="px-6 md:px-8 pb-6 md:pb-8 -mt-12 md:-mt-16 flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-6 relative z-10 text-center md:text-left">
                    <div className="relative group/avatar">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-zinc-950 bg-zinc-800 overflow-hidden shadow-xl relative">
                            <img 
                                src={activeAvatar || '/default-avatar.png'} 
                                alt="Avatar" 
                                className="w-full h-full object-cover" 
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                <Camera className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <div className="absolute inset-0 rounded-full cursor-pointer z-50">
                            <ImageUploader 
                                type="avatar" 
                                currentImage={activeAvatar} 
                                onUploadComplete={setPreviewAvatar}
                                isSupporter={isSupporter}
                            >
                                <div className="w-full h-full rounded-full" /> 
                            </ImageUploader>
                        </div>
                    </div>
                    <div className="flex-1 mb-1">
                        <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight drop-shadow-lg">
                            {displayName || 'Display Name'}
                        </h2>
                        <div className="flex items-center justify-center md:justify-start gap-2">
                            <p className={`font-mono text-sm drop-shadow-md text-${themeColor}-400`}>
                                {userProfile?.username || 'username'}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold mb-2">
                            {t('settings.profile.displayname')}
                        </label>
                        <input
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="w-full px-4 py-2 border border-zinc-700 rounded-lg bg-zinc-900 text-white focus:outline-none focus:ring-2 focus:ring-zinc-500"
                            placeholder="John Doe"
                            maxLength={20}
                        />
                    </div>
                </div>
            </div>
            <div className="pt-6 border-t border-zinc-800 flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={!isDirty}
                    className={`
                        px-8 py-3 font-bold rounded-lg transition-all shadow-lg
                        ${isDirty 
                            ? 'bg-white text-zinc-950 hover:bg-gray-200 hover:scale-105' 
                            : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                        }
                    `}
                >
                    {t('settings.profile.savechanges')}
                </button>
            </div>
        </div>
    );
}