import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const PlanetInformation = () => {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  const { t } = useTranslation();
  
  const navigate = useNavigate();
  const { telescope, name } = useParams();
  const [planet, setPlanet] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getEndpoint = (telescope: string | undefined, planetName: string | undefined) => {
    switch(telescope?.toLowerCase()) {
      case 'kepler':
        return `/kepler/${encodeURIComponent(planetName || '')}`;
      case 'k2':
        return `/k2/${encodeURIComponent(planetName || '')}`;
      case 'tess':
        return `/tess/${encodeURIComponent(planetName || '')}`;
      default:
        return null;
    }
  };

  const getStatus = (data: any, telescope: string | undefined) => {
    if (telescope === 'kepler') {
      const disposition = data.koi_disposition;
      if (disposition === 'CONFIRMED') return 'confirmed';
      if (disposition === 'CANDIDATE') return 'candidate';
      if (disposition === 'FALSE POSITIVE') return 'false_positive';
      return 'unknown';
    }
    if (telescope === 'tess') {
      const disposition = data.tfopwg_disp;
      if (disposition === 'PC' || disposition === 'CP') return 'confirmed';
      if (disposition === 'FP') return 'false_positive';
      return 'candidate';
    }
    return 'confirmed';
  };

  useEffect(() => {
    const fetchPlanetData = async () => {
      if (!telescope || !name) {
        setError('Parámetros inválidos');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const endpoint = getEndpoint(telescope, name);
        if (!endpoint) {
          setError('Telescopio no válido');
          setIsLoading(false);
          return;
        }

        const response = await axios.get(endpoint);
        console.log('Planet data:', response.data);
        
        const data = response.data;
        const formattedPlanet = {
          name: name,
          telescope: telescope,
          status: getStatus(data, telescope),
          rawData: data,
          ...(telescope === 'kepler' && {
            kepid: data.kepid,
            kepoiName: data.kepoi_name,
            keplerName: data.kepler_name,
            disposition: data.koi_disposition,
            pdisposition: data.koi_pdisposition,
            koiScore: data.koi_score,
            // Parámetros orbitales
            period: data.koi_period,
            time0bk: data.koi_time0bk,
            impact: data.koi_impact,
            sma: data.koi_sma,
            eccen: data.koi_eccen,
            incl: data.koi_incl,
            dor: data.koi_dor,
            ror: data.koi_ror,
            // Parámetros planetarios
            duration: data.koi_duration,
            depth: data.koi_depth,
            prad: data.koi_prad,
            teq: data.koi_teq,
            insol: data.koi_insol,
            // Parámetros estelares
            steff: data.koi_steff,
            slogg: data.koi_slogg,
            srad: data.koi_srad,
            smass: data.koi_smass,
            smet: data.koi_smet,
            kepmag: data.koi_kepmag,
            // Coordenadas
            ra: data.ra,
            dec: data.dec
          }),
          ...(telescope === 'k2' && {
            plName: data.pl_name,
            hostname: data.hostname,
            epicHostname: data.epic_hostname,
            ticId: data.tic_id,
            gaiaId: data.gaia_id,
            disposition: data.disposition,
            discoveryMethod: data.discoverymethod,
            discYear: data.disc_year,
            // Órbita y tránsito
            plOrbper: data.pl_orbper,
            plRade: data.pl_rade,
            plRadj: data.pl_radj,
            plTrandep: data.pl_trandep,
            plTrandur: data.pl_trandur,
            plTranmid: data.pl_tranmid,
            plImppar: data.pl_imppar,
            // Estrella
            stTeff: data.st_teff,
            stRad: data.st_rad,
            stMass: data.st_mass,
            stMet: data.st_met,
            stLogg: data.st_logg,
            // Sistema
            syDist: data.sy_dist,
            syVmag: data.sy_vmag,
            syKmag: data.sy_kmag,
            syJmag: data.sy_jmag,
            syHmag: data.sy_hmag,
            syGaiamag: data.sy_gaiamag,
            // Coordenadas
            ra: data.ra,
            dec: data.dec
          }),
          ...(telescope === 'tess' && {
            toi: data.toi,
            tid: data.tid,
            ctoiAlias: data.ctoi_alias,
            disposition: data.tfopwg_disp,
            // Datos planetarios
            plPnum: data.pl_pnum,
            plOrbper: data.pl_orbper,
            plRade: data.pl_rade,
            plEqt: data.pl_eqt,
            plInsol: data.pl_insol,
            plTrandep: data.pl_trandep,
            plTrandurh: data.pl_trandurh,
            plTranmid: data.pl_tranmid,
            plImppar: data.pl_imppar,
            plOrbsmax: data.pl_orbsmax,
            // Datos estelares
            stTeff: data.st_teff,
            stRad: data.st_rad,
            stMass: data.st_mass,
            stMet: data.st_met,
            stLogg: data.st_logg,
            stDist: data.st_dist,
            stTmag: data.st_tmag,
            stPmra: data.st_pmra,
            stPmdec: data.st_pmdec,
            // Coordenadas
            ra: data.ra,
            dec: data.dec,
            rastr: data.rastr,
            decstr: data.decstr
          })
        };

        setPlanet(formattedPlanet);
      } catch (error: any) {
        console.error('Error fetching planet data:', error);
        setError(error.response?.data?.message || 'Error al cargar los datos del planeta');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlanetData();
  }, [telescope, name]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'confirmed': return { 
        bg: 'bg-emerald-400', shadow: 'shadow-emerald-400/50', 
        border: 'border-emerald-500', glow: 'bg-emerald-500/5',
        borderGlow: 'border-emerald-500/20'
      };
      case 'candidate': return { 
        bg: 'bg-amber-400', shadow: 'shadow-amber-400/50', 
        border: 'border-amber-500', glow: 'bg-amber-500/5',
        borderGlow: 'border-amber-500/20'
      };
      case 'false_positive': return { 
        bg: 'bg-rose-400', shadow: 'shadow-rose-400/50', 
        border: 'border-rose-500', glow: 'bg-rose-500/5',
        borderGlow: 'border-rose-500/20'
      };
      default: return { 
        bg: 'bg-slate-400', shadow: 'shadow-slate-400/50', 
        border: 'border-slate-500', glow: 'bg-slate-500/5',
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl mb-4">{t('planetInformation.loading')}</div>
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error || !planet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-red-400 text-xl mb-4">{error || t('planetInformation.error')}</div>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            {t('planetInformation.backToHome')}
          </button>
        </div>
      </div>
    );
  }

  const colors = getStatusColor(planet.status);

  // --- ANIMACIÓN Y VISUALIZACIÓN DIDÁCTICA ---
  // Parámetros visuales según misión
  let period, prad, starRad, starTeff, transitDepth, transitDur, planetName, starName;
  if (telescope === 'kepler') {
    period = planet.period;
    prad = planet.prad;
    starRad = planet.srad;
    starTeff = planet.steff;
    transitDepth = planet.depth;
    transitDur = planet.duration;
    planetName = planet.keplerName || planet.kepoiName || planet.name;
    starName = planet.kepid;
  } else if (telescope === 'k2') {
    period = planet.plOrbper;
    prad = planet.plRade;
    starRad = planet.stRad;
    starTeff = planet.stTeff;
    transitDepth = planet.plTrandep;
    transitDur = planet.plTrandur;
    planetName = planet.plName || planet.name;
    starName = planet.hostname;
  } else if (telescope === 'tess') {
    period = planet.plOrbper;
    prad = planet.plRade;
    starRad = planet.stRad;
    starTeff = planet.stTeff;
    transitDepth = planet.plTrandep;
    transitDur = planet.plTrandurh;
    planetName = planet.toi || planet.name;
    starName = planet.tid;
  }

  // Cálculo de color de estrella según temperatura
  function getStarColor(teff: number | undefined): string {
    if (!teff) return '#fbbf24';
    if (teff > 7000) return '#60a5fa'; // azul
    if (teff > 6000) return '#fbbf24'; // amarillo
    if (teff > 5000) return '#f59e42'; // naranja
    return '#f87171'; // rojo
  }

  // Tamaños relativos
  const starRadiusPx = starRad ? Math.max(18, Math.min(40, starRad * 18)) : 24;
  const planetRadiusPx = prad ? Math.max(7, Math.min(18, prad * 4)) : 10;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 overflow-hidden">
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div key={i} className="absolute bg-white rounded-full animate-pulse"
            style={{
              width: Math.random() > 0.8 ? '2px' : '1px',
              height: Math.random() > 0.8 ? '2px' : '1px',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.6 + 0.2,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 2}s`,
            }} />
        ))}
      </div>

      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />

      <div className="relative z-10 min-h-screen px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <div className="max-w-7xl mx-auto">
          <button onClick={() => navigate(-1)} className="mb-6 flex items-center space-x-2 text-slate-400 hover:text-white transition-colors group">
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>{t('planetInformation.backButton')}</span>
          </button>

          {/* HEADER CON INFORMACIÓN BÁSICA */}
          <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/30 shadow-2xl shadow-black/40 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-3">
                  <div className={`w-4 h-4 rounded-full ${colors.bg} shadow-lg ${colors.shadow} animate-pulse`} style={{ animationDuration: '3s' }} />
                  <h1 className="text-4xl md:text-5xl font-bold text-white">{planetName || planet.name}</h1>
                </div>
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${colors.bg} bg-opacity-20 border ${colors.border} border-opacity-30`}>
                    {getStatusLabel(planet.status)}
                  </span>
                  <span className="px-4 py-2 rounded-full text-sm font-semibold bg-blue-400 bg-opacity-20 border border-blue-500 border-opacity-30 text-blue-300">
                    {telescope?.toUpperCase()}
                  </span>
                </div>
                <p className="text-slate-300 text-lg leading-relaxed">
                  {t('planetInformation.discoveredBy', { telescope: telescope?.toUpperCase(), star: starName })}
                </p>
              </div>
            </div>
          </div>

          {/* VISUALIZACIÓN EDUCATIVA */}
          <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/30 shadow-2xl shadow-black/40 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">{t('planetInformation.visualizations.title')}</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* VISTA ORBITAL */}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white mb-4">{t('planetInformation.visualizations.orbitalView')}</h3>
                <svg width="280" height="180" viewBox="0 0 280 180" className="mx-auto">
                  {/* Fondo del espacio */}
                  <rect width="280" height="180" fill="#0f172a" rx="8" />
                  
                  {/* Path invisible para la animación */}
                  <defs>
                    <path id="orbit-path" d="M 140 55 A 80 35 0 1 1 139.9 55" />
                  </defs>
                  
                  {/* Línea de la órbita */}
                  <ellipse cx="140" cy="90" rx="80" ry="35" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4,2" opacity="0.6" />
                  
                  {/* Estrella en el centro */}
                  <circle cx="140" cy="90" r={starRadiusPx} fill={getStarColor(starTeff)} stroke="#fbbf24" strokeWidth="2">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      values="0 140 90;360 140 90"
                      dur="10s"
                      repeatCount="indefinite" />
                  </circle>
                  
                  {/* Planeta orbitando */}
                  <circle r={planetRadiusPx} fill="#3b82f6" stroke="#60a5fa" strokeWidth="2">
                    <animateMotion dur={`${period ? Math.max(3, period / 2) : 5}s`} repeatCount="indefinite">
                      <mpath href="#orbit-path" />
                    </animateMotion>
                  </circle>
                  
                  {/* Etiquetas */}
                  <text x="140" y="90" textAnchor="middle" dy="4" fontSize="10" fill="#fbbf24" fontWeight="bold">★</text>
                  <text x="140" y="25" textAnchor="middle" fontSize="12" fill="#94a3b8">Estrella {starName}</text>
                  <text x="140" y="40" textAnchor="middle" fontSize="10" fill="#64748b">
                    {starTeff ? `${starTeff.toFixed(0)} K` : ''} {starRad ? `• ${starRad.toFixed(2)} R☉` : ''}
                  </text>
                </svg>
                
                <div className="mt-4 space-y-2">
                  <div className="text-sm text-slate-400">
                    <span className="text-blue-400">Planeta:</span> {planetName}
                  </div>
                  {period && (
                    <div className="text-sm text-slate-400">
                      <span className="text-green-400">Período:</span> {period.toFixed(2)} días terrestres
                    </div>
                  )}
                  {prad && (
                    <div className="text-sm text-slate-400">
                      <span className="text-purple-400">Tamaño:</span> {prad.toFixed(2)} veces el radio de la Tierra
                    </div>
                  )}
                </div>
              </div>

              {/* VISTA DE TRÁNSITO */}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white mb-4">{t('planetInformation.visualizations.transitMethod')}</h3>
                <div className="mb-2 text-slate-400 text-sm">
                  {t('planetInformation.visualizations.transitDescription')}
                </div>
                <svg width="280" height="180" viewBox="0 0 280 180" className="mx-auto">
                  {/* Fondo */}
                  <rect width="280" height="180" fill="#0f172a" rx="8" />
                  
                  {/* Estrella grande y brillante */}
                  <circle cx="140" cy="90" r="40" fill={getStarColor(starTeff)} opacity="0.9">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
                  </circle>
                  
                  {/* Planeta cruzando (animación de tránsito) */}
                  <circle r={Math.max(8, planetRadiusPx)} fill="#1e293b" stroke="#3b82f6" strokeWidth="2">
                    <animateTransform
                      attributeName="transform"
                      type="translate"
                      values="60 90;220 90;60 90"
                      dur="6s"
                      repeatCount="indefinite" />
                  </circle>
                  
                  {/* Gráfico de curva de luz */}
                  <g transform="translate(20, 140)">
                    <line x1="0" y1="0" x2="240" y2="0" stroke="#64748b" strokeWidth="1" />
                    <line x1="0" y1="-30" x2="0" y2="10" stroke="#64748b" strokeWidth="1" />
                    <text x="120" y="15" textAnchor="middle" fontSize="10" fill="#94a3b8">Tiempo</text>
                    <text x="-10" y="-15" textAnchor="middle" fontSize="8" fill="#94a3b8" transform="rotate(-90, -10, -15)">Brillo</text>
                    
                    {/* Curva de luz de tránsito: -----\_______/------------ */}
                    <path d="M10,-20 L90,-20 L100,-15 L110,0 L170,0 L180,-15 L190,-20 L230,-20" 
                          fill="none" stroke="#22d3ee" strokeWidth="2" opacity="0.8">
                      <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
                    </path>
                    
                    {/* Indicador del tránsito */}
                    <text x="140" y="5" textAnchor="middle" fontSize="8" fill="#22d3ee">Tránsito</text>
                    <line x1="140" y1="0" x2="140" y2="-5" stroke="#22d3ee" strokeWidth="1" markerEnd="url(#arrow)" />
                  </g>
                </svg>
                <div className="mt-4 space-y-2">
                  {transitDepth && (
                    <div className="text-sm text-slate-400">
                      <span className="text-cyan-400">Disminución del brillo:</span> {transitDepth.toFixed(2)} ppm
                    </div>
                  )}
                  {transitDur && (
                    <div className="text-sm text-slate-400">
                      <span className="text-yellow-400">Duración del tránsito:</span> {transitDur.toFixed(2)} horas
                    </div>
                  )}
                  <div className="text-xs text-slate-500 mt-2">
                    Así es como {telescope?.toUpperCase()} descubrió este planeta
                  </div>
                </div>
              </div>
            </div>
          </div>

          {telescope === 'kepler' && planet.kepid && (
            <div className="space-y-6">
              {/* Identificadores */}
              <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/30 shadow-2xl shadow-black/40">
                <h2 className="text-2xl font-bold text-white mb-6">Identificadores</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {planet.kepid && (
                    <div className={`${colors.glow} border ${colors.borderGlow} rounded-2xl p-6`}>
                      <div className="text-slate-400 text-sm mb-2">Kepler ID</div>
                      <div className="text-white text-xl font-bold">{planet.kepid}</div>
                    </div>
                  )}
                  {planet.kepoiName && (
                    <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">KOI Name</div>
                      <div className="text-white text-xl font-bold">{planet.kepoiName}</div>
                    </div>
                  )}
                  {planet.keplerName && (
                    <div className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Kepler Name</div>
                      <div className="text-white text-xl font-bold">{planet.keplerName}</div>
                    </div>
                  )}
                  {planet.koiScore !== undefined && planet.koiScore !== null && (
                    <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">KOI Score</div>
                      <div className="text-white text-xl font-bold">{planet.koiScore?.toFixed(2)}</div>
                    </div>
                  )}
                  {planet.pdisposition && (
                    <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Disposición Preliminar</div>
                      <div className="text-white text-lg font-bold">{planet.pdisposition}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Parámetros Orbitales */}
              <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/30 shadow-2xl shadow-black/40">
                <h2 className="text-2xl font-bold text-white mb-6">{t('planetInformation.sections.orbitalParameters')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {planet.period && (
                    <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Período Orbital</div>
                      <div className="text-white text-xl font-bold">{planet.period?.toFixed(5)} días</div>
                    </div>
                  )}
                  {planet.sma !== undefined && planet.sma !== null && (
                    <div className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Semi-eje Mayor</div>
                      <div className="text-white text-xl font-bold">{planet.sma?.toFixed(4)} AU</div>
                    </div>
                  )}
                  {planet.eccen !== undefined && planet.eccen !== null && (
                    <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Excentricidad</div>
                      <div className="text-white text-xl font-bold">{planet.eccen?.toFixed(3)}</div>
                    </div>
                  )}
                  {planet.incl !== undefined && planet.incl !== null && (
                    <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Inclinación</div>
                      <div className="text-white text-xl font-bold">{planet.incl?.toFixed(2)}°</div>
                    </div>
                  )}
                  {planet.impact !== undefined && planet.impact !== null && (
                    <div className="bg-violet-500/5 border border-violet-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Parámetro de Impacto</div>
                      <div className="text-white text-xl font-bold">{planet.impact?.toFixed(3)}</div>
                    </div>
                  )}
                  {planet.dor !== undefined && planet.dor !== null && (
                    <div className="bg-pink-500/5 border border-pink-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Distancia/Radio Estelar</div>
                      <div className="text-white text-xl font-bold">{planet.dor?.toFixed(2)}</div>
                    </div>
                  )}
                  {planet.ror !== undefined && planet.ror !== null && (
                    <div className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Radio Planetario/Estelar</div>
                      <div className="text-white text-xl font-bold">{planet.ror?.toFixed(6)}</div>
                    </div>
                  )}
                  {planet.time0bk !== undefined && planet.time0bk !== null && (
                    <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Época del Tránsito</div>
                      <div className="text-white text-xl font-bold">{planet.time0bk?.toFixed(3)} BKJD</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Características Planetarias */}
              <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/30 shadow-2xl shadow-black/40">
                <h2 className="text-2xl font-bold text-white mb-6">Características Planetarias</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {planet.prad && (
                    <div className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Radio Planetario</div>
                      <div className="text-white text-xl font-bold">{planet.prad?.toFixed(2)} R⊕</div>
                    </div>
                  )}
                  {planet.teq && (
                    <div className="bg-orange-500/5 border border-orange-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Temp. Equilibrio</div>
                      <div className="text-white text-xl font-bold">{planet.teq?.toFixed(0)} K</div>
                    </div>
                  )}
                  {planet.insol !== undefined && planet.insol !== null && (
                    <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Insolación</div>
                      <div className="text-white text-xl font-bold">{planet.insol?.toFixed(2)} S⊕</div>
                    </div>
                  )}
                  {planet.depth && (
                    <div className="bg-teal-500/5 border border-teal-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Profundidad Tránsito</div>
                      <div className="text-white text-xl font-bold">{planet.depth?.toFixed(1)} ppm</div>
                    </div>
                  )}
                  {planet.duration && (
                    <div className="bg-sky-500/5 border border-sky-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Duración Tránsito</div>
                      <div className="text-white text-xl font-bold">{planet.duration?.toFixed(3)} hrs</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Características Estelares */}
              <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/30 shadow-2xl shadow-black/40">
                <h2 className="text-2xl font-bold text-white mb-6">Características Estelares</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {planet.steff && (
                    <div className="bg-orange-500/5 border border-orange-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Temperatura Efectiva</div>
                      <div className="text-white text-xl font-bold">{planet.steff?.toFixed(0)} K</div>
                    </div>
                  )}
                  {planet.srad && (
                    <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Radio Estelar</div>
                      <div className="text-white text-xl font-bold">{planet.srad?.toFixed(3)} R☉</div>
                    </div>
                  )}
                  {planet.smass !== undefined && planet.smass !== null && (
                    <div className="bg-lime-500/5 border border-lime-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Masa Estelar</div>
                      <div className="text-white text-xl font-bold">{planet.smass?.toFixed(3)} M☉</div>
                    </div>
                  )}
                  {planet.slogg !== undefined && planet.slogg !== null && (
                    <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Log g</div>
                      <div className="text-white text-xl font-bold">{planet.slogg?.toFixed(3)}</div>
                    </div>
                  )}
                  {planet.smet !== undefined && planet.smet !== null && (
                    <div className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Metalicidad [Fe/H]</div>
                      <div className="text-white text-xl font-bold">{planet.smet?.toFixed(2)} dex</div>
                    </div>
                  )}
                  {planet.kepmag !== undefined && planet.kepmag !== null && (
                    <div className="bg-fuchsia-500/5 border border-fuchsia-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Magnitud Kepler</div>
                      <div className="text-white text-xl font-bold">{planet.kepmag?.toFixed(3)}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Coordenadas Celestes */}
              <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/30 shadow-2xl shadow-black/40">
                <h2 className="text-2xl font-bold text-white mb-6">Coordenadas Celestes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {planet.ra !== undefined && planet.ra !== null && (
                    <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Ascensión Recta</div>
                      <div className="text-white text-xl font-bold">{planet.ra?.toFixed(6)}°</div>
                    </div>
                  )}
                  {planet.dec !== undefined && planet.dec !== null && (
                    <div className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Declinación</div>
                      <div className="text-white text-xl font-bold">{planet.dec?.toFixed(6)}°</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {telescope === 'k2' && planet.hostname && (
            <div className="space-y-6">
              {/* Animación de órbita y tránsito */}
              <div className="flex justify-center mb-8">
                <svg width="220" height="120" viewBox="0 0 220 120">
                  {/* Órbita */}
                  <ellipse cx="110" cy="60" rx="80" ry="35" fill="none" stroke="#38bdf8" strokeWidth="2" />
                  {/* Estrella */}
                  <circle cx="110" cy="60" r={planet.stRad ? Math.max(12, planet.stRad * 8) : 16} fill="url(#starGradient)" />
                  <defs>
                    <radialGradient id="starGradient">
                      <stop offset="0%" stopColor="#fffbe6" />
                      <stop offset="100%" stopColor="#fbbf24" />
                    </radialGradient>
                  </defs>
                  {/* Planeta animado */}
                  <circle
                    cx={110 + 80 * Math.cos(Date.now() / (planet.plOrbper ? 500 * planet.plOrbper : 2000))}
                    cy={60 + 35 * Math.sin(Date.now() / (planet.plOrbper ? 500 * planet.plOrbper : 2000))}
                    r={planet.plRade ? Math.max(6, planet.plRade * 2.5) : 8}
                    fill="#38bdf8"
                    stroke="#0ea5e9"
                    strokeWidth="2"
                    style={{ transition: 'all 0.2s linear' }}
                  />
                </svg>
              </div>

              {/* Identificadores */}
              <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/30 shadow-2xl shadow-black/40">
                <h2 className="text-2xl font-bold text-white mb-6">Identificadores</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {planet.plName && (
                    <div className={`${colors.glow} border ${colors.borderGlow} rounded-2xl p-6`}>
                      <div className="text-slate-400 text-sm mb-2">Nombre Planeta</div>
                      <div className="text-white text-xl font-bold">{planet.plName}</div>
                    </div>
                  )}
                  {planet.hostname && (
                    <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Estrella</div>
                      <div className="text-white text-xl font-bold">{planet.hostname}</div>
                    </div>
                  )}
                  {planet.epicHostname && (
                    <div className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">EPIC Hostname</div>
                      <div className="text-white text-xl font-bold">{planet.epicHostname}</div>
                    </div>
                  )}
                  {planet.ticId && (
                    <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">TIC ID</div>
                      <div className="text-white text-xl font-bold">{planet.ticId}</div>
                    </div>
                  )}
                  {planet.gaiaId && (
                    <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Gaia ID</div>
                      <div className="text-white text-xl font-bold">{planet.gaiaId}</div>
                    </div>
                  )}
                  {planet.disposition && (
                    <div className="bg-violet-500/5 border border-violet-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Disposición</div>
                      <div className="text-white text-xl font-bold">{planet.disposition}</div>
                    </div>
                  )}
                  {planet.discoveryMethod && (
                    <div className="bg-pink-500/5 border border-pink-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Método Descubrimiento</div>
                      <div className="text-white text-xl font-bold">{planet.discoveryMethod}</div>
                    </div>
                  )}
                  {planet.discYear && (
                    <div className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Año Descubrimiento</div>
                      <div className="text-white text-xl font-bold">{planet.discYear}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Órbita y Tránsito */}
              <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/30 shadow-2xl shadow-black/40">
                <h2 className="text-2xl font-bold text-white mb-6">{t('planetInformation.sections.orbitAndTransit')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {planet.plOrbper && (
                    <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Período Orbital</div>
                      <div className="text-white text-xl font-bold">{planet.plOrbper?.toFixed(5)} días</div>
                    </div>
                  )}
                  {planet.plRade && (
                    <div className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Radio Planetario</div>
                      <div className="text-white text-xl font-bold">{planet.plRade?.toFixed(2)} R⊕</div>
                    </div>
                  )}
                  {planet.plRadj && (
                    <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Radio (Júpiter)</div>
                      <div className="text-white text-xl font-bold">{planet.plRadj?.toFixed(4)} Rj</div>
                    </div>
                  )}
                  {planet.plTrandep && (
                    <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Profundidad Tránsito</div>
                      <div className="text-white text-xl font-bold">{planet.plTrandep?.toFixed(3)} ppt</div>
                    </div>
                  )}
                  {planet.plTrandur && (
                    <div className="bg-violet-500/5 border border-violet-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Duración Tránsito</div>
                      <div className="text-white text-xl font-bold">{planet.plTrandur?.toFixed(4)} hrs</div>
                    </div>
                  )}
                  {planet.plTranmid && (
                    <div className="bg-pink-500/5 border border-pink-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Época Tránsito</div>
                      <div className="text-white text-xl font-bold">{planet.plTranmid?.toFixed(4)}</div>
                    </div>
                  )}
                  {planet.plImppar !== undefined && planet.plImppar !== null && (
                    <div className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Parámetro de Impacto</div>
                      <div className="text-white text-xl font-bold">{planet.plImppar?.toFixed(3)}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Estrella */}
              <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/30 shadow-2xl shadow-black/40">
                <h2 className="text-2xl font-bold text-white mb-6">{t('planetInformation.sections.stellarCharacteristics')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {planet.stTeff && (
                    <div className="bg-orange-500/5 border border-orange-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Temperatura Efectiva</div>
                      <div className="text-white text-xl font-bold">{planet.stTeff?.toFixed(0)} K</div>
                    </div>
                  )}
                  {planet.stRad && (
                    <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Radio Estelar</div>
                      <div className="text-white text-xl font-bold">{planet.stRad?.toFixed(3)} R☉</div>
                    </div>
                  )}
                  {planet.stMass !== undefined && planet.stMass !== null && (
                    <div className="bg-lime-500/5 border border-lime-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Masa Estelar</div>
                      <div className="text-white text-xl font-bold">{planet.stMass?.toFixed(3)} M☉</div>
                    </div>
                  )}
                  {planet.stLogg !== undefined && planet.stLogg !== null && (
                    <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Log g</div>
                      <div className="text-white text-xl font-bold">{planet.stLogg?.toFixed(3)}</div>
                    </div>
                  )}
                  {planet.stMet !== undefined && planet.stMet !== null && (
                    <div className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Metalicidad [Fe/H]</div>
                      <div className="text-white text-xl font-bold">{planet.stMet?.toFixed(2)} dex</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Magnitudes y Sistema */}
              <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/30 shadow-2xl shadow-black/40">
                <h2 className="text-2xl font-bold text-white mb-6">{t('planetInformation.sections.magnitudesAndSystem')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {planet.syDist && (
                    <div className="bg-teal-500/5 border border-teal-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Distancia</div>
                      <div className="text-white text-xl font-bold">{planet.syDist?.toFixed(2)} pc</div>
                    </div>
                  )}
                  {planet.syVmag && (
                    <div className="bg-sky-500/5 border border-sky-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Magnitud V</div>
                      <div className="text-white text-xl font-bold">{planet.syVmag?.toFixed(2)}</div>
                    </div>
                  )}
                  {planet.syKmag && (
                    <div className="bg-fuchsia-500/5 border border-fuchsia-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Magnitud K</div>
                      <div className="text-white text-xl font-bold">{planet.syKmag?.toFixed(2)}</div>
                    </div>
                  )}
                  {planet.syJmag && (
                    <div className="bg-pink-500/5 border border-pink-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Magnitud J</div>
                      <div className="text-white text-xl font-bold">{planet.syJmag?.toFixed(2)}</div>
                    </div>
                  )}
                  {planet.syHmag && (
                    <div className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Magnitud H</div>
                      <div className="text-white text-xl font-bold">{planet.syHmag?.toFixed(2)}</div>
                    </div>
                  )}
                  {planet.syGaiamag && (
                    <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Magnitud Gaia</div>
                      <div className="text-white text-xl font-bold">{planet.syGaiamag?.toFixed(2)}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Coordenadas Celestes */}
              <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/30 shadow-2xl shadow-black/40">
                <h2 className="text-2xl font-bold text-white mb-6">Coordenadas Celestes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {planet.ra !== undefined && planet.ra !== null && (
                    <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Ascensión Recta</div>
                      <div className="text-white text-xl font-bold">{planet.ra?.toFixed(6)}°</div>
                    </div>
                  )}
                  {planet.dec !== undefined && planet.dec !== null && (
                    <div className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Declinación</div>
                      <div className="text-white text-xl font-bold">{planet.dec?.toFixed(6)}°</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {telescope === 'tess' && planet.toi && (
            <div className="space-y-6">
              {/* Identificadores */}
              <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/30 shadow-2xl shadow-black/40">
                <h2 className="text-2xl font-bold text-white mb-6">{t('planetInformation.sections.identifiers')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {planet.toi && (
                    <div className={`${colors.glow} border ${colors.borderGlow} rounded-2xl p-6`}>
                      <div className="text-slate-400 text-sm mb-2">TOI</div>
                      <div className="text-white text-xl font-bold">{planet.toi}</div>
                    </div>
                  )}
                  {planet.tid && (
                    <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">TID</div>
                      <div className="text-white text-xl font-bold">{planet.tid}</div>
                    </div>
                  )}
                  {planet.ctoiAlias && (
                    <div className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">CTOI Alias</div>
                      <div className="text-white text-xl font-bold">{planet.ctoiAlias}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Características Planetarias */}
              <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/30 shadow-2xl shadow-black/40">
                <h2 className="text-2xl font-bold text-white mb-6">Características Planetarias</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {planet.plOrbper && (
                    <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Período Orbital</div>
                      <div className="text-white text-xl font-bold">{planet.plOrbper?.toFixed(4)} días</div>
                    </div>
                  )}
                  {planet.plRade && (
                    <div className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Radio Planetario</div>
                      <div className="text-white text-xl font-bold">{planet.plRade?.toFixed(2)} R⊕</div>
                    </div>
                  )}
                  {planet.plEqt && (
                    <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Temp. Equilibrio</div>
                      <div className="text-white text-xl font-bold">{planet.plEqt?.toFixed(0)} K</div>
                    </div>
                  )}
                  {planet.plInsol !== undefined && planet.plInsol !== null && (
                    <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Insolación</div>
                      <div className="text-white text-xl font-bold">{planet.plInsol?.toFixed(1)} S⊕</div>
                    </div>
                  )}
                  {planet.plTrandep && (
                    <div className="bg-violet-500/5 border border-violet-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Profundidad Tránsito</div>
                      <div className="text-white text-xl font-bold">{planet.plTrandep?.toFixed(0)} ppm</div>
                    </div>
                  )}
                  {planet.plTrandurh && (
                    <div className="bg-pink-500/5 border border-pink-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Duración Tránsito</div>
                      <div className="text-white text-xl font-bold">{planet.plTrandurh?.toFixed(3)} hrs</div>
                    </div>
                  )}
                  {planet.plPnum && (
                    <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Número de Planetas</div>
                      <div className="text-white text-xl font-bold">{planet.plPnum}</div>
                    </div>
                  )}
                  {planet.plImppar !== undefined && planet.plImppar !== null && (
                    <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Parámetro de Impacto</div>
                      <div className="text-white text-xl font-bold">{planet.plImppar?.toFixed(3)}</div>
                    </div>
                  )}
                  {planet.plOrbsmax !== undefined && planet.plOrbsmax !== null && (
                    <div className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Semi-eje Mayor</div>
                      <div className="text-white text-xl font-bold">{planet.plOrbsmax?.toFixed(4)} AU</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Características Estelares */}
              <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/30 shadow-2xl shadow-black/40">
                <h2 className="text-2xl font-bold text-white mb-6">Características Estelares</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {planet.stTeff && (
                    <div className="bg-orange-500/5 border border-orange-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Temperatura Efectiva</div>
                      <div className="text-white text-xl font-bold">{planet.stTeff?.toFixed(0)} K</div>
                    </div>
                  )}
                  {planet.stRad && (
                    <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Radio Estelar</div>
                      <div className="text-white text-xl font-bold">{planet.stRad?.toFixed(2)} R☉</div>
                    </div>
                  )}
                  {planet.stMass !== undefined && planet.stMass !== null && (
                    <div className="bg-lime-500/5 border border-lime-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Masa Estelar</div>
                      <div className="text-white text-xl font-bold">{planet.stMass?.toFixed(2)} M☉</div>
                    </div>
                  )}
                  {planet.stDist && (
                    <div className="bg-teal-500/5 border border-teal-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Distancia</div>
                      <div className="text-white text-xl font-bold">{planet.stDist?.toFixed(2)} pc</div>
                    </div>
                  )}
                  {planet.stTmag && (
                    <div className="bg-sky-500/5 border border-sky-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Magnitud TESS</div>
                      <div className="text-white text-xl font-bold">{planet.stTmag?.toFixed(2)}</div>
                    </div>
                  )}
                  {planet.stLogg && (
                    <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Log g</div>
                      <div className="text-white text-xl font-bold">{planet.stLogg?.toFixed(2)}</div>
                    </div>
                  )}
                  {planet.stMet !== undefined && planet.stMet !== null && (
                    <div className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Metalicidad</div>
                      <div className="text-white text-xl font-bold">{planet.stMet?.toFixed(2)} dex</div>
                    </div>
                  )}
                  {planet.stPmra !== undefined && planet.stPmra !== null && (
                    <div className="bg-fuchsia-500/5 border border-fuchsia-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Mov. Propio RA</div>
                      <div className="text-white text-xl font-bold">{planet.stPmra?.toFixed(3)} mas/yr</div>
                    </div>
                  )}
                  {planet.stPmdec !== undefined && planet.stPmdec !== null && (
                    <div className="bg-pink-500/5 border border-pink-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Mov. Propio Dec</div>
                      <div className="text-white text-xl font-bold">{planet.stPmdec?.toFixed(3)} mas/yr</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Coordenadas Celestes */}
              <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/30 shadow-2xl shadow-black/40">
                <h2 className="text-2xl font-bold text-white mb-6">Coordenadas Celestes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {planet.rastr && (
                    <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Ascensión Recta</div>
                      <div className="text-white text-xl font-bold">{planet.rastr}</div>
                      {planet.ra && (
                        <div className="text-slate-500 text-sm mt-1">{planet.ra?.toFixed(6)}°</div>
                      )}
                    </div>
                  )}
                  {planet.decstr && (
                    <div className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-6">
                      <div className="text-slate-400 text-sm mb-2">Declinación</div>
                      <div className="text-white text-xl font-bold">{planet.decstr}</div>
                      {planet.dec && (
                        <div className="text-slate-500 text-sm mt-1">{planet.dec?.toFixed(6)}°</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanetInformation;
