import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Planet } from '../types';

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  // Datos de ejemplo de exoplanetas con coordenadas celestes más realistas
  const [exoplanets] = useState<Planet[]>([
    { id: 1, name: 'Kepler-452b', status: 'confirmed', distance: '1,400', type: 'Super-Tierra', x: 35, y: 42 },
    { id: 2, name: 'TRAPPIST-1e', status: 'confirmed', distance: '39', type: 'Terrestre', x: 55, y: 65 },
    { id: 3, name: 'Proxima Centauri b', status: 'confirmed', distance: '4.2', type: 'Terrestre', x: 12, y: 70 },
    { id: 4, name: 'TOI-700 d', status: 'confirmed', distance: '101', type: 'Terrestre', x: 88, y: 35 },
    { id: 5, name: 'K2-18b', status: 'confirmed', distance: '124', type: 'Mini-Neptuno', x: 42, y: 48 },
    { id: 6, name: 'LHS 1140 b', status: 'confirmed', distance: '40', type: 'Super-Tierra', x: 62, y: 58 },
    { id: 7, name: 'KOI-4878.01', status: 'candidate', distance: '1,075', type: 'Desconocido', x: 22, y: 82 },
    { id: 8, name: 'KOI-5715.01', status: 'candidate', distance: '2,300', type: 'Desconocido', x: 92, y: 28 },
    { id: 9, name: 'KOI-3284.01', status: 'candidate', distance: '1,650', type: 'Desconocido', x: 48, y: 18 },
    { id: 10, name: 'KOI-2124.01', status: 'candidate', distance: '890', type: 'Desconocido', x: 38, y: 88 },
    { id: 11, name: 'KOI-1843.03', status: 'false_positive', distance: '---', type: '---', x: 68, y: 52 },
    { id: 12, name: 'KOI-2700.02', status: 'false_positive', distance: '---', type: '---', x: 32, y: 38 },
    { id: 13, name: 'KOI-3678.01', status: 'false_positive', distance: '---', type: '---', x: 78, y: 72 },
  ]);

  // Generar estrellas de fondo del mapa estelar solo una vez
  const starMapBgStars = useMemo(() => {
    return Array.from({ length: 150 }, () => ({
      width: Math.random() > 0.9 ? '1.5px' : '1px',
      height: Math.random() > 0.9 ? '1.5px' : '1px',
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.4 + 0.1,
    }));
  }, []);

  // Generar estrellas del fondo general solo una vez
  const mainBgStars = useMemo(() => {
    return Array.from({ length: 80 }, () => ({
      width: Math.random() > 0.8 ? '2px' : '1px',
      height: Math.random() > 0.8 ? '2px' : '1px',
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.6 + 0.2,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${Math.random() * 2 + 2}s`,
    }));
  }, []);

  const [hoveredPlanet, setHoveredPlanet] = useState<Planet | null>(null);
  const [activeTab, setActiveTab] = useState<'kepler' | 'exodia' | 'k2' | 'tess'>('exodia');

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'confirmed': return { bg: 'bg-emerald-400', shadow: 'shadow-emerald-400/50', border: 'border-emerald-500' };
      case 'candidate': return { bg: 'bg-amber-400', shadow: 'shadow-amber-400/50', border: 'border-amber-500' };
      case 'false_positive': return { bg: 'bg-rose-400', shadow: 'shadow-rose-400/50', border: 'border-rose-500' };
      default: return { bg: 'bg-slate-400', shadow: 'shadow-slate-400/50', border: 'border-slate-500' };
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'confirmed': return t('home.status.confirmed');
      case 'candidate': return t('home.status.candidate');
      case 'false_positive': return t('home.status.falsePositive');
      default: return t('home.status.unknown');
    }
  };

  const getPlanetTypeLabel = (type: string) => {
    switch(type) {
      case 'Super-Tierra': return t('home.planetTypes.superEarth');
      case 'Terrestre': return t('home.planetTypes.terrestrial');
      case 'Mini-Neptuno': return t('home.planetTypes.miniNeptune');
      case 'Desconocido': return t('home.planetTypes.unknown');
      case '---': return '---';
      default: return type;
    }
  };

  const handlePlanetClick = (planet: Planet) => {
    navigate('/planet-information', { state: { planet } });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 overflow-hidden">
      {/* Enhanced Stars Background */}
      <div className="absolute inset-0">
        {mainBgStars.map((star, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={star}
          />
        ))}
      </div>

      {/* Elegant Gradient Orbs */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl animate-pulse" 
           style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse" 
           style={{ animationDuration: '6s', animationDelay: '1s' }} />

      {/* Hero Section */}
      <section className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-7xl mx-auto w-full">

          {/* Hero CTA - Predicción de Exoplanetas */}
          <div className="mb-12 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 via-indigo-600/30 to-blue-600/30 rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
            
            <div className="relative bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-slate-600/40 shadow-2xl overflow-hidden">
              {/* Animated stars in background */}
              <div className="absolute inset-0 overflow-hidden">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div
                    key={`hero-star-${i}`}
                    className="absolute bg-white rounded-full animate-pulse"
                    style={{
                      width: Math.random() > 0.8 ? '2px' : '1px',
                      height: Math.random() > 0.8 ? '2px' : '1px',
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      opacity: Math.random() * 0.5 + 0.1,
                      animationDelay: `${Math.random() * 3}s`,
                      animationDuration: `${Math.random() * 2 + 2}s`,
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                {/* Left side - Text content */}
                <div className="space-y-5">
                  
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                    {t('home.hero.title')}
                    <span className="block mt-2 bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
                      {t('home.hero.titleHighlight')}
                    </span>
                  </h1>
                  
                  <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
                    {t('home.hero.description')}
                  </p>

                  <div className="flex flex-wrap gap-4 pt-4">
                    <button
                      onClick={() => navigate('/predict')}
                      className="group/btn relative px-8 py-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        {t('home.hero.startPrediction')}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                    </button>
                    
                    <button
                      onClick={() => navigate('/methodology')}
                      className="px-8 py-4 bg-slate-800/50 backdrop-blur-sm text-slate-200 font-semibold rounded-xl border border-slate-600/50 hover:bg-slate-700/50 hover:border-slate-500 transition-all duration-300"
                    >
                      {t('home.hero.viewMethodology')}
                    </button>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 pt-6">
                    <div className="text-center">
                      <div className="text-2xl md:text-3xl font-bold text-purple-400">{t('home.stats.records')}</div>
                      <div className="text-xs md:text-sm text-slate-400 mt-1">{t('home.stats.recordsLabel')}</div>
                    </div>
                    <div className="text-center border-x border-slate-700">
                      <div className="text-2xl md:text-3xl font-bold text-indigo-400">{t('home.stats.accuracy')}</div>
                      <div className="text-xs md:text-sm text-slate-400 mt-1">{t('home.stats.accuracyLabel')}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl md:text-3xl font-bold text-blue-400">{t('home.stats.availability')}</div>
                      <div className="text-xs md:text-sm text-slate-400 mt-1">{t('home.stats.availabilityLabel')}</div>
                    </div>
                  </div>
                </div>

                {/* Right side - Visual element */}
                <div className="hidden md:flex items-center justify-center">
                  <div className="relative w-80 h-80">
                    {/* Orbiting elements */}
                    <div className="absolute inset-0 animate-spin-slow">
                      <div className="absolute top-0 left-1/2 w-4 h-4 bg-purple-500 rounded-full blur-sm transform -translate-x-1/2 shadow-lg shadow-purple-500/50" />
                    </div>
                    <div className="absolute inset-4 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '20s' }}>
                      <div className="absolute top-0 left-1/2 w-3 h-3 bg-indigo-500 rounded-full blur-sm transform -translate-x-1/2 shadow-lg shadow-indigo-500/50" />
                    </div>
                    <div className="absolute inset-8 animate-spin-slow" style={{ animationDuration: '25s' }}>
                      <div className="absolute top-0 left-1/2 w-3 h-3 bg-blue-500 rounded-full blur-sm transform -translate-x-1/2 shadow-lg shadow-blue-500/50" />
                    </div>
                    
                    {/* Central space station */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="relative animate-float">
                        {/* Space Station SVG */}
                        <svg className="w-56 h-56" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                          {/* Solar panels - Left */}
                          <g opacity="0.9">
                            <rect x="20" y="90" width="60" height="60" fill="url(#solarGradientHome)" stroke="#7C3AED" strokeWidth="2" />
                            <line x1="30" y1="90" x2="30" y2="150" stroke="#8B5CF6" strokeWidth="1" opacity="0.5" />
                            <line x1="40" y1="90" x2="40" y2="150" stroke="#8B5CF6" strokeWidth="1" opacity="0.5" />
                            <line x1="50" y1="90" x2="50" y2="150" stroke="#8B5CF6" strokeWidth="1" opacity="0.5" />
                            <line x1="60" y1="90" x2="60" y2="150" stroke="#8B5CF6" strokeWidth="1" opacity="0.5" />
                            <line x1="70" y1="90" x2="70" y2="150" stroke="#8B5CF6" strokeWidth="1" opacity="0.5" />
                            <line x1="20" y1="100" x2="80" y2="100" stroke="#8B5CF6" strokeWidth="1" opacity="0.3" />
                            <line x1="20" y1="110" x2="80" y2="110" stroke="#8B5CF6" strokeWidth="1" opacity="0.3" />
                            <line x1="20" y1="120" x2="80" y2="120" stroke="#8B5CF6" strokeWidth="1" opacity="0.3" />
                            <line x1="20" y1="130" x2="80" y2="130" stroke="#8B5CF6" strokeWidth="1" opacity="0.3" />
                            <line x1="20" y1="140" x2="80" y2="140" stroke="#8B5CF6" strokeWidth="1" opacity="0.3" />
                          </g>
                          
                          {/* Solar panels - Right */}
                          <g opacity="0.9">
                            <rect x="160" y="90" width="60" height="60" fill="url(#solarGradientHome)" stroke="#7C3AED" strokeWidth="2" />
                            <line x1="170" y1="90" x2="170" y2="150" stroke="#8B5CF6" strokeWidth="1" opacity="0.5" />
                            <line x1="180" y1="90" x2="180" y2="150" stroke="#8B5CF6" strokeWidth="1" opacity="0.5" />
                            <line x1="190" y1="90" x2="190" y2="150" stroke="#8B5CF6" strokeWidth="1" opacity="0.5" />
                            <line x1="200" y1="90" x2="200" y2="150" stroke="#8B5CF6" strokeWidth="1" opacity="0.5" />
                            <line x1="210" y1="90" x2="210" y2="150" stroke="#8B5CF6" strokeWidth="1" opacity="0.5" />
                            <line x1="160" y1="100" x2="220" y2="100" stroke="#8B5CF6" strokeWidth="1" opacity="0.3" />
                            <line x1="160" y1="110" x2="220" y2="110" stroke="#8B5CF6" strokeWidth="1" opacity="0.3" />
                            <line x1="160" y1="120" x2="220" y2="120" stroke="#8B5CF6" strokeWidth="1" opacity="0.3" />
                            <line x1="160" y1="130" x2="220" y2="130" stroke="#8B5CF6" strokeWidth="1" opacity="0.3" />
                            <line x1="160" y1="140" x2="220" y2="140" stroke="#8B5CF6" strokeWidth="1" opacity="0.3" />
                          </g>
                          
                          {/* Connection arms */}
                          <rect x="80" y="115" width="80" height="10" fill="#6366F1" stroke="#818CF8" strokeWidth="1" />
                          <rect x="82" y="117" width="76" height="6" fill="url(#armGradientHome)" />
                          
                          {/* Central module - main body */}
                          <ellipse cx="120" cy="120" rx="35" ry="30" fill="url(#moduleGradientHome)" stroke="#818CF8" strokeWidth="2" />
                          
                          {/* Module details */}
                          <ellipse cx="120" cy="115" rx="28" ry="23" fill="#312E81" opacity="0.3" />
                          
                          {/* Windows */}
                          <circle cx="110" cy="115" r="6" fill="#A78BFA" opacity="0.9" />
                          <circle cx="130" cy="115" r="6" fill="#A78BFA" opacity="0.9" />
                          <circle cx="120" cy="125" r="5" fill="#C4B5FD" opacity="0.8" />
                          
                          {/* Window reflections */}
                          <circle cx="108" cy="113" r="2" fill="#DDD6FE" opacity="0.9" />
                          <circle cx="128" cy="113" r="2" fill="#DDD6FE" opacity="0.9" />
                          <circle cx="118" cy="123" r="1.5" fill="#DDD6FE" opacity="0.9" />
                          
                          {/* Antenna array - top */}
                          <line x1="120" y1="90" x2="120" y2="70" stroke="#818CF8" strokeWidth="2" />
                          <circle cx="120" cy="70" r="4" fill="#A78BFA" opacity="0.9" />
                          <line x1="120" y1="70" x2="110" y2="60" stroke="#818CF8" strokeWidth="1.5" />
                          <line x1="120" y1="70" x2="130" y2="60" stroke="#818CF8" strokeWidth="1.5" />
                          <circle cx="110" cy="60" r="2" fill="#C4B5FD" />
                          <circle cx="130" cy="60" r="2" fill="#C4B5FD" />
                          
                          {/* Communications dish - bottom */}
                          <ellipse cx="120" cy="155" rx="15" ry="8" fill="#4C1D95" stroke="#818CF8" strokeWidth="1.5" />
                          <ellipse cx="120" cy="153" rx="12" ry="6" fill="#312E81" />
                          <line x1="120" y1="150" x2="120" y2="163" stroke="#818CF8" strokeWidth="2" />
                          
                          {/* Status lights */}
                          <circle cx="105" cy="130" r="1.5" fill="#F472B6" className="animate-pulse" />
                          <circle cx="135" cy="130" r="1.5" fill="#34D399" className="animate-pulse" />
                          
                          {/* Panel details on module */}
                          <rect x="100" y="120" width="8" height="12" rx="1" fill="#4C1D95" opacity="0.6" />
                          <rect x="132" y="120" width="8" height="12" rx="1" fill="#4C1D95" opacity="0.6" />
                          
                          <defs>
                            <linearGradient id="solarGradientHome" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#5B21B6" stopOpacity="0.8" />
                              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.6" />
                              <stop offset="100%" stopColor="#5B21B6" stopOpacity="0.8" />
                            </linearGradient>
                            <linearGradient id="moduleGradientHome" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#E0E7FF" />
                              <stop offset="50%" stopColor="#C7D2FE" />
                              <stop offset="100%" stopColor="#A5B4FC" />
                            </linearGradient>
                            <linearGradient id="armGradientHome" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#818CF8" />
                              <stop offset="50%" stopColor="#A5B4FC" />
                              <stop offset="100%" stopColor="#818CF8" />
                            </linearGradient>
                          </defs>
                        </svg>
                        
                        {/* Glow effect behind station */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-500/30 rounded-full blur-3xl -z-10" />
                      </div>
                      
                      {/* Rings */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-purple-500/30 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-indigo-500/20 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator - TESS Telescope Theme */}
          <div className="flex flex-col items-center justify-center mb-8 opacity-70 hover:opacity-100 transition-opacity duration-500">
            <div className="text-slate-400 text-sm font-medium mb-3">{t('home.scroll.exploreMore')}</div>
            <div className="relative flex flex-col items-center">
              {/* TESS Telescope SVG */}
              <svg width="64" height="64" viewBox="0 0 64 64" className="block" fill="none">
                {/* Glow effect */}
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Left solar panel */}
                <rect x="8" y="22" width="12" height="20" fill="#4f46e5" fillOpacity="0.6" stroke="#6366f1" strokeWidth="1.5"/>
                <line x1="11" y1="24" x2="11" y2="40" stroke="#818cf8" strokeWidth="0.5" opacity="0.5"/>
                <line x1="14" y1="24" x2="14" y2="40" stroke="#818cf8" strokeWidth="0.5" opacity="0.5"/>
                <line x1="17" y1="24" x2="17" y2="40" stroke="#818cf8" strokeWidth="0.5" opacity="0.5"/>
                
                {/* Right solar panel */}
                <rect x="44" y="22" width="12" height="20" fill="#4f46e5" fillOpacity="0.6" stroke="#6366f1" strokeWidth="1.5"/>
                <line x1="47" y1="24" x2="47" y2="40" stroke="#818cf8" strokeWidth="0.5" opacity="0.5"/>
                <line x1="50" y1="24" x2="50" y2="40" stroke="#818cf8" strokeWidth="0.5" opacity="0.5"/>
                <line x1="53" y1="24" x2="53" y2="40" stroke="#818cf8" strokeWidth="0.5" opacity="0.5"/>
                
                {/* Main body */}
                <rect x="24" y="20" width="16" height="24" fill="#1e293b" stroke="#475569" strokeWidth="1.5"/>
                <rect x="26" y="22" width="12" height="8" fill="#312e81" fillOpacity="0.5"/>
                
                {/* Camera/lens array */}
                <circle cx="29" cy="26" r="2" fill="#8b5cf6" fillOpacity="0.8" filter="url(#glow)"/>
                <circle cx="35" cy="26" r="2" fill="#8b5cf6" fillOpacity="0.8" filter="url(#glow)"/>
                <circle cx="32" cy="35" r="2.5" fill="#a78bfa" fillOpacity="0.9" filter="url(#glow)"/>
                
                {/* Details */}
                <line x1="26" y1="32" x2="38" y2="32" stroke="#475569" strokeWidth="0.5"/>
                <line x1="26" y1="40" x2="38" y2="40" stroke="#475569" strokeWidth="0.5"/>
                
                {/* Down arrow below telescope */}
                <g className="animate-float-slow">
                  <path d="M32 48v8" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
                  <path d="M29 54l3 3 3-3" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
                </g>
              </svg>
            </div>
            {/* Subtle hint text */}
            <div className="mt-3 text-slate-500 text-xs">{t('home.scroll.scrollHint')}</div>
          </div>

          {/* Main Cards Container */}
          <div className="gap-6 mb-12">
            {/* Star Map Card */}
            <div className=" rounded-3xl p-8 border border-slate-700/30 shadow-2xl shadow-black/40">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">{t('home.starMap.title')}</h2>
                <p className="text-slate-400">{t('home.starMap.subtitle')}</p>
              </div>

                {/* Star Map */}
              <div className="relative bg-gradient-to-br from-black via-slate-950 to-slate-900 rounded-2xl border border-slate-700/30 overflow-hidden shadow-inner" style={{ height: '500px' }}>
                {/* Nebula-like background effects */}
                <div className="absolute inset-0">
                  <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-purple-600/8 rounded-full blur-3xl" />
                  <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-indigo-600/5 rounded-full blur-3xl" />
                  <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
                </div>

                {/* Background stars field */}
                <div className="absolute inset-0">
                  {starMapBgStars.map((star, i) => (
                    <div
                      key={`bg-star-${i}`}
                      className="absolute bg-white rounded-full"
                      style={star}
                    />
                  ))}
                </div>

                {/* Subtle constellation lines */}
                <svg className="absolute inset-0 w-full h-full opacity-20">
                  {exoplanets.map((planet, i) => {
                    if (i < exoplanets.length - 1 && Math.random() > 0.6) {
                      const nextPlanet = exoplanets[i + 1];
                      return (
                        <line
                          key={`line-${i}`}
                          x1={`${planet.x}%`}
                          y1={`${planet.y}%`}
                          x2={`${nextPlanet.x}%`}
                          y2={`${nextPlanet.y}%`}
                          stroke="rgba(100, 100, 150, 0.2)"
                          strokeWidth="1"
                          strokeDasharray="2,3"
                        />
                      );
                    }
                    return null;
                  })}
                </svg>

                {/* Coordinate reference lines (subtle) */}
                <div className="absolute inset-0 opacity-5">
                  {[...Array(5)].map((_, i) => (
                    <div key={`h-line-${i}`} className="absolute w-full border-t border-slate-600" style={{ top: `${(i + 1) * 16.66}%` }} />
                  ))}
                  {[...Array(5)].map((_, i) => (
                    <div key={`v-line-${i}`} className="absolute h-full border-l border-slate-600" style={{ left: `${(i + 1) * 16.66}%` }} />
                  ))}
                </div>

                {/* Exoplanets on map */}
                {exoplanets.map((planet) => {
                  const colors = getStatusColor(planet.status);
                  const isHovered = hoveredPlanet?.id === planet.id;
                  
                  return (
                    <div
                      key={planet.id}
                      className="absolute cursor-pointer group"
                      style={{ left: `${planet.x}%`, top: `${planet.y}%` }}
                      onMouseEnter={() => setHoveredPlanet(planet)}
                      onMouseLeave={() => setHoveredPlanet(null)}
                      onClick={() => handlePlanetClick(planet)}
                    >
                      {/* Glow effect */}
                      <div className={`absolute top-1/2 left-1/2 w-8 h-8 rounded-full ${colors.bg} opacity-20 blur-md transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${isHovered ? 'scale-150' : 'scale-100'}`} />
                      
                      {/* Planet dot with pulse */}
                      <div className={`absolute top-1/2 left-1/2 w-3 h-3 rounded-full ${colors.bg} shadow-lg ${colors.shadow} transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${isHovered ? 'scale-150' : 'scale-100'} animate-pulse`} style={{ animationDuration: '3s' }} />
                      
                      {/* Planet ring (for selected/hovered) */}
                      {isHovered && (
                        <div className={`absolute top-1/2 left-1/2 w-6 h-6 rounded-full border-2 ${colors.border} opacity-50 transform -translate-x-1/2 -translate-y-1/2 animate-ping`} style={{ animationDuration: '2s' }} />
                      )}
                      
                      {/* Tooltip */}
                      {isHovered && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-4 py-2 bg-slate-900/95 backdrop-blur-sm border border-slate-600/40 rounded-lg whitespace-nowrap z-50 shadow-xl">
                          <div className="text-white font-semibold text-sm">{planet.name}</div>
                          <div className="text-slate-400 text-xs">{getStatusLabel(planet.status)}</div>
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-slate-900 border-r border-b border-slate-600/40"></div>
                        </div>
                      )}
                    </div>
                  );
                })}
                </div>
              {/* Legend */}
              <div className="mt-6 flex flex-wrap gap-4 justify-center">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />
                  <span className="text-slate-300 text-sm">{t('home.legend.confirmed')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-amber-400 shadow-lg shadow-amber-400/50" />
                  <span className="text-slate-300 text-sm">{t('home.legend.candidates')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400 shadow-lg shadow-rose-400/50" />
                  <span className="text-slate-300 text-sm">{t('home.legend.falsePositives')}</span>
                </div>
              </div>
            </div>
          </div>

            {/* Statistics Card - Compact Design */}
            <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/30 shadow-2xl shadow-black/40">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">{t('home.statistics.title')}</h2>
                <p className="text-slate-400">{t('home.statistics.subtitle')}</p>
              </div>

              {/* Compact Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-400 mb-1">
                    {exoplanets.filter(p => p.status === 'confirmed').length}
                  </div>
                  <div className="text-slate-300 text-sm font-medium">{t('home.statistics.confirmedExoplanets')}</div>
                  <div className="text-slate-500 text-xs">{t('home.statistics.verified')}</div>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-amber-400 mb-1">
                    {exoplanets.filter(p => p.status === 'candidate').length}
                  </div>
                  <div className="text-slate-300 text-sm font-medium">{t('home.statistics.candidatePlanets')}</div>
                  <div className="text-slate-500 text-xs">{t('home.statistics.inAnalysis')}</div>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-rose-400 mb-1">
                    {exoplanets.filter(p => p.status === 'false_positive').length}
                  </div>
                  <div className="text-slate-300 text-sm font-medium">{t('home.statistics.falsePositive')}</div>
                  <div className="text-slate-500 text-xs">{t('home.statistics.discarded')}</div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400 mb-1">
                    {exoplanets.length}
                  </div>
                  <div className="text-slate-300 text-sm font-medium">{t('home.statistics.totalAnalyzed')}</div>
                  <div className="text-slate-500 text-xs">{t('home.statistics.processed')}</div>
                </div>
              </div>
            </div>

          {/* Exoplanets List Card */}
          <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/30 shadow-2xl shadow-black/40 mt-12 mb-20">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">{t('home.exoplanetsList.title')}</h2>
              <p className="text-slate-400">{t('home.exoplanetsList.subtitle')}</p>
            </div>

            {/* Tabs */}
            <div className="mb-6">
              <div className="border-b border-slate-700/30">
                <nav className="flex space-x-8">
                  <button
                    onClick={() => setActiveTab('exodia')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === 'exodia'
                        ? 'border-blue-400 text-blue-400'
                        : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-300'
                    }`}
                  >
                    EXODIA
                  </button>
                  <button
                    onClick={() => setActiveTab('kepler')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === 'kepler'
                        ? 'border-blue-400 text-blue-400'
                        : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-300'
                    }`}
                  >
                    Kepler
                  </button>
                  <button
                    onClick={() => setActiveTab('k2')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === 'k2'
                        ? 'border-blue-400 text-blue-400'
                        : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-300'
                    }`}
                  >
                    K2
                  </button>
                  <button
                    onClick={() => setActiveTab('tess')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === 'tess'
                        ? 'border-blue-400 text-blue-400'
                        : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-300'
                    }`}
                  >
                    TESS
                  </button>
                </nav>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700/30">
                    <th className="text-left text-slate-400 font-semibold py-4 px-4">{t('home.exoplanetsList.table.name')}</th>
                    <th className="text-left text-slate-400 font-semibold py-4 px-4">{t('home.exoplanetsList.table.status')}</th>
                    <th className="text-left text-slate-400 font-semibold py-4 px-4">{t('home.exoplanetsList.table.distance')}</th>
                    <th className="text-left text-slate-400 font-semibold py-4 px-4">{t('home.exoplanetsList.table.type')}</th>
                    <th className="text-left text-slate-400 font-semibold py-4 px-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {activeTab === 'kepler' ? (
                    exoplanets.map((planet) => {
                      const colors = getStatusColor(planet.status);
                      return (
                        <tr 
                          key={planet.id}
                          className="border-b border-slate-800/50 hover:bg-slate-700/10 transition-colors cursor-pointer"
                          onClick={() => handlePlanetClick(planet)}
                        >
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-3">
                              <div className={`w-2 h-2 rounded-full ${colors.bg} shadow-lg ${colors.shadow}`} />
                              <span className="text-white font-medium">{planet.name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors.bg} bg-opacity-20 border ${colors.border} border-opacity-30`}>
                              {getStatusLabel(planet.status)}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-slate-300">{planet.distance}</td>
                          <td className="py-4 px-4 text-slate-300">{getPlanetTypeLabel(planet.type)}</td>
                          <td className="py-4 px-4">
                            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </td>
                        </tr>
                      );
                    })
                  ) : activeTab === 'exodia' ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center">
                        <div className="flex flex-col items-center space-y-3">
                          <div className="w-16 h-16 rounded-full bg-slate-700/30 flex items-center justify-center">
                            <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                          </div>
                          <div className="text-slate-400 font-medium">{t('home.exoplanetsList.noData.exodia')}</div>
                          <div className="text-slate-500 text-sm">{t('home.exoplanetsList.noData.exodiaDesc')}</div>
                        </div>
                      </td>
                    </tr>
                  ) : activeTab === 'k2' ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center">
                        <div className="flex flex-col items-center space-y-3">
                          <div className="w-16 h-16 rounded-full bg-slate-700/30 flex items-center justify-center">
                            <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                          </div>
                          <div className="text-slate-400 font-medium">{t('home.exoplanetsList.noData.k2')}</div>
                          <div className="text-slate-500 text-sm">{t('home.exoplanetsList.noData.k2Desc')}</div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-12 text-center">
                        <div className="flex flex-col items-center space-y-3">
                          <div className="w-16 h-16 rounded-full bg-slate-700/30 flex items-center justify-center">
                            <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                          </div>
                          <div className="text-slate-400 font-medium">{t('home.exoplanetsList.noData.tess')}</div>
                          <div className="text-slate-500 text-sm">{t('home.exoplanetsList.noData.tessDesc')}</div>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CSS Animations */}
      <style>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(6px);
          }
        }
        
        .animate-float-slow {
          animation: float-slow 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(-3deg);
          }
          50% {
            transform: translateY(-15px) rotate(3deg);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;

