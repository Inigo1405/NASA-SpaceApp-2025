import { useState } from 'react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  specialty: string;
  bio: string;
  avatar: string;
  links: {
    linkedin?: string;
    github?: string;
    email?: string;
  };
}

const Team = () => {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Dr. María González',
      role: 'Líder del Proyecto',
      specialty: 'Astrofísica & Machine Learning',
      bio: 'Especialista en análisis de datos astronómicos con 10 años de experiencia en investigación de exoplanetas.',
      avatar: '👨‍🚀',
      links: {
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
        email: 'maria@example.com',
      },
    },
    {
      id: 2,
      name: 'Carlos Rodríguez',
      role: 'Desarrollador Full Stack',
      specialty: 'React & Node.js',
      bio: 'Ingeniero de software especializado en aplicaciones web interactivas y visualización de datos científicos.',
      avatar: '👩‍💻',
      links: {
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
      },
    },
    {
      id: 3,
      name: 'Ana Martínez',
      role: 'Científica de Datos',
      specialty: 'Python & Deep Learning',
      bio: 'Experta en modelos de inteligencia artificial para clasificación y predicción de fenómenos astronómicos.',
      avatar: '👨‍🔬',
      links: {
        github: 'https://github.com',
        email: 'ana@example.com',
      },
    },
    {
      id: 4,
      name: 'Jorge López',
      role: 'Diseñador UX/UI',
      specialty: 'Diseño de Interfaces',
      bio: 'Diseñador creativo enfocado en crear experiencias de usuario intuitivas para aplicaciones científicas.',
      avatar: '🎨',
      links: {
        linkedin: 'https://linkedin.com',
      },
    },
    {
      id: 5,
      name: 'Laura Fernández',
      role: 'Especialista en Astronomía',
      specialty: 'Análisis Espectroscópico',
      bio: 'Astrónoma con experiencia en caracterización de atmósferas planetarias y búsqueda de biosignaturas.',
      avatar: '🔭',
      links: {
        linkedin: 'https://linkedin.com',
        email: 'laura@example.com',
      },
    },
  ];

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
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" 
           style={{ animationDuration: '5s' }} />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" 
           style={{ animationDuration: '7s', animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse" 
           style={{ animationDuration: '6s', animationDelay: '2s' }} />

      {/* Content */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <div className="flex items-center justify-center space-x-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                <span className="text-purple-300 text-sm font-semibold tracking-wider uppercase">
                  Nuestro Equipo
                </span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-100 to-indigo-200 bg-clip-text text-transparent animate-gradient">
              Exploradores del Cosmos
            </h1>
            
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Un equipo multidisciplinario de Sistemas Computacionales, Mecatrónica y Mecánica unidos por la pasión de descubrir nuevos mundos más allá de nuestro sistema solar.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 mt-10">
              <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/30 rounded-2xl px-8 py-4">
                <div className="text-3xl font-bold text-purple-400">{teamMembers.length}</div>
                <div className="text-sm text-slate-400 mt-1">Miembros</div>
              </div>
              <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/30 rounded-2xl px-8 py-4">
                <div className="text-3xl font-bold text-indigo-400">3+</div>
                <div className="text-sm text-slate-400 mt-1">Especialidades</div>
              </div>
              <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/30 rounded-2xl px-8 py-4">
                <div className="text-3xl font-bold text-blue-400">∞</div>
                <div className="text-sm text-slate-400 mt-1">Dedicación</div>
              </div>
            </div>
          </div>

          {/* Team Grid */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-20 max-w-5xl w-full">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  onMouseEnter={() => setHoveredMember(member.id)}
                  onMouseLeave={() => setHoveredMember(null)}
                  className="group relative flex"
                >
                  {/* Card */}
                  <div className={`
                    relative bg-slate-900/40 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/30 
                    shadow-2xl shadow-black/40 transition-all duration-500 h-full w-full
                    ${hoveredMember === member.id ? 'transform -translate-y-2 shadow-purple-500/20 border-purple-500/30' : ''}
                  `}>
                    {/* Glow effect on hover */}
                    {hoveredMember === member.id && (
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-indigo-500/5 to-blue-500/5 rounded-3xl" />
                    )}

                    <div className="relative z-10">
                      {/* Avatar */}
                      <div className="flex justify-center mb-6">
                        <div className={`
                          relative w-32 h-32 rounded-full bg-gradient-to-br from-purple-500/20 to-indigo-500/20 
                          flex items-center justify-center text-6xl border-2 transition-all duration-500
                          ${hoveredMember === member.id 
                            ? 'border-purple-400/50 shadow-lg shadow-purple-500/30 scale-110' 
                            : 'border-slate-700/50'
                          }
                        `}>
                          {member.avatar}
                          {/* Orbital ring animation on hover */}
                          {hoveredMember === member.id && (
                            <>
                              <div className="absolute inset-0 rounded-full border-2 border-purple-400/30 animate-ping" />
                              <div className="absolute inset-0 rounded-full border-2 border-indigo-400/20" 
                                   style={{ animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite', animationDelay: '0.5s' }} />
                            </>
                          )}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {member.name}
                        </h3>
                        <div className="inline-block px-4 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full mb-3">
                          <p className="text-purple-300 text-sm font-semibold">
                            {member.role}
                          </p>
                        </div>
                        <p className="text-indigo-300 text-sm font-medium mb-4">
                          {member.specialty}
                        </p>
                        <p className="text-slate-400 text-sm leading-relaxed">
                          {member.bio}
                        </p>
                      </div>

                      {/* Social Links */}
                      <div className="flex justify-center space-x-4 pt-4 border-t border-slate-700/30">
                        {member.links.linkedin && (
                          <a
                            href={member.links.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300"
                            title="LinkedIn"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          </a>
                        )}
                        {member.links.github && (
                          <a
                            href={member.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-purple-400 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300"
                            title="GitHub"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                          </a>
                        )}
                        {member.links.email && (
                          <a
                            href={`mailto:${member.links.email}`}
                            className="w-10 h-10 rounded-full bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all duration-300"
                            title="Email"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
      `}
      </style>
    </div>
  );
};

export default Team;