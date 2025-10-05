

import { useMemo } from 'react';

const About = () => {
  // Generar estrellas del fondo solo una vez
  const backgroundStars = useMemo(() => {
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
    <div className="relative min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 overflow-hidden">
      {/* Enhanced Stars Background */}
      <div className="absolute inset-0">
        {backgroundStars.map((star, i) => (
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

      {/* Content Section */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/50">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Acerca de <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">EXOD-IA</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Explorando el universo con inteligencia artificial para descubrir nuevos mundos
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Mission Card */}
            <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/30 shadow-2xl shadow-black/40 hover:border-purple-500/30 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">Nuestra Misión</h2>
              </div>
              <p className="text-slate-300 leading-relaxed mb-4">
                EXOD-IA es un proyecto innovador que combina la potencia de la inteligencia artificial con los datos astronómicos de las misiones Kepler y TESS para identificar y clasificar exoplanetas.
              </p>
              <p className="text-slate-300 leading-relaxed">
                Nuestro objetivo es democratizar el descubrimiento de exoplanetas, permitiendo a investigadores y entusiastas acceder a análisis avanzados de manera intuitiva y visual.
              </p>
            </div>

            {/* Technology Card */}
            <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/30 shadow-2xl shadow-black/40 hover:border-indigo-500/30 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">Tecnología</h2>
              </div>
              <p className="text-slate-300 leading-relaxed mb-4">
                Utilizamos algoritmos de aprendizaje profundo entrenados con miles de curvas de luz para detectar patrones que indican la presencia de exoplanetas mediante el método de tránsito.
              </p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 mr-3"></div>
                  <span className="text-slate-400">Redes Neuronales Convolucionales</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-amber-400 mr-3"></div>
                  <span className="text-slate-400">Análisis de Curvas de Luz</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mr-3"></div>
                  <span className="text-slate-400">Visualización de Datos Astronómicos</span>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Feature 1 */}
            <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/30 shadow-xl shadow-black/30 text-center hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Análisis Preciso</h3>
              <p className="text-slate-400 text-sm">
                Alta precisión en la clasificación de exoplanetas confirmados y candidatos
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/30 shadow-xl shadow-black/30 text-center hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Visualización Intuitiva</h3>
              <p className="text-slate-400 text-sm">
                Mapas estelares interactivos y gráficos detallados de curvas de luz
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/30 shadow-xl shadow-black/30 text-center hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Datos Reales</h3>
              <p className="text-slate-400 text-sm">
                Información actualizada de las misiones Kepler y TESS de la NASA
              </p>
            </div>
          </div>

          {/* Impact Section */}
          <div className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20 shadow-2xl shadow-purple-500/10">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Impacto del Proyecto</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-4 mt-1">
                  <span className="text-purple-400 font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Accesibilidad Científica</h3>
                  <p className="text-slate-300 text-sm">
                    Facilitamos el acceso a herramientas de análisis avanzadas para estudiantes, investigadores y entusiastas de la astronomía.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center mr-4 mt-1">
                  <span className="text-indigo-400 font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Educación e Inspiración</h3>
                  <p className="text-slate-300 text-sm">
                    Inspiramos a la próxima generación de científicos mostrando cómo la IA puede revolucionar la astronomía.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-4 mt-1">
                  <span className="text-purple-400 font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Descubrimiento Colaborativo</h3>
                  <p className="text-slate-300 text-sm">
                    Promovemos la colaboración entre científicos ciudadanos y profesionales en el descubrimiento de nuevos mundos.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center mr-4 mt-1">
                  <span className="text-indigo-400 font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Innovación Tecnológica</h3>
                  <p className="text-slate-300 text-sm">
                    Demostramos el poder de la inteligencia artificial aplicada a la exploración espacial y el análisis de big data.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;