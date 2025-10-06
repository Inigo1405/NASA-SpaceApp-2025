import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface MethodologyStep {
  id: number;
  title: string;
  description: string;
  icon: string;
  details: string[];
  color: string;
}

const Methodology = () => {
  const { t } = useTranslation();
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const methodologySteps: MethodologyStep[] = [
    {
      id: 1,
      title: t('methodology.steps.step1.title'),
      description: t('methodology.steps.step1.description'),
      icon: '🛰️',
      details: t('methodology.steps.step1.details', { returnObjects: true }) as string[],
      color: 'from-cyan-500/20 to-blue-500/20',
    },
    {
      id: 2,
      title: t('methodology.steps.step2.title'),
      description: t('methodology.steps.step2.description'),
      icon: '⚙️',
      details: t('methodology.steps.step2.details', { returnObjects: true }) as string[],
      color: 'from-purple-500/20 to-pink-500/20',
    },
    {
      id: 3,
      title: t('methodology.steps.step3.title'),
      description: t('methodology.steps.step3.description'),
      icon: '🎯',
      details: t('methodology.steps.step3.details', { returnObjects: true }) as string[],
      color: 'from-emerald-500/20 to-teal-500/20',
    },
    {
      id: 4,
      title: t('methodology.steps.step4.title'),
      description: t('methodology.steps.step4.description'),
      icon: '🤖',
      details: t('methodology.steps.step4.details', { returnObjects: true }) as string[],
      color: 'from-amber-500/20 to-orange-500/20',
    },
    {
      id: 5,
      title: t('methodology.steps.step5.title'),
      description: t('methodology.steps.step5.description'),
      icon: '📊',
      details: t('methodology.steps.step5.details', { returnObjects: true }) as string[],
      color: 'from-rose-500/20 to-red-500/20',
    },
    {
      id: 6,
      title: t('methodology.steps.step6.title'),
      description: t('methodology.steps.step6.description'),
      icon: '🚀',
      details: t('methodology.steps.step6.details', { returnObjects: true }) as string[],
      color: 'from-indigo-500/20 to-violet-500/20',
    },
  ];

  const tools = [
    { name: 'Python'},
    { name: 'Scikit-learn'},
    { name: 'Pandas'},
    { name: 'NumPy'},
    { name: 'Matplotlib'},
    { name: 'Jupyter'},
  ];

  const modelMetrics = [
    { label: t('methodology.performance.accuracy'), value: '72.17%', color: 'text-emerald-400' },
    { label: t('methodology.performance.precision'), value: '73.0%', color: 'text-blue-400' },
    { label: t('methodology.performance.f1Score'), value: '72.40%', color: 'text-amber-400' },
  ];

  const toggleStep = (id: number) => {
    setExpandedStep(expandedStep === id ? null : id);
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

      {/* Main Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
              {t('methodology.header.title')}
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              {t('methodology.header.subtitle')}
            </p>
          </div>

          {/* Model Performance Metrics */}
          <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-lg rounded-3xl p-8 border border-slate-700/30 shadow-2xl mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">
              {t('methodology.performance.title')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {modelMetrics.map((metric, index) => (
                <div
                  key={index}
                  className="bg-slate-900/50 rounded-2xl p-6 border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="text-slate-400 text-sm mb-2">{metric.label}</div>
                  <div className={`text-4xl font-bold ${metric.color}`}>{metric.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Methodology Steps */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              {t('methodology.process.title')}
            </h2>
            {methodologySteps.map((step) => (
              <div
                key={step.id}
                className={`bg-gradient-to-br ${step.color} backdrop-blur-lg rounded-2xl border border-slate-700/30 shadow-xl transition-all duration-300 hover:shadow-2xl overflow-hidden ${
                  expandedStep === step.id ? 'ring-2 ring-white/20' : ''
                }`}
              >
                <button
                  onClick={() => toggleStep(step.id)}
                  className="w-full text-left p-6 flex items-start gap-4 hover:bg-white/5 transition-colors duration-200"
                >
                  <div className="text-5xl flex-shrink-0">{step.icon}</div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-white/10 text-white text-sm font-bold px-3 py-1 rounded-full">
                        Paso {step.id}
                      </span>
                      <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                    </div>
                    <p className="text-slate-300 text-lg">{step.description}</p>
                  </div>
                  <div className="flex-shrink-0 text-white text-2xl">
                    {expandedStep === step.id ? '−' : '+'}
                  </div>
                </button>

                {expandedStep === step.id && (
                  <div className="px-6 pb-6 animate-fade-in">
                    <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/30">
                      <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <span>📋</span> {t('methodology.process.details')}
                      </h4>
                      <ul className="space-y-3">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-slate-300">
                            <span className="text-emerald-400 flex-shrink-0 mt-1">✓</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Technologies Used */}
          <div className="mt-16 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-lg rounded-3xl p-8 border border-slate-700/30 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              {t('methodology.technologies.title')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {tools.map((tech, index) => (
                <div
                  key={index}
                  className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300 hover:scale-105 flex items-center gap-3"
                >
                  <span className="text-white font-semibold">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Data Source */}
          <div className="mt-12 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-lg rounded-3xl p-8 border border-indigo-500/30 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-3xl">🌌</span>
              {t('methodology.dataSource.title')}
            </h2>
            <p className="text-slate-300 text-lg mb-4">
              {t('methodology.dataSource.description')}
            </p>
            <a
              href="https://exoplanetarchive.ipac.caltech.edu/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-indigo-600/50"
            >
              <span>🔗</span>
              {t('methodology.dataSource.linkText')}
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Methodology;