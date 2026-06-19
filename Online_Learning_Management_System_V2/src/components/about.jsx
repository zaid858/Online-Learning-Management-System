import React, { useState } from 'react';
import { Award, BookOpen, Target, Heart, TrendingUp, Users } from 'lucide-react';
import useTranslation from '../hooks/useTranslation';
import './about.css';

export default function About() {
  const [activeYear, setActiveYear] = useState('2026');
  const { t } = useTranslation();

  const historyData = [
    { year: '2023', title: t('EduSphere Conceived'), desc: t('A group of engineers and designers brainstormed a system to make online education as interactive as in-person classrooms. Scaffolded initial codebases.') },
    { year: '2024', title: t('Beta Trial Launch'), desc: t('Introduced initial course formats to 5,000 active students. Verified curriculum workflows, syllabus checkmarks, and client persistent score cards.') },
    { year: '2025', title: t('Series A Funding'), desc: t('Secured capital backing to recruit top instructors across engineering, analytics, marketing, and business fields. Built immersive classroom dashboards.') },
    { year: '2026', title: t('The Modern LMS Ecosystem'), desc: t('Scaling to 15,000+ active users globally. Supporting instant completion certifications, structured quizzes, and robust profile scratchpads.') }
  ];

  return (
    <div className="about-page">
      {/* About Banner */}
      <section className="about-hero">
        <div className="container text-center animate-fade-in">
          <span className="badge badge-primary">{t('About Our Ecosystem')}</span>
          <h1>{t('Empowering Careers')}</h1>
          <p className="subtitle">
            {t('Ecosystem Subtitle')}
          </p>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="about-stats container">
        <div className="stats-row animate-fade-in">
          <div className="stat-card">
            <Users size={32} className="stat-icon" />
            <h3>15,000+</h3>
            <p>{t('Active Students')}</p>
          </div>
          <div className="stat-card">
            <BookOpen size={32} className="stat-icon" />
            <h3>250+</h3>
            <p>{t('Curated Courses')}</p>
          </div>
          <div className="stat-card">
            <Award size={32} className="stat-icon" />
            <h3>99.8%</h3>
            <p>{t('Completion Rating')}</p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="values-section section">
        <div className="container">
          <div className="section-header text-center">
            <span className="badge badge-primary">{t('Core Tenets')}</span>
            <h2>{t('Our Operational Values')}</h2>
            <p className="section-subtitle">{t('Tenets Subtitle')}</p>
          </div>

          <div className="values-grid">
            <div className="value-card animate-slide-left">
              <div className="val-icon-wrap">
                <Target size={24} />
              </div>
              <h3>{t('Value 1 Title')}</h3>
              <p>{t('Value 1 Desc')}</p>
            </div>

            <div className="value-card">
              <div className="val-icon-wrap">
                <TrendingUp size={24} />
              </div>
              <h3>{t('Value 2 Title')}</h3>
              <p>{t('Value 2 Desc')}</p>
            </div>

            <div className="value-card animate-slide-right">
              <div className="val-icon-wrap">
                <Heart size={24} />
              </div>
              <h3>{t('Value 3 Title')}</h3>
              <p>{t('Value 3 Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive History Timeline Section */}
      <section className="timeline-section section">
        <div className="container">
          <div className="section-header text-center">
            <span className="badge badge-primary">{t('Our Journey')}</span>
            <h2>{t('Timeline Title')}</h2>
            <p className="section-subtitle">{t('Timeline Subtitle')}</p>
          </div>

          <div className="timeline-interactive-wrap">
            {/* Timeline navigation */}
            <div className="timeline-nav-row">
              {historyData.map((node) => (
                <button
                  key={node.year}
                  className={`timeline-year-btn ${activeYear === node.year ? 'active' : ''}`}
                  onClick={() => setActiveYear(node.year)}
                >
                  {node.year}
                </button>
              ))}
            </div>

            {/* Timeline content details */}
            <div className="timeline-display-card">
              {historyData.map((node) => {
                if (node.year !== activeYear) return null;
                return (
                  <div key={node.year} className="timeline-active-content animate-fade-in">
                    <span className="timeline-tag">{t('Year')} {node.year}</span>
                    <h3 className="timeline-node-title">{node.title}</h3>
                    <p className="timeline-node-desc">{node.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
