import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Adjust path to your context

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const location = useLocation();

    // 1. Wait for Supabase to check the session
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-950">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    // 2. If no user found, kick them out
    if (!user) {
        // 'state={{ from: location }}' lets you redirect them BACK 
        // to the settings page after they successfully login
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    // 3. If allowed, show the page
    return <>{children}</>;
}