import { useState } from 'react';
import type { Planet } from '../types';

// Datos de constelaciones principales con estrellas
const constellations = [
  {
    name: 'Orion',
    stars: [
      { x: 25, y: 45, magnitude: 1 }, // Betelgeuse
      { x: 28, y: 55, magnitude: 2 }, // Bellatrix
      { x: 30, y: 60, magnitude: 0 }, // Rigel
      { x: 26, y: 50, magnitude: 2 }, // Mintaka
      { x: 27, y: 51, magnitude: 2 }, // Alnilam
      { x: 28, y: 52, magnitude: 2 }, // Alnitak
    ],
    connections: [[0,1], [1,3], [3,4], [4,5], [5,2], [2,0]]
  },
  {
    name: 'Ursa Major',
    stars: [
      { x: 70, y: 20, magnitude: 2 },
      { x: 75, y: 22, magnitude: 2 },
      { x: 77, y: 25, magnitude: 2 },
      { x: 76, y: 28, magnitude: 2 },
      { x: 72, y: 27, magnitude: 2 },
      { x: 69, y: 25, magnitude: 2 },
      { x: 67, y: 23, magnitude: 2 },
    ],
    connections: [[0,1], [1,2], [2,3], [3,4], [4,5], [5,6]]
  },
  {
    name: 'Cassiopeia',
    stars: [
      { x: 80, y: 15, magnitude: 2 },
      { x: 83, y: 17, magnitude: 2 },
      { x: 85, y: 20, magnitude: 2 },
      { x: 87, y: 17, magnitude: 2 },
      { x: 90, y: 15, magnitude: 2 },
    ],
    connections: [[0,1], [1,2], [2,3], [3,4]]
  },
  {
    name: 'Crux',
    stars: [
      { x: 15, y: 75, magnitude: 1 },
      { x: 18, y: 72, magnitude: 2 },
      { x: 17, y: 78, magnitude: 2 },
      { x: 20, y: 75, magnitude: 2 },
    ],
    connections: [[0,1], [0,2], [0,3]]
  }
];

const Home = () => {
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

  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const [hoveredPlanet, setHoveredPlanet] = useState<Planet | null>(null);
  const [showCoordinates, setShowCoordinates] = useState(true);
  const [showConstellations, setShowConstellations] = useState(true);

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
      case 'confirmed': return 'Confirmado';
      case 'candidate': return 'Candidato';
      case 'false_positive': return 'Falso Positivo';
      default: return 'Desconocido';
    }
  };

  const handlePlanetClick = (planet: Planet) => {
    setSelectedPlanet(planet);
    // Aquí puedes agregar navegación a página de detalle
    console.log('Ver detalles de:', planet.name);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 overflow-hidden">
      {/* Enhanced Stars Background */}
      <div className="absolute inset-0">
        {[...Array(80)].map((_, i) => (
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

      {/* Hero Section */}
      <section className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-7xl mx-auto w-full">

          {/* Main Cards Container */}
          <div className="gap-6 mb-12">
            {/* Celestial Map Card */}
            <div className=" rounded-3xl p-8 border border-slate-700/30 shadow-2xl shadow-black/40">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">El Universo de EXOD-IA</h2>
                  <p className="text-slate-400">Proyección equirectangular del cielo nocturno con exoplanetas</p>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setShowConstellations(!showConstellations)}
                    className="px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-600/30 text-slate-300 hover:bg-slate-700/50 transition-all text-sm"
                  >
                    {showConstellations ? '⭐ Ocultar' : '⭐ Mostrar'} Constelaciones
                  </button>
                  <button 
                    onClick={() => setShowCoordinates(!showCoordinates)}
                    className="px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-600/30 text-slate-300 hover:bg-slate-700/50 transition-all text-sm"
                  >
                    {showCoordinates ? '📐 Ocultar' : '📐 Mostrar'} Coordenadas
                  </button>
                </div>
              </div>

              {/* Celestial Map */}
              <div className="relative bg-gradient-to-b from-indigo-950 via-slate-950 to-black rounded-2xl border border-slate-700/30 overflow-hidden shadow-inner" style={{ height: '600px' }}>
                {/* Deep space gradient background */}
                <div className="absolute inset-0 bg-gradient-radial from-indigo-900/10 via-transparent to-transparent opacity-50" />
                
                {/* Nebula clouds */}
                <div className="absolute inset-0">
                  <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
                  <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
                  <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-indigo-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }} />
                </div>

                {/* Milky Way band */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute h-32 w-full top-1/2 transform -translate-y-1/2 rotate-12 bg-gradient-to-r from-transparent via-slate-300/20 to-transparent blur-xl" />
                </div>

                {/* Coordinate Grid System */}
                {showCoordinates && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                    {/* Declination lines (horizontal) */}
                    {[...Array(9)].map((_, i) => {
                      const y = (i + 1) * 10;
                      const dec = 90 - (i + 1) * 20; // +90° to -90°
                      return (
                        <g key={`dec-${i}`}>
                          <line
                            x1="0"
                            y1={`${y}%`}
                            x2="100%"
                            y2={`${y}%`}
                            stroke="rgba(100, 150, 200, 0.15)"
                            strokeWidth="1"
                            strokeDasharray="4,4"
                          />
                          <text
                            x="2%"
                            y={`${y}%`}
                            fill="rgba(150, 180, 220, 0.6)"
                            fontSize="10"
                            dy="-4"
                          >
                            {dec > 0 ? '+' : ''}{dec}°
                          </text>
                        </g>
                      );
                    })}
                    
                    {/* Right Ascension lines (vertical) */}
                    {[...Array(12)].map((_, i) => {
                      const x = (i + 1) * 8.33;
                      const ra = (i + 1) * 2; // 0h to 24h
                      return (
                        <g key={`ra-${i}`}>
                          <line
                            x1={`${x}%`}
                            y1="0"
                            x2={`${x}%`}
                            y2="100%"
                            stroke="rgba(100, 150, 200, 0.15)"
                            strokeWidth="1"
                            strokeDasharray="4,4"
                          />
                          <text
                            x={`${x}%`}
                            y="3%"
                            fill="rgba(150, 180, 220, 0.6)"
                            fontSize="10"
                            textAnchor="middle"
                          >
                            {ra}h
                          </text>
                        </g>
                      );
                    })}
                    
                    {/* Celestial Equator */}
                    <line
                      x1="0"
                      y1="50%"
                      x2="100%"
                      y2="50%"
                      stroke="rgba(100, 200, 255, 0.3)"
                      strokeWidth="2"
                      strokeDasharray="8,4"
                    />
                    <text x="50%" y="50%" fill="rgba(100, 200, 255, 0.5)" fontSize="11" textAnchor="middle" dy="-8">
                      Ecuador Celeste
                    </text>
                  </svg>
                )}

                {/* Background star field with varying magnitudes */}
                <div className="absolute inset-0">
                  {[...Array(300)].map((_, i) => {
                    const magnitude = Math.random();
                    const size = magnitude > 0.9 ? 2.5 : magnitude > 0.7 ? 1.8 : magnitude > 0.5 ? 1.2 : 0.8;
                    const brightness = magnitude > 0.9 ? 0.9 : magnitude > 0.7 ? 0.7 : magnitude > 0.5 ? 0.5 : 0.3;
                    
                    return (
                      <div
                        key={`star-${i}`}
                        className="absolute rounded-full animate-pulse"
                        style={{
                          width: `${size}px`,
                          height: `${size}px`,
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                          backgroundColor: magnitude > 0.95 ? '#E0F4FF' : magnitude > 0.8 ? '#FFF8DC' : '#FFFFFF',
                          opacity: brightness,
                          boxShadow: magnitude > 0.9 ? `0 0 ${size * 2}px rgba(255, 255, 255, 0.8)` : 'none',
                          animationDelay: `${Math.random() * 5}s`,
                          animationDuration: `${Math.random() * 3 + 2}s`,
                        }}
                      />
                    );
                  })}
                </div>

                {/* Constellation patterns */}
                {showConstellations && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
                    {constellations.map((constellation, idx) => (
                      <g key={`const-${idx}`}>
                        {/* Constellation lines */}
                        {constellation.connections.map((conn, i) => {
                          const star1 = constellation.stars[conn[0]];
                          const star2 = constellation.stars[conn[1]];
                          return (
                            <line
                              key={`line-${idx}-${i}`}
                              x1={`${star1.x}%`}
                              y1={`${star1.y}%`}
                              x2={`${star2.x}%`}
                              y2={`${star2.y}%`}
                              stroke="rgba(100, 150, 255, 0.3)"
                              strokeWidth="1.5"
                            />
                          );
                        })}
                        
                        {/* Constellation stars */}
                        {constellation.stars.map((star, i) => {
                          const starSize = 6 - star.magnitude;
                          return (
                            <circle
                              key={`star-${idx}-${i}`}
                              cx={`${star.x}%`}
                              cy={`${star.y}%`}
                              r={starSize}
                              fill="rgba(200, 220, 255, 0.9)"
                              filter="url(#glow)"
                            />
                          );
                        })}
                        
                        {/* Constellation label */}
                        <text
                          x={`${constellation.stars[0].x}%`}
                          y={`${constellation.stars[0].y - 3}%`}
                          fill="rgba(150, 180, 255, 0.8)"
                          fontSize="11"
                          fontWeight="600"
                          textAnchor="middle"
                          style={{ textShadow: '0 0 4px rgba(0,0,0,0.8)' }}
                        >
                          {constellation.name}
                        </text>
                      </g>
                    ))}
                    
                    {/* SVG Filters */}
                    <defs>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                  </svg>
                )}

                {/* Exoplanets overlay */}
                {exoplanets.map((planet) => {
                  const colors = getStatusColor(planet.status);
                  const isHovered = hoveredPlanet?.id === planet.id;
                  
                  return (
                    <div
                      key={planet.id}
                      className="absolute cursor-pointer group z-30"
                      style={{ 
                        left: `${planet.x}%`, 
                        top: `${planet.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      onMouseEnter={() => setHoveredPlanet(planet)}
                      onMouseLeave={() => setHoveredPlanet(null)}
                      onClick={() => handlePlanetClick(planet)}
                    >
                      {/* Outer glow ring */}
                      <div 
                        className={`absolute top-1/2 left-1/2 w-10 h-10 rounded-full ${colors.bg} opacity-15 blur-lg transition-all duration-300 ${isHovered ? 'scale-150 opacity-25' : 'scale-100'}`}
                        style={{ transform: 'translate(-50%, -50%)' }}
                      />
                      
                      {/* Inner ring */}
                      <div 
                        className={`absolute top-1/2 left-1/2 w-6 h-6 rounded-full border-2 ${colors.border} opacity-40 transition-all duration-300 ${isHovered ? 'scale-125' : 'scale-100'}`}
                        style={{ transform: 'translate(-50%, -50%)' }}
                      />
                      
                      {/* Planet marker */}
                      <div 
                        className={`absolute top-1/2 left-1/2 w-4 h-4 rounded-full ${colors.bg} shadow-lg ${colors.shadow} transition-all duration-300 border-2 border-white/30 ${isHovered ? 'scale-125' : 'scale-100'}`}
                        style={{ transform: 'translate(-50%, -50%)' }}
                      />
                      
                      {/* Crosshair for precision */}
                      {isHovered && (
                        <>
                          <div 
                            className="absolute w-16 h-0.5 bg-white/40 top-1/2 left-1/2"
                            style={{ transform: 'translate(-50%, -50%)' }}
                          />
                          <div 
                            className="absolute w-0.5 h-16 bg-white/40 top-1/2 left-1/2"
                            style={{ transform: 'translate(-50%, -50%)' }}
                          />
                        </>
                      )}
                      
                      {/* Enhanced Tooltip */}
                      {isHovered && (
                        <div 
                          className="absolute bottom-full left-1/2 mb-4 px-5 py-3 bg-slate-900/98 backdrop-blur-md border border-slate-500/50 rounded-xl whitespace-nowrap z-50 shadow-2xl"
                          style={{ transform: 'translateX(-50%)' }}
                        >
                          <div className="text-white font-bold text-base mb-1">{planet.name}</div>
                          <div className="flex items-center gap-2 text-xs">
                            <span className={`px-2 py-0.5 rounded-full ${colors.bg} bg-opacity-30 border ${colors.border}`}>
                              {getStatusLabel(planet.status)}
                            </span>
                            <span className="text-slate-400">|</span>
                            <span className="text-slate-300">{planet.distance} años luz</span>
                          </div>
                          <div className="text-slate-400 text-xs mt-1">{planet.type}</div>
                          <div 
                            className="absolute bottom-0 left-1/2 rotate-45 w-2.5 h-2.5 bg-slate-900 border-r border-b border-slate-500/50"
                            style={{ transform: 'translateX(-50%) translateY(50%) rotate(45deg)' }}
                          ></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              {/* Enhanced Legend */}
              <div className="mt-8 space-y-4">
                <div className="flex flex-wrap gap-6 justify-center items-center py-4 px-6 bg-slate-800/20 rounded-xl border border-slate-700/30">
                  <div className="text-slate-300 font-semibold">Estado de Exoplanetas:</div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50 border-2 border-white/30" />
                    <span className="text-slate-300 text-sm">Confirmados</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-amber-400 shadow-lg shadow-amber-400/50 border-2 border-white/30" />
                    <span className="text-slate-300 text-sm">Candidatos</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-rose-400 shadow-lg shadow-rose-400/50 border-2 border-white/30" />
                    <span className="text-slate-300 text-sm">Falsos Positivos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

            {/* Statistics Card */}
            <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/30 shadow-2xl shadow-black/40">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Estadísticas</h2>
                <p className="text-slate-400">Resumen del análisis universal</p>
              </div>

              <div className="space-y-4">
                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300 font-semibold">Confirmados</span>
                    <span className="text-3xl font-bold text-emerald-400">
                      {exoplanets.filter(p => p.status === 'confirmed').length}
                    </span>
                  </div>
                  <div className="text-slate-400 text-sm">Exoplanetas verificados</div>
                </div>

                <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300 font-semibold">Candidatos</span>
                    <span className="text-3xl font-bold text-amber-400">
                      {exoplanets.filter(p => p.status === 'candidate').length}
                    </span>
                  </div>
                  <div className="text-slate-400 text-sm">En proceso de análisis</div>
                </div>

                <div className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300 font-semibold">Falsos Positivos</span>
                    <span className="text-3xl font-bold text-rose-400">
                      {exoplanets.filter(p => p.status === 'false_positive').length}
                    </span>
                  </div>
                  <div className="text-slate-400 text-sm">Señales descartadas</div>
                </div>

                <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6 mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300 font-semibold">Total Analizado</span>
                    <span className="text-3xl font-bold text-blue-400">{exoplanets.length}</span>
                  </div>
                  <div className="text-slate-400 text-sm">Objetos procesados</div>
                </div>
              </div>
            </div>

          {/* Exoplanets List Card */}
          <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/30 shadow-2xl shadow-black/40 mb-20">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Exoplanetas Analizados</h2>
              <p className="text-slate-400">Click en cualquier exoplaneta para ver sus detalles</p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700/30">
                    <th className="text-left text-slate-400 font-semibold py-4 px-4">Nombre</th>
                    <th className="text-left text-slate-400 font-semibold py-4 px-4">Estado</th>
                    <th className="text-left text-slate-400 font-semibold py-4 px-4">Distancia (años luz)</th>
                    <th className="text-left text-slate-400 font-semibold py-4 px-4">Tipo</th>
                    <th className="text-left text-slate-400 font-semibold py-4 px-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {exoplanets.map((planet) => {
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
                        <td className="py-4 px-4 text-slate-300">{planet.type}</td>
                        <td className="py-4 px-4">
                          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </td>
                      </tr>
                    );
                  })}
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
      `}</style>
    </div>
  );
};

export default Home;

