// src/pages/NotFound.tsx
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
            </div>
            <svg
              className="w-64 h-64 mx-auto relative z-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                className="text-blue-600"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          ¡Oops! Página no encontrada
        </h2>
        <p className="text-gray-600 mb-8 text-lg">
          La página que estás buscando no existe o ha sido movida.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
          >
            <svg
              className="w-5 h-5 mr-2"
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
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
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

        {/* Popular Links */}
        <div className="mt-12 pt-8 border-t border-gray-300">
          <p className="text-sm text-gray-600 mb-4">Enlaces populares:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/dashboard"
              className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
            >
              Dashboard
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              to="/about"
              className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
            >
              Acerca de
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              to="/profile"
              className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
            >
              Perfil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;