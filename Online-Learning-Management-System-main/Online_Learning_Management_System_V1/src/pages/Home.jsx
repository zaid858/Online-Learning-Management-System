import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, CheckCircle, GraduationCap, Video, BarChart2 } from 'lucide-react';
import FeatureCard from '../components/FeatureCard';
import './Home.css';

export default function Home() {
  const features = [
    {
      iconName: 'GraduationCap',
      title: 'Structured Course Path',
      description: 'Access curated learning paths mapped from absolute beginner concepts to advanced, job-ready topics.',
      badge: 'Courses'
    },
    {
      iconName: 'Video',
      title: 'Interactive Video Hub',
      description: 'Stream high-definition lectures with synchronized bookmarks, direct notes, and instructor Q&A panels.',
      badge: 'Immersive'
    },
    {
      iconName: 'BarChart2',
      title: 'Visual Progress Reports',
      description: 'Track your quiz scores, completion badges, and study hours automatically with an intuitive dashboard.',
      badge: 'Analytics'
    }
  ];

  const handleDemoAlert = () => {
    alert("The interactive product tour demo will be loaded soon! Undergoing scheduled system maintenance.");
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <header className="hero-section text-center">
        <div className="container hero-container-centered animate-fade-in">
          <span className="hero-tagline">⚡ Next Generation E-Learning Platform</span>
          <h1>Empower Your Learning Journey</h1>
          <p className="hero-subtitle">
            EduSphere is an all-in-one Online Learning Management System designed to offer immersive, self-paced, and community-driven education. Level up your career with courses created by industry-leading professionals.
          </p>
          <div className="hero-cta">
            <Link to="/signup" className="btn btn-primary">
              Get Started Now <ArrowRight size={18} />
            </Link>
            <button onClick={handleDemoAlert} className="btn btn-secondary">
              <Play size={16} fill="currentColor" /> Watch Tour
            </button>
          </div>
          
          {/* Quick Stats Row */}
          <div className="hero-stats-row">
            <span><strong>15,000+</strong> Students</span>
            <span className="divider">•</span>
            <span><strong>250+</strong> Courses</span>
            <span className="divider">•</span>
            <span><strong>99.8%</strong> Completion Rate</span>
          </div>
        </div>
      </header>

      {/* LMS Description/Overview Section */}
      <section className="about-section section">
        <div className="container about-grid-simple">
          <div className="about-content animate-fade-in">
            <span className="badge badge-primary">About Our System</span>
            <h2>What is EduSphere LMS?</h2>
            <p className="about-text">
              EduSphere is a robust, responsive web-based Online Learning Management System designed to bridge the gap between students, educators, and curriculum delivery. By hosting a modern platform with advanced user dashboards, course tracking, and live virtual support, we offer an uncompromised classroom experience right in the browser.
            </p>
            <div className="about-features-row">
              <div className="about-feat-item">
                <CheckCircle size={20} className="check-icon" />
                <div>
                  <h4>For Students</h4>
                  <p>Study on any device, submit assignments, and get verifiable certificates.</p>
                </div>
              </div>
              <div className="about-feat-item">
                <CheckCircle size={20} className="check-icon" />
                <div>
                  <h4>For Educators</h4>
                  <p>Build custom course chapters, grade papers, and track class analytics.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features/Modules Grid Section */}
      <section className="features-section section">
        <div className="container">
          <div className="section-header text-center">
            <span className="badge badge-primary">Key Modules</span>
            <h2>Core Platform Features</h2>
            <p className="section-subtitle text-muted">
              Built using state of the art models to deliver visual consistency and performance.
            </p>
          </div>
          <div className="features-grid-simple">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                iconName={feature.iconName}
                title={feature.title}
                description={feature.description}
                badge={feature.badge}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section section">
        <div className="container cta-container">
          <div className="cta-content text-center animate-fade-in">
            <h2>Ready to Transform Your Skills?</h2>
            <p>Join thousands of active learners who are acquiring certificates and securing developer roles today.</p>
            <div className="cta-buttons">
              <Link to="/signup" className="btn btn-accent">
                Sign Up Now <ArrowRight size={18} />
              </Link>
              <Link to="/login" className="btn btn-secondary">
                Log In to Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
