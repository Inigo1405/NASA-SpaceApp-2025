// src/components/layout/Navbar/Navbar.tsx
import { Link, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import type { NavItem } from '../../../types';

const navItems: NavItem[] = [
  { path: '/', label: 'Inicio' },
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/about', label: 'Acerca de' },
];

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Cerrar menú de usuario al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-gradient-to-r from-black via-slate-900 to-black shadow-lg shadow-blue-500/10 sticky top-0 z-50 border-b border-blue-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-cyan-500 to-slate-400 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/50 group-hover:shadow-cyan-500/80 transition-all group-hover:scale-110">
              <span className="text-white font-bold text-xl">🚀</span>
            </div>
            <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-slate-300">
              Space Explorer
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'text-white bg-blue-600/50 shadow-lg shadow-blue-500/30 border border-blue-400/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50 border border-transparent hover:border-blue-500/20'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* User Menu - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Notifications */}
            <button className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-800/50 rounded-lg transition-colors relative border border-transparent hover:border-blue-500/20">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50"></span>
            </button>

            {/* User Dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-800/50 transition-colors border border-transparent hover:border-blue-500/20"
              >
                <div className="w-9 h-9 bg-gradient-to-br from-blue-500 via-cyan-500 to-slate-400 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/50">
                  <span className="text-white font-semibold text-sm">JD</span>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-slate-200">John Doe</p>
                  <p className="text-xs text-slate-400">Explorador</p>
                </div>
                <svg
                  className={`w-4 h-4 text-slate-400 transition-transform ${
                    isUserMenuOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-900 rounded-lg shadow-lg shadow-blue-500/20 py-1 border border-blue-500/30 backdrop-blur-sm">
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-sm text-slate-300 hover:bg-slate-800/50 hover:text-cyan-400 transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <svg
                      className="w-4 h-4 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Mi Perfil
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 text-sm text-slate-300 hover:bg-slate-800/50 hover:text-cyan-400 transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <svg
                      className="w-4 h-4 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Configuración
                  </Link>
                  <hr className="my-1 border-blue-500/20" />
                  <button className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-slate-800/50 hover:text-red-300 transition-colors">
                    <svg
                      className="w-4 h-4 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span className="sr-only">Abrir menú</span>
            {!isMobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-sm border-t border-blue-500/20">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {/* User Info Mobile */}
            <div className="flex items-center space-x-3 px-3 py-3 bg-slate-900/50 rounded-lg mb-3 border border-blue-500/30">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-cyan-500 to-slate-400 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/50">
                <span className="text-white font-semibold">JD</span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-200">John Doe</p>
                <p className="text-xs text-slate-400">john@spaceexplorer.com</p>
              </div>
            </div>

            {/* Nav Items Mobile */}
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-white bg-blue-600/50 border border-blue-400/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {item.label}
              </Link>
            ))}

            <hr className="my-2 border-blue-500/20" />

            <Link
              to="/profile"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50"
            >
              Mi Perfil
            </Link>
            <Link
              to="/settings"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50"
            >
              Configuración
            </Link>
            <button className="w-full text-left px-3 py-2 rounded-lg text-base font-medium text-red-400 hover:bg-slate-800/50 hover:text-red-300">
              Cerrar Sesión
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;