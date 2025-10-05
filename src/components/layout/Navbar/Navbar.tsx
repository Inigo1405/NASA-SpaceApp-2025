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
    <nav className="backdrop-blur-lg bg-gradient-to-br from-black via-slate-950 to-slate-900 sticky top-0 z-50 border-b border-slate-800/30 h-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center mt-4 group">
            <img src="public/LogoEXODIA.png" alt="Logo EXOD-IA" className='w-50 h-50 absolute object-contain' />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`text-md font-medium transition-all duration-200 relative inline-flex items-center py-2 px-2 ${
                    location.pathname === item.path
                      ? 'text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {item.label}
                  {location.pathname === item.path && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500/0 via-purple-500 to-purple-500/0" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* User Menu - Desktop */}
          <div className="hidden md:flex items-center">
            {/* User Dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-slate-800/30 transition-all duration-200 group"
              >
                <div className="w-7 h-7 bg-gradient-to-br from-purple-600/60 to-indigo-600/40 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-xs">JD</span>
                </div>
                <svg
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
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
                <div className="absolute right-0 mt-2 w-44 bg-slate-900/95 backdrop-blur-md rounded-lg shadow-xl border border-slate-800/50 py-1 overflow-hidden">
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800/50 hover:text-white transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <svg
                      className="w-4 h-4 mr-3 text-slate-400"
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
                    className="flex items-center px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800/50 hover:text-white transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <svg
                      className="w-4 h-4 mr-3 text-slate-400"
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
                  <div className="my-1 h-px bg-slate-800/50" />
                  <button className="flex items-center w-full px-4 py-2.5 text-sm text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors">
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
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/30 transition-all"
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
        <div className="md:hidden backdrop-blur-lg bg-slate-950/50 border-t border-slate-800/30">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {/* User Info Mobile */}
            <div className="flex items-center space-x-3 px-3 py-3 mb-3">
              <div className="w-9 h-9 bg-gradient-to-br from-purple-600/60 to-indigo-600/40 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">JD</span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-200">John Doe</p>
                <p className="text-xs text-slate-500">john@spaceexplorer.com</p>
              </div>
            </div>

            {/* Nav Items Mobile */}
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2.5 text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-white bg-slate-800/30 rounded-lg'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {item.label}
              </Link>
            ))}

            <div className="my-3 h-px bg-slate-800/50" />

            <Link
              to="/profile"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
            >
              Mi Perfil
            </Link>
            <Link
              to="/settings"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
            >
              Configuración
            </Link>
            <button className="w-full text-left px-3 py-2.5 text-sm font-medium text-rose-400 hover:text-rose-300 transition-colors">
              Cerrar Sesión
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;