import React, { useState, useEffect } from 'react';
import { Settings, Languages, Moon, Sun, Type } from 'lucide-react';
import useTranslation from '../hooks/useTranslation';
import './AccessibilityToolbar.css';

export default function AccessibilityToolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [fontSizeClass, setFontSizeClass] = useState('font-md');
  const { t, lang: activeLang } = useTranslation();

  useEffect(() => {
    // Load initial configurations from localStorage
    const savedTheme = localStorage.getItem('appTheme') === 'dark';
    setIsDark(savedTheme);
    if (savedTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }

    const savedFont = localStorage.getItem('appFontSize') || 'font-md';
    setFontSizeClass(savedFont);
    document.documentElement.classList.remove('font-sm', 'font-md', 'font-lg', 'font-xl');
    document.documentElement.classList.add(savedFont);
  }, []);

  const toggleTheme = () => {
    const nextTheme = !isDark;
    setIsDark(nextTheme);
    localStorage.setItem('appTheme', nextTheme ? 'dark' : 'light');
    if (nextTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    // Broadcast changes
    window.dispatchEvent(new Event('storage'));
  };

  const handleFontSizeChange = (sizeClass) => {
    setFontSizeClass(sizeClass);
    localStorage.setItem('appFontSize', sizeClass);
    document.documentElement.classList.remove('font-sm', 'font-md', 'font-lg', 'font-xl');
    document.documentElement.classList.add(sizeClass);
    window.dispatchEvent(new Event('storage'));
  };

  const handleLanguageChange = (lang) => {
    localStorage.setItem('appLanguage', lang);
    // Dispatch custom event to notify all components to reload translation text maps
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new Event('languageChange'));
  };

  return (
    <div className="accessibility-toolbar-container">
      {/* Floating Toggle Button */}
      <button 
        className={`accessibility-fab ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title={t('Accessibility Settings')}
        aria-label={t('Toggle Accessibility Panel')}
      >
        <Settings size={22} className="fab-settings-icon" />
      </button>

      {/* Expanded Widget Control Panel */}
      {isOpen && (
        <div className="accessibility-panel-card animate-fade-in">
          <div className="panel-header">
            <h4>♿ {t('Accessibility Settings')}</h4>
          </div>

          <div className="panel-body">
            {/* Control Row 1: Theme */}
            <div className="panel-row">
              <span className="row-label">
                <Moon size={16} /> {t('Theme Mode')}
              </span>
              <button 
                className={`theme-toggle-btn ${isDark ? 'active' : ''}`}
                onClick={toggleTheme}
              >
                {isDark ? <Sun size={14} /> : <Moon size={14} />}
                <span>{isDark ? t('Light Theme') : t('Dark Theme')}</span>
              </button>
            </div>

            {/* Control Row 2: Font Size Scaling */}
            <div className="panel-row font-size-row">
              <span className="row-label">
                <Type size={16} /> {t('Font Scale')}
              </span>
              <div className="font-pills-wrap">
                {[
                  { label: 'A-', sizeClass: 'font-sm', title: t('Small') },
                  { label: 'A', sizeClass: 'font-md', title: t('Medium') },
                  { label: 'A+', sizeClass: 'font-lg', title: t('Large') },
                  { label: 'A++', sizeClass: 'font-xl', title: t('Extra Large') }
                ].map((pill) => (
                  <button
                    key={pill.sizeClass}
                    className={`font-pill-btn ${fontSizeClass === pill.sizeClass ? 'active' : ''}`}
                    onClick={() => handleFontSizeChange(pill.sizeClass)}
                    title={pill.title}
                  >
                    {pill.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Control Row 3: Multilingual Swapping */}
            <div className="panel-row language-row">
              <span className="row-label">
                <Languages size={16} /> {t('UI Language')}
              </span>
              <div className="lang-selectors-wrap">
                {[
                  { code: 'en', label: 'English' },
                  { code: 'es', label: 'Español' },
                  { code: 'hi', label: 'हिन्दी' },
                  { code: 'te', label: 'తెలుగు' }
                ].map((lang) => (
                  <button
                    key={lang.code}
                    className={`lang-select-pill ${activeLang === lang.code ? 'active' : ''}`}
                    onClick={() => handleLanguageChange(lang.code)}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
