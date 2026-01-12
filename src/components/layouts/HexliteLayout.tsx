import { Outlet } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";

function HexliteLayout() {
    return (
        <div>
            <Header />
            <main className="min-h-screen bg-zinc-800 text-white">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default HexliteLayout;