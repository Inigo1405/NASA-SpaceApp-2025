import { useState } from 'react';

interface MethodologyStep {
  id: number;
  title: string;
  description: string;
  icon: string;
  details: string[];
  color: string;
}

const Methodology = () => {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const methodologySteps: MethodologyStep[] = [
    {
      id: 1,
      title: 'Recolección de Datos',
      description: 'Obtención y preparación de datos del archivo Kepler de la NASA',
      icon: '🛰️',
      details: [
        'Descarga del dataset oficial de Kepler desde NASA Exoplanet Archive',
        'Extracción de características clave: curvas de luz, parámetros orbitales',
        'Identificación de variables relevantes para clasificación',
        'Limpieza inicial de datos faltantes o corruptos',
      ],
      color: 'from-cyan-500/20 to-blue-500/20',
    },
    {
      id: 2,
      title: 'Preprocesamiento',
      description: 'Limpieza y transformación de datos para el modelo',
      icon: '⚙️',
      details: [
        'Normalización de curvas de luz y características numéricas',
        'Manejo de valores faltantes mediante imputación estadística',
        'Detección y eliminación de outliers',
        'Balanceo de clases (confirmados, candidatos, falsos positivos)',
        'Feature engineering: creación de características derivadas',
      ],
      color: 'from-purple-500/20 to-pink-500/20',
    },
    {
      id: 3,
      title: 'Selección de Características',
      description: 'Identificación de las variables más relevantes',
      icon: '🎯',
      details: [
        'Análisis de correlación entre variables',
        'Aplicación de técnicas de reducción de dimensionalidad (PCA)',
        'Evaluación de importancia de características',
        'Selección final basada en métricas de relevancia',
      ],
      color: 'from-emerald-500/20 to-teal-500/20',
    },
    {
      id: 4,
      title: 'Diseño del Modelo',
      description: 'Arquitectura y entrenamiento del modelo de Machine Learning',
      icon: '🤖',
      details: [
        'Evaluación de múltiples algoritmos (Random Forest, SVM, Neural Networks)',
        'Implementación de arquitectura de red neuronal profunda',
        'Definición de hiperparámetros mediante Grid Search',
        'División de datos en conjuntos de entrenamiento (70%), validación (15%) y prueba (15%)',
        'Entrenamiento con validación cruzada (k-fold)',
      ],
      color: 'from-amber-500/20 to-orange-500/20',
    },
    {
      id: 5,
      title: 'Validación y Optimización',
      description: 'Evaluación del rendimiento y ajuste fino del modelo',
      icon: '📊',
      details: [
        'Cálculo de métricas: Accuracy, Precision, Recall, F1-Score',
        'Análisis de matriz de confusión',
        'Curvas ROC y AUC para cada clase',
        'Optimización de umbrales de decisión',
        'Pruebas con datos no vistos',
      ],
      color: 'from-rose-500/20 to-red-500/20',
    },
    {
      id: 6,
      title: 'Despliegue e Integración',
      description: 'Implementación del modelo en la aplicación web',
      icon: '🚀',
      details: [
        'Exportación del modelo entrenado',
        'Creación de API para inferencia en tiempo real',
        'Integración con interfaz de usuario',
        'Monitoreo continuo del rendimiento',
        'Documentación técnica completa',
      ],
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
    { label: 'Accuracy', value: '94.2%', color: 'text-emerald-400' },
    { label: 'Precision', value: '92.8%', color: 'text-blue-400' },
    { label: 'Recall', value: '93.5%', color: 'text-purple-400' },
    { label: 'F1-Score', value: '93.1%', color: 'text-amber-400' },
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
              Metodología del Proyecto
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Proceso de desarrollo del modelo de Machine Learning para la clasificación 
              de exoplanetas basado en datos de la misión Kepler
            </p>
          </div>

          {/* Model Performance Metrics */}
          <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-lg rounded-3xl p-8 border border-slate-700/30 shadow-2xl mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">
              Métricas de Rendimiento del Modelo
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
              Proceso de Desarrollo
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
                        <span>📋</span> Detalles del Proceso
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
              Tecnologías Utilizadas
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
              Fuente de Datos
            </h2>
            <p className="text-slate-300 text-lg mb-4">
              Este proyecto utiliza datos oficiales de la misión Kepler de la NASA, 
              disponibles públicamente en el NASA Exoplanet Archive.
            </p>
            <a
              href="https://exoplanetarchive.ipac.caltech.edu/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-indigo-600/50"
            >
              <span>🔗</span>
              Visitar NASA Exoplanet Archive
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Methodology;