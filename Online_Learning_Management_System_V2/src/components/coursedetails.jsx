import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Clock, BookOpen, ChevronDown, ChevronUp, Check, ShieldCheck, PlayCircle, Award, ArrowLeft } from 'lucide-react';
import { courses, instructors } from '../data/coursesData';
import useTranslation from '../hooks/useTranslation';
import './coursedetails.css';

export default function CourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [instructor, setInstructor] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
    let foundCourse = storedCourses.find(c => c.id === courseId);
    if (!foundCourse) {
      foundCourse = courses.find(c => c.id === courseId);
    }
    if (!foundCourse) {
      navigate('/courses');
      return;
    }
    setCourse(foundCourse);

    const foundInstructor = instructors.find(i => i.id === foundCourse.instructorId);
    setInstructor(foundInstructor);

    // Check enrollment
    const enrolled = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    setIsEnrolled(enrolled.includes(foundCourse.id));
  }, [courseId, navigate]);

  if (!course) {
    return <div className="container" style={{ padding: '8rem 2rem', textAlign: 'center' }}>{t('Loading course details...')}</div>;
  }

  const handleEnroll = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      // Direct user to log in
      alert(t('Login Alert'));
      navigate('/login', { state: { from: `/courses/${course.id}` } });
      return;
    }

    const enrolled = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    if (!enrolled.includes(course.id)) {
      enrolled.push(course.id);
      localStorage.setItem('enrolledCourses', JSON.stringify(enrolled));
      setIsEnrolled(true);
      alert(`${t('Success Enrolled')} ${t(course.title)}! ${t('Welcome Class')}`);
    }
  };

  const toggleChapter = (index) => {
    setActiveChapter(activeChapter === index ? -1 : index);
  };

  return (
    <div className="course-details-page">
      {/* Detail Hero Section */}
      <header className="details-hero">
        <div className="container details-hero-grid animate-fade-in">
          <div className="hero-left">
            <Link to="/courses" className="back-link">
              <ArrowLeft size={16} /> {t('Back to Courses')}
            </Link>
            
            <div className="hero-meta">
              <span className="category-tag">{t(course.category)}</span>
              <span className="difficulty-tag">{t(course.difficulty)}</span>
            </div>

            <h1 className="course-hero-title">{t(course.title)}</h1>
            <p className="course-tagline">{t(course.description)}</p>
            
            <div className="hero-stats">
              <div className="rating-block">
                <Star size={18} className="star-icon" fill="currentColor" />
                <span className="rating-num">{course.rating}</span>
                <span className="review-num">({course.reviewsCount} {t('reviews')})</span>
              </div>
              <span className="divider">|</span>
              <span><strong>10,000+</strong> {t('Enrolled Students')}</span>
            </div>
            
            {instructor && (
              <div className="instructor-meta-row">
                <div className="instructor-badge-small">
                  {instructor.avatar}
                </div>
                <span>{t('Created by')} <strong>{t(instructor.name)}</strong></span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="container details-body-grid">
        <main className="details-main-content animate-slide-left">
          {/* Section: Overview */}
          <section className="details-card-section">
            <h2>{t('Course Description')}</h2>
            <p className="long-description-text">{t(course.longDescription)}</p>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>{t('What You Will Learn')}</h3>
            <div className="learning-outcomes-grid">
              <div className="outcome-item">
                <Check size={18} className="check-icon" />
                <span>{t('Outcome 1')}</span>
              </div>
              <div className="outcome-item">
                <Check size={18} className="check-icon" />
                <span>{t('Outcome 2')}</span>
              </div>
              <div className="outcome-item">
                <Check size={18} className="check-icon" />
                <span>{t('Outcome 3')}</span>
              </div>
              <div className="outcome-item">
                <Check size={18} className="check-icon" />
                <span>{t('Outcome 4')}</span>
              </div>
            </div>
          </section>

          {/* Section: Curriculum */}
          <section className="details-card-section">
            <h2>{t('Course Syllabus')}</h2>
            <div className="curriculum-list">
              {course.syllabus.map((chapter, index) => {
                const isOpen = activeChapter === index;
                return (
                  <div key={index} className="curriculum-chapter">
                    <button 
                      className={`chapter-header-btn ${isOpen ? 'open' : ''}`}
                      onClick={() => toggleChapter(index)}
                    >
                      <div className="chapter-title-group">
                        <span className="chapter-label">{t('Module')} {index + 1}</span>
                        <h4>{t(chapter.chapterTitle)}</h4>
                      </div>
                      <div className="chapter-meta-group">
                        <span className="lesson-count">{chapter.lessons.length} {t('lessons')}</span>
                        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="chapter-lessons-list">
                        {chapter.lessons.map((lesson) => (
                          <div key={lesson.id} className="lesson-row-item">
                            <div className="lesson-title-side">
                              <PlayCircle size={16} className="play-icon" />
                              <span>{t(lesson.title)}</span>
                            </div>
                            <span className="lesson-time">{t(lesson.duration)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section: Instructor */}
          {instructor && (
            <section className="details-card-section instructor-details-section">
              <h2>{t('Your Instructor')}</h2>
              <div className="instructor-profile-card">
                <div className="instructor-card-header">
                  <div className="instructor-avatar-big">
                    {instructor.avatar}
                  </div>
                  <div>
                    <h3>{t(instructor.name)}</h3>
                    <p className="instructor-card-role">{t(instructor.role)}</p>
                    <div className="instructor-quick-ratings">
                      <Star size={15} className="star-icon" fill="currentColor" />
                      <span><strong>{instructor.rating}</strong> {t('Instructor Rating')}</span>
                      <span className="bullet">•</span>
                      <span><strong>{instructor.students}</strong> {t('Students')}</span>
                    </div>
                  </div>
                </div>
                <p className="instructor-bio-text">{t(instructor.bio)}</p>
              </div>
            </section>
          )}
        </main>

        {/* Sticky Pricing / Actions Sidebar */}
        <aside className="details-sidebar-content animate-slide-right">
          <div className="sidebar-sticky-card">
            <div className="sidebar-banner-placeholder">
              <PlayCircle size={48} className="banner-play-icon" />
              <span>{t('Preview Course')}</span>
            </div>

            <div className="sidebar-pricing-block">
              <span className="price-tag">{course.price.toLowerCase() === 'free' ? t('Free') : t(course.price)}</span>
              <span className="guarantee-text">{t('Free Lifetime Access')}</span>
            </div>

            <div className="sidebar-actions-wrap">
              {isEnrolled ? (
                <Link 
                  to={`/courses/${course.id}/learn`} 
                  className="btn btn-primary btn-full enroll-cta-btn"
                >
                  {t('Go to Classroom')}
                </Link>
              ) : (
                <button 
                  onClick={handleEnroll} 
                  className="btn btn-primary btn-full enroll-cta-btn"
                >
                  {t('Enroll Now')}
                </button>
              )}
            </div>

            <div className="sidebar-features-list">
              <h5 style={{ fontWeight: '700', marginBottom: '0.75rem' }}>{t('Course Includes')}</h5>
              <div className="side-feat-item">
                <Clock size={16} /> <span>{t(course.duration)} {t('on-demand video')}</span>
              </div>
              <div className="side-feat-item">
                <BookOpen size={16} /> <span>{course.lecturesCount} {t('comprehensive modules')}</span>
              </div>
              <div className="side-feat-item">
                <Award size={16} /> <span>{t('Certificate of Completion')}</span>
              </div>
              <div className="side-feat-item">
                <ShieldCheck size={16} /> <span>{t('Lifetime License')}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
