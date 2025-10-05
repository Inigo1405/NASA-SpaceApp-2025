import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { Planet } from '../types';

const PlanetInformation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [planet, setPlanet] = useState<Planet | null>(null);

  // Datos extendidos de ejemplo para cada planeta
  const extendedPlanetData: { [key: number]: any } = {
    1: {
      name: 'Kepler-452b',
      status: 'confirmed',
      distance: '1,400',
      type: 'Super-Tierra',
      discoveryYear: 2015,
      discoveryMethod: 'Tránsito',
      orbitalPeriod: '385 días',
      radius: '1.6 × Tierra',
      mass: '5 × Tierra',
      temperature: '-8°C',
      starType: 'G2V (similar al Sol)',
      habitabilityIndex: 0.83,
      atmosphere: 'Posible atmósfera densa',
      description: 'Kepler-452b orbita una estrella muy similar a nuestro Sol en la zona habitable. Es aproximadamente 60% más grande que la Tierra y tiene un año de 385 días.',
      features: [
        'Primera Super-Tierra en zona habitable de estrella tipo Solar',
        'Posible actividad volcánica',
        'Potencial para agua líquida en superficie',
        'Estrella anfitriona 1.5 mil millones de años más antigua que el Sol'
      ]
    },
    2: {
      name: 'TRAPPIST-1e',
      status: 'confirmed',
      distance: '39',
      type: 'Terrestre',
      discoveryYear: 2017,
      discoveryMethod: 'Tránsito',
      orbitalPeriod: '6.1 días',
      radius: '0.92 × Tierra',
      mass: '0.62 × Tierra',
      temperature: '15°C',
      starType: 'Enana roja ultrafría',
      habitabilityIndex: 0.95,
      atmosphere: 'Evidencia de atmósfera',
      description: 'TRAPPIST-1e es uno de los siete planetas que orbitan la estrella TRAPPIST-1. Es el más prometedor para albergar vida debido a su tamaño, densidad y ubicación en la zona habitable.',
      features: [
        'Tamaño y masa muy similar a la Tierra',
        'Temperatura superficial ideal para agua líquida',
        'Parte del sistema de 7 planetas terrestres',
        'Objetivo prioritario para telescopios espaciales'
      ]
    },
    3: {
      name: 'Proxima Centauri b',
      status: 'confirmed',
      distance: '4.2',
      type: 'Terrestre',
      discoveryYear: 2016,
      discoveryMethod: 'Velocidad radial',
      orbitalPeriod: '11.2 días',
      radius: '1.1 × Tierra',
      mass: '1.27 × Tierra',
      temperature: '-39°C',
      starType: 'Enana roja M5.5Ve',
      habitabilityIndex: 0.70,
      atmosphere: 'Incierta debido a radiación estelar',
      description: 'El exoplaneta más cercano a nuestro Sistema Solar, orbitando Proxima Centauri. A pesar de su proximidad, enfrenta desafíos de habitabilidad debido a la radiación de su estrella.',
      features: [
        'Exoplaneta más cercano conocido',
        'Posible bloqueo de marea (siempre muestra la misma cara)',
        'Sujeto a intensas llamaradas estelares',
        'Destino potencial para futuras misiones interestelares'
      ]
    },
    4: {
      name: 'TOI-700 d',
      status: 'confirmed',
      distance: '101',
      type: 'Terrestre',
      discoveryYear: 2020,
      discoveryMethod: 'Tránsito (TESS)',
      orbitalPeriod: '37.4 días',
      radius: '1.19 × Tierra',
      mass: '1.72 × Tierra',
      temperature: '5°C',
      starType: 'Enana roja M2V',
      habitabilityIndex: 0.88,
      atmosphere: 'Posible atmósfera rica en CO₂',
      description: 'Primer planeta del tamaño de la Tierra en zona habitable descubierto por TESS. Los modelos sugieren que podría tener océanos y nubes.',
      features: [
        'Descubierto por el satélite TESS',
        'Modelos climáticos sugieren posibles océanos',
        'Uno de los pocos planetas terrestres conocidos en zona habitable',
        'Candidato para observación con James Webb'
      ]
    },
    5: {
      name: 'K2-18b',
      status: 'confirmed',
      distance: '124',
      type: 'Mini-Neptuno',
      discoveryYear: 2015,
      discoveryMethod: 'Tránsito',
      orbitalPeriod: '33 días',
      radius: '2.6 × Tierra',
      mass: '8.6 × Tierra',
      temperature: '-22°C',
      starType: 'Enana roja M3V',
      habitabilityIndex: 0.65,
      atmosphere: 'Vapor de agua confirmado',
      description: 'Primer exoplaneta en zona habitable con vapor de agua detectado en su atmósfera. Aunque es un mini-Neptuno, representa un hito en la búsqueda de mundos habitables.',
      features: [
        'Primera detección confirmada de vapor de agua en atmósfera',
        'Posibles signos de dimetil sulfuro (DMS) - potencial biosinatura',
        'Atmósfera rica en hidrógeno',
        'Objeto de intenso estudio atmosférico'
      ]
    },
    6: {
      name: 'LHS 1140 b',
      status: 'confirmed',
      distance: '40',
      type: 'Super-Tierra',
      discoveryYear: 2017,
      discoveryMethod: 'Tránsito',
      orbitalPeriod: '24.7 días',
      radius: '1.7 × Tierra',
      mass: '6.6 × Tierra',
      temperature: '-23°C',
      starType: 'Enana roja M4.5V',
      habitabilityIndex: 0.87,
      atmosphere: 'Posible atmósfera retenida',
      description: 'Una de las mejores super-Tierras para búsqueda de atmósfera. Su alta densidad sugiere composición rocosa con núcleo ferroso.',
      features: [
        'Excelente candidato para espectroscopía atmosférica',
        'Estrella anfitriona tranquila (menos llamaradas)',
        'Alta densidad indica composición rocosa',
        'Posible océano global bajo atmósfera'
      ]
    }
  };

  useEffect(() => {
    // Obtener el planeta desde el estado de navegación o desde localStorage
    const stateplanet = location.state?.planet;
    if (stateplanet) {
      const extended = extendedPlanetData[stateplanet.id] || stateplanet;
      setPlanet({ ...stateplanet, ...extended });
    }
  }, [location]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'confirmed': return { 
        bg: 'bg-emerald-400', 
        shadow: 'shadow-emerald-400/50', 
        border: 'border-emerald-500',
        glow: 'bg-emerald-500/5',
        borderGlow: 'border-emerald-500/20'
      };
      case 'candidate': return { 
        bg: 'bg-amber-400', 
        shadow: 'shadow-amber-400/50', 
        border: 'border-amber-500',
        glow: 'bg-amber-500/5',
        borderGlow: 'border-amber-500/20'
      };
      case 'false_positive': return { 
        bg: 'bg-rose-400', 
        shadow: 'shadow-rose-400/50', 
        border: 'border-rose-500',
        glow: 'bg-rose-500/5',
        borderGlow: 'border-rose-500/20'
      };
      default: return { 
        bg: 'bg-slate-400', 
        shadow: 'shadow-slate-400/50', 
        border: 'border-slate-500',
        glow: 'bg-slate-500/5',
        borderGlow: 'border-slate-500/20'
      };
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'confirmed': return 'Confirmado';
      case 'candidate': return 'Candidato';
      case 'false_positive': return 'Falso Positivo';
      default: return 'Desconocido';
    }
  };

  if (!planet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl mb-4">Cargando información del planeta...</div>
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  const colors = getStatusColor(planet.status);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 overflow-hidden">
      {/* Enhanced Stars Background */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              width: Math.random() > 0.8 ? '2px' : '1px',
              height: Math.random() > 0.8 ? '2px' : '1px',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.6 + 0.2,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 2}s`,
            }}
          />
        ))}
      </div>

      {/* Elegant Gradient Orbs */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl animate-pulse" 
           style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse" 
           style={{ animationDuration: '6s', animationDelay: '1s' }} />

      {/* Content */}
      <div className="relative z-10 min-h-screen px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center space-x-2 text-slate-400 hover:text-white transition-colors group"
          >
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Volver al inicio</span>
          </button>

          {/* Header Section */}
          <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/30 shadow-2xl shadow-black/40 mb-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-3">
                  <div className={`w-4 h-4 rounded-full ${colors.bg} shadow-lg ${colors.shadow} animate-pulse`} 
                       style={{ animationDuration: '3s' }} />
                  <h1 className="text-4xl md:text-5xl font-bold text-white">{planet.name}</h1>
                </div>
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${colors.bg} bg-opacity-20 border ${colors.border} border-opacity-30`}>
                    {getStatusLabel(planet.status)}
                  </span>
                  <span className="px-4 py-2 rounded-full text-sm font-semibold bg-blue-400 bg-opacity-20 border border-blue-500 border-opacity-30 text-blue-300">
                    {planet.type}
                  </span>
                </div>
                {planet.description && (
                  <p className="text-slate-300 text-lg leading-relaxed">{planet.description}</p>
                )}
              </div>
              
              {/* Visual Planet Representation */}
              <div className="hidden lg:block ml-8">
                <div className="relative w-48 h-48">
                  {/* Outer glow */}
                  <div className={`absolute inset-0 ${colors.bg} opacity-20 rounded-full blur-2xl`} />
                  {/* Planet sphere */}
                  <div className={`absolute inset-4 ${colors.bg} opacity-40 rounded-full shadow-2xl ${colors.shadow}`} />
                  {/* Inner highlight */}
                  <div className="absolute inset-8 bg-gradient-to-br from-white/30 to-transparent rounded-full" />
                  {/* Orbiting ring */}
                  <div className={`absolute inset-0 border-2 ${colors.border} opacity-30 rounded-full animate-spin`} 
                       style={{ animationDuration: '20s' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Key Characteristics */}
            <div className="lg:col-span-2 bg-slate-900/40 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/30 shadow-2xl shadow-black/40">
              <h2 className="text-2xl font-bold text-white mb-6">Características Principales</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {planet.distance && (
                  <div className={`${colors.glow} border ${colors.borderGlow} rounded-2xl p-6`}>
                    <div className="text-slate-400 text-sm mb-2">Distancia</div>
                    <div className="text-white text-2xl font-bold">{planet.distance}</div>
                    <div className="text-slate-500 text-xs mt-1">años luz</div>
                  </div>
                )}
                
                {planet.discoveryYear && (
                  <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6">
                    <div className="text-slate-400 text-sm mb-2">Año de Descubrimiento</div>
                    <div className="text-white text-2xl font-bold">{planet.discoveryYear}</div>
                  </div>
                )}
                
                {planet.orbitalPeriod && (
                  <div className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-6">
                    <div className="text-slate-400 text-sm mb-2">Período Orbital</div>
                    <div className="text-white text-2xl font-bold">{planet.orbitalPeriod}</div>
                  </div>
                )}
                
                {planet.temperature && (
                  <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-2xl p-6">
                    <div className="text-slate-400 text-sm mb-2">Temperatura Estimada</div>
                    <div className="text-white text-2xl font-bold">{planet.temperature}</div>
                  </div>
                )}
                
                {planet.radius && (
                  <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-6">
                    <div className="text-slate-400 text-sm mb-2">Radio</div>
                    <div className="text-white text-2xl font-bold">{planet.radius}</div>
                  </div>
                )}
                
                {planet.mass && (
                  <div className="bg-violet-500/5 border border-violet-500/20 rounded-2xl p-6">
                    <div className="text-slate-400 text-sm mb-2">Masa</div>
                    <div className="text-white text-2xl font-bold">{planet.mass}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-6">
              {planet.discoveryMethod && (
                <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/30 shadow-2xl shadow-black/40">
                  <div className="text-slate-400 text-sm mb-2">Método de Detección</div>
                  <div className="text-white text-xl font-semibold">{planet.discoveryMethod}</div>
                </div>
              )}
              
              {planet.starType && (
                <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/30 shadow-2xl shadow-black/40">
                  <div className="text-slate-400 text-sm mb-2">Tipo de Estrella</div>
                  <div className="text-white text-xl font-semibold">{planet.starType}</div>
                </div>
              )}
              
              {planet.habitabilityIndex !== undefined && (
                <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/30 shadow-2xl shadow-black/40">
                  <div className="text-slate-400 text-sm mb-3">Índice de Habitabilidad</div>
                  <div className="flex items-end space-x-3">
                    <div className="text-white text-3xl font-bold">{planet.habitabilityIndex}</div>
                    <div className="text-slate-500 text-sm mb-1">/ 1.00</div>
                  </div>
                  {/* Progress bar */}
                  <div className="mt-4 h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${colors.bg} transition-all duration-1000 ease-out`}
                      style={{ width: `${planet.habitabilityIndex * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Additional Information Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Atmosphere */}
            {planet.atmosphere && (
              <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/30 shadow-2xl shadow-black/40">
                <h3 className="text-xl font-bold text-white mb-4">Atmósfera</h3>
                <p className="text-slate-300 leading-relaxed">{planet.atmosphere}</p>
              </div>
            )}
            
            {/* Features */}
            {planet.features && planet.features.length > 0 && (
              <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/30 shadow-2xl shadow-black/40">
                <h3 className="text-xl font-bold text-white mb-4">Características Destacadas</h3>
                <ul className="space-y-3">
                  {planet.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start space-x-3">
                      <svg className={`w-5 h-5 ${colors.bg} mt-0.5 flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

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
      `}</style>
    </div>
  );
};

export default PlanetInformation;
