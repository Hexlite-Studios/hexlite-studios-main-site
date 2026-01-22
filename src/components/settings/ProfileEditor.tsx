import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/cn';
import { useAuth } from '../../contexts/AuthContext';
import ImageUploader from './ImageUploader';
import { Camera, RefreshCw, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getTheme } from '../../lib/colors';

export default function ProfileEditor() {
    const { t } = useTranslation();
    
    const { userProfile, updateProfile } = useAuth();
    const [displayName, setDisplayName] = useState('');
    const [bio, setBio] = useState('');
    const [themeColor, setThemeColor] = useState('white');
    const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
    const [previewBg, setPreviewBg] = useState<string | null>(null);
    const [isDirty, setIsDirty] = useState(false);
    const isSupporter = userProfile?.subscription_tier === 'supporter' || userProfile?.role === 'admin';
    const activeTheme = getTheme(themeColor);

    useEffect(() => {
        if (userProfile) {
            setDisplayName(userProfile.display_name || userProfile.username || '');
            setBio(userProfile.bio || '');
            setThemeColor(userProfile.theme_color || 'white');
        }
    }, [userProfile]);

    useEffect(() => {
        if (!userProfile) return;
        const hasChanges = 
            displayName !== (userProfile.display_name || userProfile.username) ||
            bio !== (userProfile.bio || '') ||
            themeColor !== (userProfile.theme_color || 'white') ||
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
        <div>
            <div className="space-y-10 rounded-t border-b-2 border-zinc-600" style={activeBg ? { backgroundImage: `url(${activeBg})`, backgroundSize: 'cover', backgroundPosition: 'center'} : { backgroundColor: '#242424' }}>
                <div className="w-full max-w-2xl mx-auto">
                    <div className={cn(
                        "bg-zinc-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/10",
                        isSupporter && activeTheme.border
                        )}
                    >
                        <div>
                            {isSupporter ? (
                                <ImageUploader
                                    type="background"
                                    currentImage={activeBg}
                                    onUploadComplete={setPreviewBg}
                                >
                                    <button className="absolute top-4 right-4 flex items-center gap-2 bg-black/50 hover:bg-black/70 text-white px-3 py-1.5 rounded-full text-xs backdrop-blur-md transition-all">
                                        <Camera className="size-4" />
                                        <span>{t('settings.profile.changebackground')}</span>
                                    </button>
                                </ImageUploader>
                            ) : (
                                <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1.5 rounded-full text-xs backdrop-blur-md">
                                    {t('settings.profile.supporterbackground')}
                                </div>
                            )}
                        </div>
                        <div className="p-8 pt-2 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 items-start mt-2">
                            <div className="flex flex-col items-center md:items-start gap-6">
                                <div className={cn(
                                    "relative", 
                                    "rounded-full size-32 md:size-40 overflow-hidden",
                                    "ring-2 ring-white/20",
                                    isSupporter && activeTheme.ring
                                    )}
                                >
                                    <div>
                                        <img
                                            src={activeAvatar || '/default-avatar.png'}
                                            alt="Avatar Preview"
                                            className="size-full object-cover"
                                        />
                                    </div>
                                    <ImageUploader
                                        type="avatar"
                                        currentImage={activeAvatar}
                                        onUploadComplete={setPreviewAvatar}
                                    >
                                        <button className="absolute flex gap-1 justify-center rounded-full size-full items-center bg-black/50 inset-0 hover:bg-black/70 hover:text-white md:opacity-0 md:hover:opacity-100 transition-opacity duration-300">
                                            <Camera className="size-4" />
                                            <span>{t('settings.profile.changeavatar')}</span>
                                        </button>
                                    </ImageUploader>
                                </div>
                            </div>
                            <div className="text-center md:text-left space-y-6">
                                <div>
                                    <label className="block text-sm font-medium mb-1">{t('settings.profile.displayname')}</label>
                                    <input
                                        type="text"
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        placeholder="ExtraordinaryUser"
                                        className={cn(
                                            "w-full px-4 py-2 rounded-lg bg-zinc-900 border border-white/20 outline-none",
                                            "text-white focus:border-white/70 focus:shadow-medium transition-all",
                                            
                                        )}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">{t('settings.profile.changebio')}</label>
                                    <textarea
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        rows={3}
                                        maxLength={160}
                                        placeholder="This is my bio..."
                                        className={cn(
                                            "w-full bg-zinc-900 border border-white/20 rounded-lg p-3 text-white resize-none outline-none",
                                            "text-white focus:border-white/70 focus:shadow-medium transition-all"
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <h3 className="text-lg font-semibold text-white text-center mt-5">{t('settings.profile.appearance')}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] m-4 mb-6">
                    <div className="flex flex-col justify-center items-center">
                        <label className="block font-bold mb-4">{t('settings.profile.bgcolor')}</label>
                        <div className="flex flex-wrap gap-3">
                            {['zinc', 'red', 'blue', 'emerald', 'violet', 'amber', 'rose'].map((color) => (
                                <button
                                    disabled
                                    key={color}
                                    onClick={() => setPreviewBg(color)}
                                    className={cn(
                                        "size-10 rounded-full border-2 transition-all hover:scale-110 shadow-lg cursor-not-allowed opacity-50",
                                        `bg-${color}-500`,
                                        previewBg === color ? 'border-white/80' : 'border-white/20'
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {isSupporter ? (
                    <div>
                        <div>
                            <h3 className="text-lg font-semibold text-white text-center mt-5">{t('settings.profile.supporter')}</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] m-4 mb-6">
                            <div className="flex flex-col justify-center items-center">
                                <label className="block font-bold mb-4">{t('settings.profile.themeaccent')}</label>
                                <div className="flex flex-wrap gap-3">
                                    {['zinc', 'red', 'blue', 'emerald', 'violet', 'amber', 'rose'].map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => setThemeColor(color)}
                                            className={cn(
                                                "size-10 rounded-full border-2 transition-all hover:scale-110 shadow-lg",
                                                `bg-${color}-500`,
                                                themeColor === color ? 'border-white/80' : 'border-white/20'
                                            )}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <label className="block font-bold mb-4">{t('settings.profile.glow')}</label>
                                <button className="bg-zinc-700 hover:bg-zinc-600 rounded-lg p-3 disabled cursor-not-allowed opacity-50">
                                    {t('settings.profile.glow')}
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="p-4 text-center text-sm text-gray-400 italic">
                        {t('settings.profile.supporter')}
                    </div>
                )}
            </div>
            <div className="flex justify-center p-4 border-t border-zinc-800">
                <button
                    onClick={handleSave}
                    disabled={!isDirty}
                    className={cn(
                        "flex items-center rounded-lg gap-2 px-8 py-3 font-bold transition-all shadow-lg",
                        isDirty ? "bg-zinc-600 hover:bg-zinc-500" : "bg-zinc-700 cursor-not-allowed opacity-50"
                    )}
                >
                    {isDirty ? <Save className="size-4" /> : <RefreshCw className="size-4" />}
                    {t('settings.profile.savechanges')}
                </button>
            </div>
        </div>
    );
}