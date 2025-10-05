// src/pages/NotFound.tsx
import { Link } from 'react-router-dom';
import { useMemo } from 'react';

const NotFound = () => {
  // Generar estrellas de fondo solo una vez
  const mainBgStars = useMemo(() => {
    return Array.from({ length: 100 }, () => ({
      width: Math.random() > 0.8 ? '2px' : '1px',
      height: Math.random() > 0.8 ? '2px' : '1px',
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.6 + 0.2,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${Math.random() * 2 + 2}s`,
    }));
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 overflow-hidden flex items-center justify-center px-4">
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

      <div className="relative z-10 max-w-4xl w-full text-center">
        {/* Lost in Space Visual */}
        <div className="mb-12 relative">
          {/* Floating astronaut/planet animation */}
          <div className="relative w-64 h-64 mx-auto mb-8">
            {/* Orbiting elements */}
            <div className="absolute inset-0 animate-spin-slow">
              <div className="absolute top-0 left-1/2 w-3 h-3 bg-purple-500 rounded-full blur-sm transform -translate-x-1/2 shadow-lg shadow-purple-500/50" />
            </div>
            <div className="absolute inset-4 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '20s' }}>
              <div className="absolute top-0 left-1/2 w-2 h-2 bg-indigo-500 rounded-full blur-sm transform -translate-x-1/2 shadow-lg shadow-indigo-500/50" />
            </div>
            
            {/* Central space station floating */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative animate-float">
                {/* Space Station SVG */}
                <svg className="w-48 h-48" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Solar panels - Left */}
                  <g opacity="0.9">
                    <rect x="20" y="90" width="60" height="60" fill="url(#solarGradient)" stroke="#1E40AF" strokeWidth="2" />
                    <line x1="30" y1="90" x2="30" y2="150" stroke="#1E40AF" strokeWidth="1" opacity="0.5" />
                    <line x1="40" y1="90" x2="40" y2="150" stroke="#1E40AF" strokeWidth="1" opacity="0.5" />
                    <line x1="50" y1="90" x2="50" y2="150" stroke="#1E40AF" strokeWidth="1" opacity="0.5" />
                    <line x1="60" y1="90" x2="60" y2="150" stroke="#1E40AF" strokeWidth="1" opacity="0.5" />
                    <line x1="70" y1="90" x2="70" y2="150" stroke="#1E40AF" strokeWidth="1" opacity="0.5" />
                    <line x1="20" y1="100" x2="80" y2="100" stroke="#1E40AF" strokeWidth="1" opacity="0.3" />
                    <line x1="20" y1="110" x2="80" y2="110" stroke="#1E40AF" strokeWidth="1" opacity="0.3" />
                    <line x1="20" y1="120" x2="80" y2="120" stroke="#1E40AF" strokeWidth="1" opacity="0.3" />
                    <line x1="20" y1="130" x2="80" y2="130" stroke="#1E40AF" strokeWidth="1" opacity="0.3" />
                    <line x1="20" y1="140" x2="80" y2="140" stroke="#1E40AF" strokeWidth="1" opacity="0.3" />
                  </g>
                  
                  {/* Solar panels - Right */}
                  <g opacity="0.9">
                    <rect x="160" y="90" width="60" height="60" fill="url(#solarGradient)" stroke="#1E40AF" strokeWidth="2" />
                    <line x1="170" y1="90" x2="170" y2="150" stroke="#1E40AF" strokeWidth="1" opacity="0.5" />
                    <line x1="180" y1="90" x2="180" y2="150" stroke="#1E40AF" strokeWidth="1" opacity="0.5" />
                    <line x1="190" y1="90" x2="190" y2="150" stroke="#1E40AF" strokeWidth="1" opacity="0.5" />
                    <line x1="200" y1="90" x2="200" y2="150" stroke="#1E40AF" strokeWidth="1" opacity="0.5" />
                    <line x1="210" y1="90" x2="210" y2="150" stroke="#1E40AF" strokeWidth="1" opacity="0.5" />
                    <line x1="160" y1="100" x2="220" y2="100" stroke="#1E40AF" strokeWidth="1" opacity="0.3" />
                    <line x1="160" y1="110" x2="220" y2="110" stroke="#1E40AF" strokeWidth="1" opacity="0.3" />
                    <line x1="160" y1="120" x2="220" y2="120" stroke="#1E40AF" strokeWidth="1" opacity="0.3" />
                    <line x1="160" y1="130" x2="220" y2="130" stroke="#1E40AF" strokeWidth="1" opacity="0.3" />
                    <line x1="160" y1="140" x2="220" y2="140" stroke="#1E40AF" strokeWidth="1" opacity="0.3" />
                  </g>
                  
                  {/* Connection arms */}
                  <rect x="80" y="115" width="80" height="10" fill="#475569" stroke="#64748B" strokeWidth="1" />
                  <rect x="82" y="117" width="76" height="6" fill="url(#armGradient)" />
                  
                  {/* Central module - main body */}
                  <ellipse cx="120" cy="120" rx="35" ry="30" fill="url(#moduleGradient)" stroke="#64748B" strokeWidth="2" />
                  
                  {/* Module details */}
                  <ellipse cx="120" cy="115" rx="28" ry="23" fill="#1E293B" opacity="0.3" />
                  
                  {/* Windows */}
                  <circle cx="110" cy="115" r="6" fill="#3B82F6" opacity="0.8" />
                  <circle cx="130" cy="115" r="6" fill="#3B82F6" opacity="0.8" />
                  <circle cx="120" cy="125" r="5" fill="#60A5FA" opacity="0.7" />
                  
                  {/* Window reflections */}
                  <circle cx="108" cy="113" r="2" fill="#93C5FD" opacity="0.9" />
                  <circle cx="128" cy="113" r="2" fill="#93C5FD" opacity="0.9" />
                  <circle cx="118" cy="123" r="1.5" fill="#93C5FD" opacity="0.9" />
                  
                  {/* Antenna array - top */}
                  <line x1="120" y1="90" x2="120" y2="70" stroke="#64748B" strokeWidth="2" />
                  <circle cx="120" cy="70" r="4" fill="#3B82F6" opacity="0.8" />
                  <line x1="120" y1="70" x2="110" y2="60" stroke="#64748B" strokeWidth="1.5" />
                  <line x1="120" y1="70" x2="130" y2="60" stroke="#64748B" strokeWidth="1.5" />
                  <circle cx="110" cy="60" r="2" fill="#60A5FA" />
                  <circle cx="130" cy="60" r="2" fill="#60A5FA" />
                  
                  {/* Communications dish - bottom */}
                  <ellipse cx="120" cy="155" rx="15" ry="8" fill="#334155" stroke="#64748B" strokeWidth="1.5" />
                  <ellipse cx="120" cy="153" rx="12" ry="6" fill="#1E293B" />
                  <line x1="120" y1="150" x2="120" y2="163" stroke="#64748B" strokeWidth="2" />
                  
                  {/* Status lights */}
                  <circle cx="105" cy="130" r="1.5" fill="#EF4444" className="animate-pulse" />
                  <circle cx="135" cy="130" r="1.5" fill="#10B981" className="animate-pulse" />
                  
                  {/* Panel details on module */}
                  <rect x="100" y="120" width="8" height="12" rx="1" fill="#334155" opacity="0.6" />
                  <rect x="132" y="120" width="8" height="12" rx="1" fill="#334155" opacity="0.6" />
                  
                  <defs>
                    <linearGradient id="solarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.8" />
                    </linearGradient>
                    <linearGradient id="moduleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#CBD5E1" />
                      <stop offset="50%" stopColor="#94A3B8" />
                      <stop offset="100%" stopColor="#64748B" />
                    </linearGradient>
                    <linearGradient id="armGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#64748B" />
                      <stop offset="50%" stopColor="#94A3B8" />
                      <stop offset="100%" stopColor="#64748B" />
                    </linearGradient>
                  </defs>
                </svg>
                
                {/* Glow effect behind station */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl -z-10" />
              </div>
              
              {/* Floating particles around station */}
              <div className="absolute top-1/4 -left-12 w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDuration: '2s' }} />
              <div className="absolute top-1/3 -right-12 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
              <div className="absolute bottom-1/4 -left-10 w-1 h-1 bg-indigo-400 rounded-full animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '1s' }} />
              <div className="absolute top-1/2 -right-14 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" style={{ animationDuration: '2.8s', animationDelay: '0.3s' }} />
              <div className="absolute bottom-1/3 left-0 w-1 h-1 bg-blue-300 rounded-full animate-pulse" style={{ animationDuration: '3.2s', animationDelay: '0.8s' }} />
              
              {/* Orbital rings */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 border-2 border-blue-500/20 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 border border-indigo-500/10 rounded-full" />
            </div>
          </div>

          {/* 404 Number */}
          <h1 className="text-8xl md:text-9xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
            404
          </h1>
        </div>

        {/* Message Card */}
        <div className="relative group mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-indigo-600/20 to-blue-600/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
          
          <div className="relative bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-slate-600/40 shadow-2xl">
            {/* Animated stars in background */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={`card-star-${i}`}
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

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Perdido en el Espacio
              </h2>
              <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                La página que buscas está más allá de nuestro sistema solar conocido. 
                Parece que esta coordenada no existe en nuestro mapa estelar.
              </p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/"
                  className="group/btn relative px-8 py-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 overflow-hidden inline-flex items-center justify-center"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    Volver al Inicio
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                </Link>
                
                <button
                  onClick={() => window.history.back()}
                  className="px-8 py-4 bg-slate-800/50 backdrop-blur-sm text-slate-200 font-semibold rounded-xl border border-slate-600/50 hover:bg-slate-700/50 hover:border-slate-500 transition-all duration-300 inline-flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Regresar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Links */}
        <div className="relative">
          <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/30 shadow-2xl shadow-black/40">
            <p className="text-sm text-slate-400 mb-4 font-medium">Navegación rápida:</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/"
                className="text-sm text-indigo-400 hover:text-indigo-300 hover:underline transition-colors"
              >
                Inicio
              </Link>
              <span className="text-slate-600">•</span>
              <Link
                to="/about"
                className="text-sm text-indigo-400 hover:text-indigo-300 hover:underline transition-colors"
              >
                Acerca de
              </Link>
              <span className="text-slate-600">•</span>
              <Link
                to="/methodology"
                className="text-sm text-indigo-400 hover:text-indigo-300 hover:underline transition-colors"
              >
                Metodología
              </Link>
              <span className="text-slate-600">•</span>
              <Link
                to="/team"
                className="text-sm text-indigo-400 hover:text-indigo-300 hover:underline transition-colors"
              >
                Equipo
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
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
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(-5deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFound;