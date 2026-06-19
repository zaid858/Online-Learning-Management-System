import React from 'react';
import useTranslation from '../hooks/useTranslation';
import './legal.css';

export default function Terms() {
  const { t } = useTranslation();

  return (
    <div className="legal-page container">
      <div className="legal-card animate-fade-in">
        <h1>{t('Terms of Service')}</h1>
        <p className="last-updated">{t('Last Updated: May 2026')}</p>

        <p className="intro">
          {t('Terms of Service Intro')}
        </p>

        <h2>{t('Educational Materials License Header')}</h2>
        <p>
          {t('Educational Materials License Body')}
        </p>

        <h2>{t('Session Profiles Credentials Header')}</h2>
        <p>
          {t('Session Profiles Credentials Body')}
        </p>

        <h2>{t('Intellectual Assets Header')}</h2>
        <p>
          {t('Intellectual Assets Body')}
        </p>

        <h2>{t('Disclaimer of Warranty Header')}</h2>
        <p>
          {t('Disclaimer of Warranty Body')}
        </p>
      </div>
    </div>
  );
}
