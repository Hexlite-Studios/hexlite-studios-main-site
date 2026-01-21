import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { User, Shield, PaintBucket, Ticket, Frown } from 'lucide-react';
import ProfileEditor from '../components/settings/ProfileEditor';

export default function Settings() {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('profile');

    const menuitems = [
        { id: 'profile', label: t('settings.menu.profile'), icon: PaintBucket, desc: t('settings.menu.profiledesc') },
        { id: 'account', label: t('settings.menu.account'), icon: User, desc: t('settings.menu.accountdesc') },
        { id: 'security', label: t('settings.menu.security'), icon: Shield, desc: t('settings.menu.securitydesc') },
        { id: 'subscription', label: t('settings.menu.subscription'), icon: Ticket, desc: t('settings.menu.subscriptiondesc') },
        { id: 'danger', label: t('settings.menu.danger'), icon: Frown, desc: t('settings.menu.dangerdesc') },
    ];

    return (
        <div className="min-h-screen bg-zinc-900 text-gray-200 pt-20 pb-12 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">{t('settings.title')}</h1>
                    <p className="text-gray-400">{t('settings.subtitle')}</p>
                </div>
                <div className="flex flex-col lg:flex-row gap-8">
                    <nav className="w-full lg:w-72 flex-shrink-0 space-y-2">
                        {menuitems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`
                                    w-full flex items-center gap-4 px-4 py-4 rounded-xl text-left transition-all duration-200 border
                                    ${activeTab === item.id 
                                        ? 'bg-zinc-900 border-yellow-500/50 shadow-lg shadow-yellow-900/10' 
                                        : 'bg-transparent border-transparent hover:bg-zinc-900 hover:border-zinc-800 text-gray-400 hover:text-white'
                                    }
                                `}
                            >
                                <div className={`p-2 rounded-lg ${activeTab === item.id ? 'bg-white/10' : 'bg-zinc-800'}`}>
                                    <item.icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="font-semibold">{item.label}</div>
                                    <div className="text-sm text-gray-400">{item.desc}</div>
                                </div>
                            </button>
                        ))}
                    </nav>
                    <main className="flex-1 min-w-0">
                        <div className="bg-black/20 border border-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                            {activeTab === 'profile' && <ProfileEditor />}
                            {activeTab === 'account' && <div>Account Settings Coming Soon...</div>}
                            {activeTab === 'security' && <div>Security Settings Coming Soon...</div>}
                            {activeTab === 'subscription' && <div>Subscription Settings Coming Soon...</div>}
                            {activeTab === 'danger' && <div>Danger Zone Coming Soon...</div>}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}
