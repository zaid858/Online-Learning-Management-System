import React, { useState } from 'react';
import { Award, BookOpen, Target, Heart, TrendingUp, Users } from 'lucide-react';
import './About.css';

export default function About() {
  const [activeYear, setActiveYear] = useState('2026');

  const historyData = [
    { year: '2023', title: 'EduSphere Conceived', desc: 'A group of engineers and designers brainstormed a system to make online education as interactive as in-person classrooms. Scaffolded initial codebases.' },
    { year: '2024', title: 'Beta Trial Launch', desc: 'Introduced initial course formats to 5,000 active students. Verified curriculum workflows, syllabus checkmarks, and client persistent score cards.' },
    { year: '2025', title: 'Series A Funding', desc: 'Secured capital backing to recruit top instructors across engineering, analytics, marketing, and business fields. Built immersive classroom dashboards.' },
    { year: '2026', title: 'The Modern LMS Ecosystem', desc: 'Scaling to 15,000+ active users globally. Supporting instant completion certifications, structured quizzes, and robust profile scratchpads.' }
  ];

  return (
    <div className="about-page">
      {/* About Banner */}
      <section className="about-hero">
        <div className="container text-center animate-fade-in">
          <span className="badge badge-primary">About Our Ecosystem</span>
          <h1>Empowering Careers Globally</h1>
          <p className="subtitle">
            We build tools, curriculums, and visual environments designed to link educators and students without compromise.
          </p>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="about-stats container">
        <div className="stats-row animate-fade-in">
          <div className="stat-card">
            <Users size={32} className="stat-icon" />
            <h3>15,000+</h3>
            <p>Active Students</p>
          </div>
          <div className="stat-card">
            <BookOpen size={32} className="stat-icon" />
            <h3>250+</h3>
            <p>Curated Courses</p>
          </div>
          <div className="stat-card">
            <Award size={32} className="stat-icon" />
            <h3>99.8%</h3>
            <p>Completion Rating</p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="values-section section">
        <div className="container">
          <div className="section-header text-center">
            <span className="badge badge-primary">Core Tenets</span>
            <h2>Our Operational Values</h2>
            <p className="section-subtitle">The guidelines that define our syllabus composition and platform features.</p>
          </div>

          <div className="values-grid">
            <div className="value-card animate-slide-left">
              <div className="val-icon-wrap">
                <Target size={24} />
              </div>
              <h3>1. Quality First Curriculums</h3>
              <p>We do not support shallow, overview courses. Every module contains deep, exhaustive explanations, syllabus checklists, and graded quizzes.</p>
            </div>

            <div className="value-card">
              <div className="val-icon-wrap">
                <TrendingUp size={24} />
              </div>
              <h3>2. Interactive Student Viewers</h3>
              <p>Learning requires engagement. That is why we provide responsive timeline players, discussion forums, and persistent note scratchpads.</p>
            </div>

            <div className="value-card animate-slide-right">
              <div className="val-icon-wrap">
                <Heart size={24} />
              </div>
              <h3>3. Verifiable Certification</h3>
              <p>Complete 100% of your course syllabus lessons and receive a verifiable completion certificate ready for your CV or LinkedIn portfolio.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive History Timeline Section */}
      <section className="timeline-section section">
        <div className="container">
          <div className="section-header text-center">
            <span className="badge badge-primary">Our Journey</span>
            <h2>EduSphere Timeline Milestones</h2>
            <p className="section-subtitle">Click the years below to view how our Learning Management System scaled.</p>
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
                    <span className="timeline-tag">Year {node.year}</span>
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
