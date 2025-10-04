// src/pages/Home.tsx
import { Link } from 'react-router-dom';

const Home = () => {
//   const features = [
//     {
//       icon: '🚀',
//       title: 'Exploración Espacial',
//       description: 'Descubre los secretos del universo con datos en tiempo real de misiones espaciales.',
//     },
//     {
//       icon: '🌌',
//       title: 'Galaxias y Nebulosas',
//       description: 'Visualiza imágenes impresionantes de galaxias lejanas y nebulosas coloridas.',
//     },
//     {
//       icon: '🛸',
//       title: 'Tecnología Avanzada',
//       description: 'Accede a información sobre la última tecnología espacial y misiones futuras.',
//     },
//   ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-slate-900 to-black overflow-hidden">
      {/* Animated Stars Background */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-slate-300 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-20 right-10 w-40 h-40 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 opacity-20 blur-3xl animate-float" />
      <div className="absolute bottom-40 left-20 w-60 h-60 rounded-full bg-gradient-to-br from-slate-600 to-blue-700 opacity-15 blur-3xl animate-float-delayed" />


      {/* Features Section
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              ¿Qué puedes descubrir?
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Accede a información actualizada del espacio y explora el cosmos como nunca antes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30 hover:border-cyan-400/50 transition-all transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/10 group-hover:to-cyan-500/10 transition-all" />
                
                <div className="relative z-10">
                  <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-100 mb-3">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[90%] mx-auto text-center">
          <div className="bg-gradient-to-r from-slate-900/50 to-slate-800/50 backdrop-blur-sm rounded-3xl p-12 border border-blue-500/30 shadow-2xl shadow-blue-500/20 opacity-70">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              El universo te está esperando
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Únete a miles de exploradores espaciales y comienza tu aventura cósmica hoy
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg shadow-blue-500/50 hover:shadow-cyan-500/80 transform hover:scale-105"
            >
              Comenzar Misión
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CSS Animations */}
      <style>{`
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-30px);
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes spin-slower {
          from {
            transform: rotateX(60deg) rotate(0deg);
          }
          to {
            transform: rotateX(60deg) rotate(360deg);
          }
        }
        
        @keyframes spin-reverse {
          from {
            transform: rotateX(60deg) rotateZ(60deg) rotate(360deg);
          }
          to {
            transform: rotateX(60deg) rotateZ(60deg) rotate(0deg);
          }
        }
        
        @keyframes orbit {
          from {
            transform: rotate(0deg) translateX(150px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(150px) rotate(-360deg);
          }
        }
        
        @keyframes orbit-reverse {
          from {
            transform: rotate(360deg) translateX(120px) rotate(-360deg);
          }
          to {
            transform: rotate(0deg) translateX(120px) rotate(0deg);
          }
        }
        
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-spin-slower {
          animation: spin-slower 30s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 25s linear infinite;
        }
        
        .animate-orbit {
          animation: orbit 15s linear infinite;
        }
        
        .animate-orbit-reverse {
          animation: orbit-reverse 20s linear infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;