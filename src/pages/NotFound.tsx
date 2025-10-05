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
            
            {/* Central lost planet/icon */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800 rounded-full shadow-2xl shadow-slate-500/50 animate-pulse" style={{ animationDuration: '4s' }} />
                <div className="absolute inset-0 w-32 h-32 bg-gradient-to-tl from-slate-400 via-transparent to-transparent rounded-full opacity-40" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <svg className="w-16 h-16 text-white opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              
              {/* Rings */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-slate-600/30 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-slate-700/20 rounded-full" />
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
      `}</style>
    </div>
  );
};

export default NotFound;