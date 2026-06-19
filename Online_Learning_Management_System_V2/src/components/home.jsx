import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, CheckCircle, GraduationCap, Video, BarChart2 } from 'lucide-react';
import LMSFeatureCard from './lmsfeaturecard';
import useTranslation from '../hooks/useTranslation';
import './home.css';

export default function Home() {
  const { t, lang } = useTranslation();

  const features = [
    {
      iconName: 'GraduationCap',
      title: lang === 'es' ? 'Rutas Estructuradas' : lang === 'hi' ? 'संरचित पाठ्यक्रम' : 'Structured Course Path',
      description: lang === 'es' ? 'Acceda a rutas de aprendizaje seleccionadas desde principiante hasta avanzado.' : lang === 'hi' ? 'शुरुआती स्तर से लेकर उन्नत विषयों तक के पाठ्यक्रम का उपयोग करें।' : 'Access curated learning paths mapped from absolute beginner concepts to advanced, job-ready topics.',
      badge: lang === 'es' ? 'Cursos' : lang === 'hi' ? 'पाठ्यक्रम' : 'Courses'
    },
    {
      iconName: 'Video',
      title: t('Feature 1'),
      description: t('Feature 1 Sub'),
      badge: lang === 'es' ? 'Inmersivo' : lang === 'hi' ? 'इमर्सिव' : 'Immersive'
    },
    {
      iconName: 'BarChart2',
      title: lang === 'es' ? 'Alertas y Progreso' : lang === 'hi' ? 'प्रगति और अलर्ट' : 'Progress & Analytics',
      description: lang === 'es' ? 'Realice un seguimiento de las puntuaciones de los cuestionarios y las certificaciones.' : lang === 'hi' ? 'क्विज़ स्कोर, पूर्णता पदक और प्रगति को आसानी से ट्रैक करें।' : 'Track quiz scores, completion badges, and syllabus progress automatically.',
      badge: lang === 'es' ? 'Análisis' : lang === 'hi' ? 'विश्लेषण' : 'Analytics'
    }
  ];

  const handleDemoAlert = () => {
    alert(lang === 'es' ? "¡La demostración estará disponible pronto! Mantenimiento en curso." : lang === 'hi' ? "डेमो जल्द ही उपलब्ध होगा! निर्धारित रखरखाव प्रगति पर है।" : "The interactive product tour demo will be loaded soon! Undergoing scheduled system maintenance.");
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <header className="hero-section text-center">
        <div className="container hero-container-centered animate-fade-in">
          <span className="hero-tagline">⚡ {lang === 'es' ? 'Plataforma de Aprendizaje de Próxima Generación' : lang === 'hi' ? 'अगली पीढ़ी का ई-लर्निंग प्लेटफॉर्म' : 'Next Generation E-Learning Platform'}</span>
          <h1>{t('Hero Title')}</h1>
          <p className="hero-subtitle">
            {t('Hero Sub')}
          </p>
          <div className="hero-cta">
            <Link to="/signup" className="btn btn-primary">
              {t('Get Started')} <ArrowRight size={18} />
            </Link>
            <button onClick={handleDemoAlert} className="btn btn-secondary">
              <Play size={16} fill="currentColor" /> {lang === 'es' ? 'Ver Demostración' : lang === 'hi' ? 'टूर देखें' : 'Watch Tour'}
            </button>
          </div>
          
          {/* Quick Stats Row */}
          <div className="hero-stats-row">
            <span><strong>15,000+</strong> {lang === 'es' ? 'Estudiantes' : lang === 'hi' ? 'छात्र' : 'Students'}</span>
            <span className="divider">•</span>
            <span><strong>250+</strong> {lang === 'es' ? 'Cursos' : lang === 'hi' ? 'पाठ्यक्रम' : 'Courses'}</span>
            <span className="divider">•</span>
            <span><strong>99.8%</strong> {lang === 'es' ? 'Finalización' : lang === 'hi' ? 'पूर्णता दर' : 'Completion Rate'}</span>
          </div>
        </div>
      </header>

      {/* LMS Description/Overview Section */}
      <section className="about-section section">
        <div className="container about-grid-simple">
          <div className="about-content animate-fade-in">
            <span className="badge badge-primary">{lang === 'es' ? 'Sobre el Sistema' : lang === 'hi' ? 'सिस्टम के बारे में' : 'About Our System'}</span>
            <h2>{lang === 'es' ? '¿Qué es EduSphere LMS?' : lang === 'hi' ? 'एडुस्फीयर एलएमएस क्या है?' : 'What is EduSphere LMS?'}</h2>
            <p className="about-text">
              {lang === 'es' ? 'EduSphere es un sistema de gestión de aprendizaje en la nube que conecta a estudiantes y profesores de forma fluida. Ofrece aulas interactivas, cuestionarios dinámicos y paneles de control robustos en el navegador.' : lang === 'hi' ? 'एडुस्फीयर एक मजबूत, उत्तरदायी क्लाइंट-साइड ई-लर्निंग सिस्टम है जो शिक्षार्थियों और शिक्षकों को सीधे जोड़ता है। यह ब्राउज़र में आधुनिक नियंत्रण और सुगमता प्रदान करता है।' : 'EduSphere is a robust, responsive web-based Online Learning Management System designed to bridge the gap between students, educators, and curriculum delivery. By hosting a modern platform with advanced user dashboards, course tracking, and live virtual support, we offer an uncompromised classroom experience right in the browser.'}
            </p>
            <div className="about-features-row">
              <div className="about-feat-item">
                <CheckCircle size={20} className="check-icon" />
                <div>
                  <h4>{lang === 'es' ? 'Para Estudiantes' : lang === 'hi' ? 'छात्रों के लिए' : 'For Students'}</h4>
                  <p>{lang === 'es' ? 'Estudie en cualquier dispositivo, complete cuestionarios y obtenga certificados.' : lang === 'hi' ? 'किसी भी डिवाइस पर सीखें, क्विज़ पूरा करें और प्रमाणपत्र प्राप्त करें।' : 'Study on any device, submit assignments, and get verifiable certificates.'}</p>
                </div>
              </div>
              <div className="about-feat-item">
                <CheckCircle size={20} className="check-icon" />
                <div>
                  <h4>{lang === 'es' ? 'Para Profesores' : lang === 'hi' ? 'शिक्षकों के लिए' : 'For Educators'}</h4>
                  <p>{lang === 'es' ? 'Cree nuevos capítulos de cursos, responda dudas y configure exámenes.' : lang === 'hi' ? 'कक्षाओं का निर्माण करें, छात्रों के संदेहों को हल करें और प्रगति देखें।' : 'Build custom course chapters, grade papers, and track class analytics.'}</p>
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
            <span className="badge badge-primary">{lang === 'es' ? 'Módulos Clave' : lang === 'hi' ? 'मुख्य मॉड्यूल' : 'Key Modules'}</span>
            <h2>{t('Key Features')}</h2>
            <p className="section-subtitle text-muted">
              {lang === 'es' ? 'Diseñado para ofrecer consistencia visual y rendimiento de primera clase.' : lang === 'hi' ? 'एक सहज और सुलभ अनुभव प्रदान करने के लिए आधुनिक वास्तुकला पर निर्मित।' : 'Built using state of the art models to deliver visual consistency and performance.'}
            </p>
          </div>
          <div className="features-grid-simple">
            {features.map((feature, index) => (
              <LMSFeatureCard 
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
            <h2>{lang === 'es' ? '¿Listo para transformar tus habilidades?' : lang === 'hi' ? 'क्या आप अपने कौशल को बदलने के लिए तैयार हैं?' : 'Ready to Transform Your Skills?'}</h2>
            <p>{lang === 'es' ? 'Únase a miles de estudiantes que adquieren certificados y aseguran roles profesionales hoy.' : lang === 'hi' ? 'हजारों शिक्षार्थियों में शामिल हों जो आज प्रमाणपत्र प्राप्त कर रहे हैं और नई ऊंचाइयों को छू रहे हैं।' : 'Join thousands of active learners who are acquiring certificates and securing developer roles today.'}</p>
            <div className="cta-buttons">
              <Link to="/signup" className="btn btn-accent">
                {lang === 'es' ? 'Regístrate Ahora' : lang === 'hi' ? 'अभी साइन अप करें' : 'Sign Up Now'} <ArrowRight size={18} />
              </Link>
              <Link to="/login" className="btn btn-secondary">
                {t('Log In')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
