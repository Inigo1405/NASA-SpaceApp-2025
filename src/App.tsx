// src/App.tsx
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useLayoutEffect, useEffect } from 'react';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import PlanetInformation from './pages/PlanetInformation';
import Team from './pages/Team';
import Methodology from './pages/Methodology';
import About from './pages/About';

// Componente para manejar el scroll restoration
const ScrollToTop = () => {
  const location = useLocation();
  
  // Configurar scroll restoration del navegador una sola vez
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);
  
  // useLayoutEffect se ejecuta ANTES del renderizado, evitando el flash
  useLayoutEffect(() => {
    // Restaurar posición de scroll al top inmediatamente
    window.scrollTo(0, 0);
  }, [location.pathname]); // Se ejecuta cuando cambia la ruta
  
  return null;
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/planet-information" element={<MainLayout><PlanetInformation /></MainLayout>} />
        <Route path="/planet-information/:id" element={<MainLayout><PlanetInformation /></MainLayout>} />
        <Route path="/team" element={<MainLayout><Team /></MainLayout>} />
        <Route path="/methodology" element={<MainLayout><Methodology /></MainLayout>} />
        <Route path="/about" element={<MainLayout><About /></MainLayout>} />
        <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;