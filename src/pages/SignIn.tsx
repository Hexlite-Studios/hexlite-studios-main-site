import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { HexliteLogo } from '../assets/Assets';

type ViewType = 'signIn' | 'signUp' | 'forgotPassword';

function SignIn() {
    const [currentView, setCurrentView] = useState<ViewType>('signIn');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null);
    const navigate = useNavigate();
    const { user } = useAuth();
    const { t } = useTranslation();

    useEffect(() => {
        if (user) {
            navigate('/profile');
        }
    }, [user, navigate]);

    const resetForm = () => {
        setEmail('');
        setPassword('');
        setUsername('');
        setMessage(null);
    };

    const handleViewChange = (view: ViewType) => {
        setCurrentView(view);
        resetForm();
    };

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        const { error } = await supabase.auth.signInWithPassword({ 
            email, 
            password 
        });

        if (error) {
            setMessage({ type: 'error', text: error.message });
            setLoading(false);
        } else {
            setMessage({ type: 'success', text: 'Signed in successfully!' });
        }
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name: username,
                }
            }
        });

        if (error) {
            setMessage({ type: 'error', text: error.message });
            setLoading(false);
        } else {
            setMessage({
                type: 'success',
                text: 'Account created! Please check your email to confirm your account.'
            });
            setLoading(false);
        }
    };

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        });

        if (error) {
            setMessage({ type: 'error', text: error.message });
        } else {
            setMessage({
                type: 'success',
                text: 'Password reset email sent! Please check your inbox.'
            });
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-900 px-4 py-12">
            <div className="w-full max-w-md">
                {/* Logo and Title */}
                <div className="text-center mb-8">
                    <img 
                        src={HexliteLogo} 
                        alt="Hexlite Studios" 
                        className="h-20 w-20 mx-auto mb-4"
                    />
                    <h1 className="text-3xl font-bold text-white mb-2">
                        {currentView === 'signIn' && t('signIn.welcomeBackPrompt')}
                        {currentView === 'signUp' && t('signIn.createAccountPrompt')}
                        {currentView === 'forgotPassword' && t('signIn.resetPasswordPrompt')}
                    </h1>
                    <p className="text-gray-400">
                        {currentView === 'signIn' && t('signIn.welcomeBackPrompt')}
                        {currentView === 'signUp' && t('signIn.createAccountPrompt')}
                        {currentView === 'forgotPassword' && t('signIn.forgotPasswordInstructions')}
                    </p>
                </div>

                {/* Main Card */}
                <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-8 shadow-2xl">
                    {message && (
                        <div
                            className={`mb-6 p-4 rounded-lg ${
                                message.type === 'error'
                                    ? 'bg-red-500/10 border border-red-500/50 text-red-400'
                                    : 'bg-green-500/10 border border-green-500/50 text-green-400'
                            }`}
                        >
                            {message.text}
                        </div>
                    )}

                    {/* Sign In View */}
                    {currentView === 'signIn' && (
                        <form onSubmit={handleSignIn} className="space-y-5">
                            <div>
                                <label htmlFor="signin-email" className="block text-sm font-medium text-gray-300 mb-2">
                                    {t('signIn.emailLabel')}
                                </label>
                                <input
                                    id="signin-email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    placeholder="user@example.com"
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="signin-password" className="block text-sm font-medium text-gray-300 mb-2">
                                    {t('signIn.passwordLabel')}
                                </label>
                                <input
                                    id="signin-password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    placeholder="********"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {loading ? t('signIn.loading') : t('signIn.signInButton')}
                            </button>

                            {/* Switch to Sign Up */}
                            <div className="text-center pt-4 border-t border-zinc-700">
                                <p className="text-gray-400">
                                    {t('signIn.notAUser')}{' '}
                                    <button
                                        type="button"
                                        onClick={() => handleViewChange('signUp')}
                                        className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                                    >
                                        {t('signIn.signUpLink')}
                                    </button>
                                </p>
                            </div>

                            {/* Forgot Password Link */}
                            <div className="text-center">
                                <button
                                    type="button"
                                    onClick={() => handleViewChange('forgotPassword')}
                                    className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
                                >
                                    {t('signIn.forgotPasswordLink')}
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Sign Up View */}
                    {currentView === 'signUp' && (
                        <form onSubmit={handleSignUp} className="space-y-5">
                            <div>
                                <label htmlFor="signup-username" className="block text-sm font-medium text-gray-300 mb-2">
                                    {t('signIn.usernameLabel')}
                                </label>
                                <input
                                    id="signup-username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                                    placeholder="Your username"
                                />
                            </div>

                            <div>
                                <label htmlFor="signup-email" className="block text-sm font-medium text-gray-300 mb-2">
                                    {t('signIn.emailLabel')}
                                </label>
                                <input
                                    id="signup-email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                                    placeholder="user@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="signup-password" className="block text-sm font-medium text-gray-300 mb-2">
                                    {t('signIn.passwordLabel')}
                                </label>
                                <input
                                    id="signup-password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                    className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                                    placeholder="********"
                                />
                                <p className="text-xs text-gray-400 mt-2">{t('signIn.passwordRequirements')}</p>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {loading ? t('signIn.creatingAccount') : t('signIn.signUpButton')}
                            </button>

                            {/* Switch to Sign In */}
                            <div className="text-center pt-4 border-t border-zinc-700">
                                <p className="text-gray-400">
                                    {t('signIn.alreadyAUser')}{' '}
                                    <button
                                        type="button"
                                        onClick={() => handleViewChange('signIn')}
                                        className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                                    >
                                        {t('signIn.signInButton')}
                                    </button>
                                </p>
                            </div>
                        </form>
                    )}

                    {/* Forgot Password View */}
                    {currentView === 'forgotPassword' && (
                        <form onSubmit={handleForgotPassword} className="space-y-5">
                            <p className="text-gray-300 text-sm mb-4">
                                {t('signIn.forgotPasswordInstructions')}
                            </p>

                            <div>
                                <label htmlFor="forgot-email" className="block text-sm font-medium text-gray-300 mb-2">
                                    {t('signIn.emailLabel')}
                                </label>
                                <input
                                    id="forgot-email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition"
                                    placeholder="user@example.com"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {loading ? t('signIn.sendingEmail') : t('signIn.resetPasswordButton')}
                            </button>

                            {/* Back to Sign In */}
                            <div className="text-center pt-4 border-t border-zinc-700">
                                <button
                                    type="button"
                                    onClick={() => handleViewChange('signIn')}
                                    className="text-blue-400 hover:text-blue-300 font-semibold transition-colors flex items-center justify-center gap-2 mx-auto"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    {t('signIn.backToSignIn')}
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Future: Google Sign In */}
                    <div className="mt-6 pt-6 border-t border-zinc-700">
                        <button
                            type="button"
                            disabled
                            className="w-full py-3 bg-zinc-700 text-gray-400 font-semibold rounded-lg cursor-not-allowed opacity-50 flex items-center justify-center gap-3"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            {t('signIn.googleSignIn')}
                        </button>
                    </div>
                </div>

                {/* Footer Link */}
                <div className="text-center mt-6">
                    <button
                        onClick={() => navigate('/')}
                        className="text-gray-400 hover:text-gray-300 text-sm transition-colors"
                    >
                        ← {t('signIn.backToHome')}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
