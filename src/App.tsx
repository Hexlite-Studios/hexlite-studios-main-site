import { Routes, Route } from 'react-router-dom';
import HexliteLayout from './components/layouts/HexliteLayout';
import Home from './pages/Home';
import About from './pages/About';
import Resources from './pages/Resources';
import NotFound from './pages/NotFound';

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
      </Routes>
    </>
  );
}

export default App
