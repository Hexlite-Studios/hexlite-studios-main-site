import { Outlet } from "react-router-dom";
import Footer from './Footer';
import ProfileHeader from '../profile/ProfileHeader';

function ProfileLayout() {

    return (
        <div className="bg-zinc-950">
            <ProfileHeader />
            
            <main className="min-h-screen bg-zinc-900 text-gray-200">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}

export default ProfileLayout;