import { Routes, Route } from 'react-router-dom';
import HexliteLayout from './components/layouts/HexliteLayout';
import GameLayout from './components/layouts/GameLayout';
import ProfileLayout from './components/layouts/ProfileLayout';
import Home from './pages/Home';
import About from './pages/About';
import Resources from './pages/Resources';
import NotFound from './pages/NotFound';
import LightofTheLost from './pages/LightofTheLost';
import ArcaneGuardians from './pages/ArcaneGuardians';
import Warfront from './pages/Warfront';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import ProtectedRoute from './components/layouts/ProtectedRoute';

function App() {

  return (
    <>
      <Routes>
        <Route element={<HexliteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/resources" element={<Resources />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route element={<GameLayout />}>
          <Route path="/light-of-the-lost" element={<LightofTheLost />} />
          <Route path="/arcane-guardians" element={<ArcaneGuardians />} />
          <Route path="/warfront" element={<Warfront />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Route>
        <Route element={<ProfileLayout />}>
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/u/:username" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App
