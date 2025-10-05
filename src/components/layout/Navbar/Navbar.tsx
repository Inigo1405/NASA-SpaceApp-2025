// src/components/layout/Navbar/Navbar.tsx
import { Link, useLocation } from 'react-router-dom';
import { US, MX } from 'country-flag-icons/react/3x2'
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { NavItem } from '../../../types';

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  
  const navItems: NavItem[] = [
    { path: '/', label: t('nav.home') },
    { path: '/predict', label: t('nav.predict') },
    { path: '/about', label: t('nav.about') },
    { path: '/methodology', label: t('nav.methodology') },
    { path: '/team', label: t('nav.team') },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  
  return (
    <nav className="backdrop-blur-lg bg-gradient-to-br from-black via-slate-950 to-slate-900 sticky top-0 z-50 border-b border-slate-800/30 h-30">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center group h-14 md:h-24 relative z-10">
            {/* Logo grande solo en escritorio */}
            <img 
              src="LogoEXODIA.png" 
              alt="Logo EXOD-IA" 
              className="hidden md:block object-contain h-25 w-auto transition-all duration-200"
              style={{ maxWidth: '200px' }}
            />
            {/* Logo simplify solo en móvil */}
            <img
              src="/LogoSimplify.png"
              alt="Logo Simplify"
              className="block md:hidden object-contain h-8 w-8 transition-all duration-200"
            />
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
            {/* Language Selector */}
            <div className="flex items-center space-x-2 px-3 py-1 rounded-md bg-slate-800/50 border border-slate-700/50">
              {/* Bandera de España */}
              <div 
                className={`flex items-center space-x-1 cursor-pointer transition-all duration-200 px-2 py-1 rounded-md ${
                  i18n.language === 'en' 
                    ? 'bg-slate-700/50 shadow-inner' 
                    : 'hover:bg-slate-700/30 opacity-50'
                }`}
                onClick={() => changeLanguage('en')}
                title="Switch to English"
                >
                <US className="h-5 w-5 rounded-sm shadow-lg" />
                <span className={`text-sm font-medium transition-colors ${
                  i18n.language === 'en' ? 'text-white' : 'text-slate-300'
                }`}>EN</span>
              </div>
              
              <span className="text-slate-500">|</span>
              
              {/* Bandera de Estados Unidos */}
              <div 
                className={`flex items-center space-x-1 cursor-pointer transition-all duration-200 px-2 py-1 rounded-md ${
                  i18n.language === 'es' 
                  ? 'bg-slate-700/50 shadow-inner' 
                  : 'hover:bg-slate-700/30 opacity-50'
                }`}
                onClick={() => changeLanguage('es')}
                title="Cambiar a Español"
              >
                <MX className="h-5 w-5 rounded-sm shadow-lg" />
                <span className={`text-sm font-medium transition-colors ${
                  i18n.language === 'es' ? 'text-white' : 'text-slate-400'
                }`}>ES</span>
              </div>
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
            
            {/* Language Selector Mobile */}
            <div className="mt-4 pt-3 border-t border-slate-800/30">
              <div className="flex items-center space-x-2 px-3 py-2">
                <span className="text-xs text-slate-500 font-medium">{t('language.label')}:</span>
                <div className="flex items-center space-x-1">
                  <div 
                    className={`flex items-center space-x-1 cursor-pointer transition-all duration-200 px-2 py-1 rounded-md ${
                      i18n.language === 'en' 
                        ? 'bg-slate-700/50 shadow-inner' 
                        : 'hover:bg-slate-700/30 opacity-50'
                    }`}
                    onClick={() => changeLanguage('en')}
                  >
                    <US className="h-4 w-4 rounded-sm shadow-lg" />
                    <span className={`text-xs font-medium transition-colors ${
                      i18n.language === 'en' ? 'text-white' : 'text-slate-300'
                    }`}>EN</span>
                  </div>
                  
                  <span className="text-slate-500 text-xs">|</span>
                  
                  <div 
                    className={`flex items-center space-x-1 cursor-pointer transition-all duration-200 px-2 py-1 rounded-md ${
                      i18n.language === 'es' 
                        ? 'bg-slate-700/50 shadow-inner' 
                        : 'hover:bg-slate-700/30 opacity-50'
                    }`}
                    onClick={() => changeLanguage('es')}
                  >
                    <MX className="h-4 w-4 rounded-sm shadow-lg" />
                    <span className={`text-xs font-medium transition-colors ${
                      i18n.language === 'es' ? 'text-white' : 'text-slate-400'
                    }`}>ES</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;