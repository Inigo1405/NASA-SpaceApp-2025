import { useState } from 'react';

const Predict = () => {
     const [formData, setFormData] = useState({
          planetName: '',
          orbitalPeriod: '',
          transitDuration: '',
          impactParameter: '',
          transitDepth: '',
          planetaryRadius: '',
          stellarSurfaceGravity: '',
          orbitSemiMajorAxis: '',
          stellarMetallicity: '',
          stellarRadius: '',
          stellarEffectiveTemperature: '',
          stellarNoiseRatio: ''
     });

     const [isLoading, setIsLoading] = useState(false);
     const [result, setResult] = useState<any>(null);

     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value } = e.target;
          setFormData(prev => ({
               ...prev,
               [name]: value
          }));
     };

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          setIsLoading(true);
          
          // Aquí irá la llamada a la API
          setTimeout(() => {
               setIsLoading(false);
               setResult({
                    prediction: 'Confirmed',
                    confidence: 0.87,
                    habitabilityIndex: 0.75
               });
          }, 2000);
     };

     const handleReset = () => {
          setFormData({
               planetName: '',
               orbitalPeriod: '',
               transitDuration: '',
               impactParameter: '',
               transitDepth: '',
               planetaryRadius: '',
               stellarSurfaceGravity: '',
               orbitSemiMajorAxis: '',
               stellarMetallicity: '',
               stellarRadius: '',
               stellarEffectiveTemperature: '',
               stellarNoiseRatio: ''
          });
          setResult(null);
     };

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
                    <div className="max-w-6xl mx-auto">
                         {/* Header */}
                         <div className="text-center mb-8">
                              <div className="flex items-center justify-center space-x-3 mb-4">
                                   <div className="w-3 h-3 rounded-full bg-blue-400 shadow-lg shadow-blue-400/50 animate-pulse" />
                                   <h1 className="text-4xl md:text-5xl font-bold text-white">
                                        Predicción de Exoplanetas
                                   </h1>
                                   <div className="w-3 h-3 rounded-full bg-purple-400 shadow-lg shadow-purple-400/50 animate-pulse" 
                                        style={{ animationDelay: '0.5s' }} />
                              </div>
                              <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                                   Ingresa los parámetros observacionales para predecir las características y habitabilidad de un exoplaneta
                              </p>
                         </div>

                         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                              {/* Form Section */}
                              <div className="lg:col-span-2">
                                   <form onSubmit={handleSubmit} className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/30 shadow-2xl shadow-black/40">
                                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                             <svg className="w-6 h-6 mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                             </svg>
                                             Parámetros del Planeta
                                        </h2>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                             {/* Planet Name */}
                                             <div className="md:col-span-2">
                                                  <label className="block text-slate-300 text-sm font-semibold mb-2">
                                                       Nombre del Exoplaneta
                                                  </label>
                                                  <input
                                                       type="text"
                                                       name="planetName"
                                                       value={formData.planetName}
                                                       onChange={handleChange}
                                                       placeholder="Ej: Kepler-452b"
                                                       className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                                                  />
                                             </div>

                                             {/* koi_period - Orbital Period (days) */}
                                             <div>
                                                  <label className="block text-slate-300 text-sm font-semibold mb-2">
                                                       Período Orbital (días)
                                                  </label>
                                                  <input
                                                       type="number"
                                                       name="orbitalPeriod"
                                                       value={formData.orbitalPeriod}
                                                       onChange={handleChange}
                                                       placeholder="385"
                                                       step="0.01"
                                                       className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                                                  />
                                             </div>

                                             {/* koi_duration - Transit Duration (hours) */}
                                             <div>
                                                  <label className="block text-slate-300 text-sm font-semibold mb-2">
                                                       Duración del Tránsito (horas)
                                                  </label>
                                                  <input
                                                       type="number"
                                                       name="transitDuration"
                                                       value={formData.transitDuration}
                                                       onChange={handleChange}
                                                       placeholder="8.5"
                                                       step="0.01"
                                                       className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                                                  />
                                             </div>

                                             {/* koi_impact - Impact Parameter */}
                                             <div>
                                                  <label className="block text-slate-300 text-sm font-semibold mb-2">
                                                       Parámetro de impacto
                                                  </label>
                                                  <input
                                                       type="number"
                                                       name="impactParameter"
                                                       value={formData.impactParameter}
                                                       onChange={handleChange}
                                                       placeholder="0.5"
                                                       step="0.01"
                                                       className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                                                  />
                                             </div>

                                             {/* koi_depth - Transit Depth (parts per million)*/}
                                             <div>
                                                  <label className="block text-slate-300 text-sm font-semibold mb-2">
                                                       Profundidad del Tránsito (ppm)
                                                  </label>
                                                  <input
                                                       type="number"
                                                       name="transitDepth"
                                                       value={formData.transitDepth}
                                                       onChange={handleChange}
                                                       placeholder="1200"
                                                       step="0.01"
                                                       className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                                                  />
                                             </div>

                                             {/* koi_prad - Planetary Radius (Earth radii) */}
                                             <div>
                                                  <label className="block text-slate-300 text-sm font-semibold mb-2">
                                                       Radio Planetario (× Tierra)
                                                  </label>
                                                  <input
                                                       type="number"
                                                       name="planetaryRadius"
                                                       value={formData.planetaryRadius}
                                                       onChange={handleChange}
                                                       placeholder="1.6"
                                                       step="0.01"
                                                       className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                                                  />
                                             </div>

                                             {/* koi_slogg - Stellar Surface Gravity (log10(cm s-2)) */}
                                             <div>
                                                  <label className="block text-slate-300 text-sm font-semibold mb-2">
                                                       Gravedad de la superficie estelar (log10(cm s-2))
                                                  </label>
                                                  <input
                                                       type="number"
                                                       name="stellarSurfaceGravity"
                                                       value={formData.stellarSurfaceGravity}
                                                       onChange={handleChange}
                                                       placeholder="4.5"
                                                       step="0.01"
                                                       className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all"
                                                  />
                                             </div>

                                             {/* koi_sma - Orbit Semi-Major Axis (Astronomical Unit (au)) */}
                                             <div>
                                                  <label className="block text-slate-300 text-sm font-semibold mb-2">
                                                       Semieje mayor de la órbita (AU)
                                                  </label>
                                                  <input
                                                       type="number"
                                                       name="orbitSemiMajorAxis"
                                                       value={formData.orbitSemiMajorAxis}
                                                       onChange={handleChange}
                                                       placeholder="1.0"
                                                       step="0.01"
                                                       className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                                                  />
                                             </div>

                                             {/* koi_smet - Stellar Metallicity */}
                                             <div>
                                                  <label className="block text-slate-300 text-sm font-semibold mb-2">
                                                       Metalicidad estelar
                                                  </label>
                                                  <input
                                                       type="number"
                                                       name="stellarMetallicity"
                                                       value={formData.stellarMetallicity}
                                                       onChange={handleChange}
                                                       placeholder="0.0"
                                                       step="0.01"
                                                       className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                                                  />
                                             </div>

                                             {/* koi_srad - Stellar Radius (solar radii) */}
                                             <div>
                                                  <label className="block text-slate-300 text-sm font-semibold mb-2">
                                                       Radio estelar (solar radii)
                                                  </label>
                                                  <input
                                                       type="number"
                                                       name="stellarRadius"
                                                       value={formData.stellarRadius}
                                                       onChange={handleChange}
                                                       placeholder="1.1"
                                                       step="0.01"
                                                       className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all"
                                                  />
                                             </div>

                                             {/* koi_steff - Stellar Effective Temperature (Kelvin) */}
                                             <div>
                                                  <label className="block text-slate-300 text-sm font-semibold mb-2">
                                                       Temperatura efectiva estelar (K)
                                                  </label>
                                                  <input
                                                       type="number"
                                                       name="stellarEffectiveTemperature"
                                                       value={formData.stellarEffectiveTemperature}
                                                       onChange={handleChange}
                                                       placeholder="5778"
                                                       step="1"
                                                       className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all"
                                                  />
                                             </div>

                                             {/* koi_snr - Stellar Noise Ratio */}
                                             <div>
                                                  <label className="block text-slate-300 text-sm font-semibold mb-2">
                                                       Relación de Ruido Estelar (SNR)
                                                  </label>
                                                  <input
                                                       type="number"
                                                       name="stellarNoiseRatio"
                                                       value={formData.stellarNoiseRatio}
                                                       onChange={handleChange}
                                                       placeholder="15.0"
                                                       step="0.1"
                                                       className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all"
                                                  />
                                             </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex flex-col sm:flex-row gap-4 mt-8">
                                             <button
                                                  type="submit"
                                                  disabled={isLoading}
                                                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                                             >
                                                  {isLoading ? (
                                                       <>
                                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                            <span>Procesando...</span>
                                                       </>
                                                  ) : (
                                                       <>
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                            </svg>
                                                            <span>Predecir</span>
                                                       </>
                                                  )}
                                             </button>
                                             <button
                                                  type="button"
                                                  onClick={handleReset}
                                                  className="bg-slate-700/50 text-white font-semibold py-4 px-6 rounded-xl hover:bg-slate-600/50 transition-all border border-slate-600/50 flex items-center justify-center space-x-2"
                                             >
                                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                  </svg>
                                                  <span>Limpiar</span>
                                             </button>
                                        </div>
                                   </form>
                              </div>

                              {/* Results Section */}
                              <div className="space-y-6">
                                   {/* Info Card */}
                                   <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/30 shadow-2xl shadow-black/40">
                                        <div className="flex items-start space-x-3 mb-4">
                                             <svg className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                             </svg>
                                             <div>
                                                  <h3 className="text-white font-semibold mb-2">Información</h3>
                                                  <p className="text-slate-400 text-sm leading-relaxed">
                                                       Completa los campos del formulario con los datos observacionales del exoplaneta para obtener una predicción basada en machine learning.
                                                  </p>
                                             </div>
                                        </div>
                                   </div>

                                   {/* Results Display */}
                                   {result && (
                                        <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/30 shadow-2xl shadow-black/40 animate-fade-in">
                                             <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                                                  <svg className="w-5 h-5 mr-2 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                                                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                  </svg>
                                                  Resultados
                                             </h3>
                                             
                                             <div className="space-y-4">
                                                  <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
                                                       <div className="text-slate-400 text-xs mb-1">Predicción</div>
                                                       <div className="text-emerald-400 text-lg font-bold">{result.prediction}</div>
                                                  </div>
                                                  
                                                  <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4">
                                                       <div className="text-slate-400 text-xs mb-1">Confianza</div>
                                                       <div className="text-blue-400 text-lg font-bold">{(result.confidence * 100).toFixed(1)}%</div>
                                                  </div>
                                                  
                                                  <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-4">
                                                       <div className="text-slate-400 text-xs mb-1">Índice de Habitabilidad</div>
                                                       <div className="text-purple-400 text-lg font-bold">{result.habitabilityIndex}</div>
                                                  </div>
                                             </div>
                                        </div>
                                   )}
                              </div>
                         </div>
                    </div>
               </div>

               {/* CSS Animations */}
               <style>{`
                    @keyframes fade-in {
                         from {
                              opacity: 0;
                              transform: translateY(10px);
                         }
                         to {
                              opacity: 1;
                              transform: translateY(0);
                         }
                    }
                    
                    .animate-fade-in {
                         animation: fade-in 0.5s ease-out;
                    }

                    /* Ocultar las flechas de los inputs numéricos */
                    input[type="number"]::-webkit-inner-spin-button,
                    input[type="number"]::-webkit-outer-spin-button {
                         -webkit-appearance: none;
                         margin: 0;
                    }
                    
                    input[type="number"] {
                         -moz-appearance: textfield;
                         appearance: textfield;
                    }
               `}</style>
          </div>
     );
}
 
export default Predict;