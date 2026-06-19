import React from 'react';
import useTranslation from '../hooks/useTranslation';
import './legal.css';

export default function Privacy() {
  const { t } = useTranslation();

  return (
    <div className="legal-page container">
      <div className="legal-card animate-fade-in">
        <h1>{t('Privacy Policy')}</h1>
        <p className="last-updated">{t('Last Updated: May 2026')}</p>
        
        <p className="intro">
          {t('Privacy Policy Intro')}
        </p>

        <h2>{t('Client-Side Data localStorage Header')}</h2>
        <p>
          {t('Client-Side Data localStorage Body')}
        </p>

        <h2>{t('Data Subject Rights Header')}</h2>
        <p>
          {t('Data Subject Rights Intro')}
        </p>
        <ul>
          <li>{t('Data Subject Rights Bullet 1')}</li>
          <li>{t('Data Subject Rights Bullet 2')}</li>
          <li>{t('Data Subject Rights Bullet 3')}</li>
        </ul>

        <h2>{t('Third Party Integrations Header')}</h2>
        <p>
          {t('Third Party Integrations Body')}
        </p>

        <h2>{t('Contact Desk Header')}</h2>
        <p>
          {t('Contact Desk Body')}
        </p>
      </div>
    </div>
  );
}
