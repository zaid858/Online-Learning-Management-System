import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Clock, BookOpen, ChevronDown, ChevronUp, Check, ShieldCheck, PlayCircle, Award, ArrowLeft } from 'lucide-react';
import { courses, instructors } from '../data/coursesData';
import './CourseDetails.css';

export default function CourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [instructor, setInstructor] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);

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
    return <div className="container" style={{ padding: '8rem 2rem', textAlign: 'center' }}>Loading course details...</div>;
  }

  const handleEnroll = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      // Direct user to log in
      alert("Please log in or sign up to enroll in this course!");
      navigate('/login', { state: { from: `/courses/${course.id}` } });
      return;
    }

    const enrolled = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    if (!enrolled.includes(course.id)) {
      enrolled.push(course.id);
      localStorage.setItem('enrolledCourses', JSON.stringify(enrolled));
      setIsEnrolled(true);
      alert(`Successfully enrolled in ${course.title}! Welcome to the class.`);
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
              <ArrowLeft size={16} /> Back to Courses
            </Link>
            
            <div className="hero-meta">
              <span className="category-tag">{course.category}</span>
              <span className="difficulty-tag">{course.difficulty}</span>
            </div>

            <h1 className="course-hero-title">{course.title}</h1>
            <p className="course-tagline">{course.description}</p>
            
            <div className="hero-stats">
              <div className="rating-block">
                <Star size={18} className="star-icon" fill="currentColor" />
                <span className="rating-num">{course.rating}</span>
                <span className="review-num">({course.reviewsCount} reviews)</span>
              </div>
              <span className="divider">|</span>
              <span><strong>10,000+</strong> Enrolled Students</span>
            </div>
            
            {instructor && (
              <div className="instructor-meta-row">
                <div className="instructor-badge-small">
                  {instructor.avatar}
                </div>
                <span>Created by <strong>{instructor.name}</strong></span>
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
            <h2>Course Description</h2>
            <p className="long-description-text">{course.longDescription}</p>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>What You Will Learn</h3>
            <div className="learning-outcomes-grid">
              <div className="outcome-item">
                <Check size={18} className="check-icon" />
                <span>Industry-ready frameworks and paradigms from scratch.</span>
              </div>
              <div className="outcome-item">
                <Check size={18} className="check-icon" />
                <span>Modern developer environments, toolings, and packaging.</span>
              </div>
              <div className="outcome-item">
                <Check size={18} className="check-icon" />
                <span>Hands-on projects to deploy directly onto your portfolio.</span>
              </div>
              <div className="outcome-item">
                <Check size={18} className="check-icon" />
                <span>Comprehensive quizzes to validate logical comprehension.</span>
              </div>
            </div>
          </section>

          {/* Section: Curriculum */}
          <section className="details-card-section">
            <h2>Course Curriculum</h2>
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
                        <span className="chapter-label">Module {index + 1}</span>
                        <h4>{chapter.chapterTitle}</h4>
                      </div>
                      <div className="chapter-meta-group">
                        <span className="lesson-count">{chapter.lessons.length} lessons</span>
                        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="chapter-lessons-list">
                        {chapter.lessons.map((lesson) => (
                          <div key={lesson.id} className="lesson-row-item">
                            <div className="lesson-title-side">
                              <PlayCircle size={16} className="play-icon" />
                              <span>{lesson.title}</span>
                            </div>
                            <span className="lesson-time">{lesson.duration}</span>
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
              <h2>Your Instructor</h2>
              <div className="instructor-profile-card">
                <div className="instructor-card-header">
                  <div className="instructor-avatar-big">
                    {instructor.avatar}
                  </div>
                  <div>
                    <h3>{instructor.name}</h3>
                    <p className="instructor-card-role">{instructor.role}</p>
                    <div className="instructor-quick-ratings">
                      <Star size={15} className="star-icon" fill="currentColor" />
                      <span><strong>{instructor.rating}</strong> Instructor Rating</span>
                      <span className="bullet">•</span>
                      <span><strong>{instructor.students}</strong> Students</span>
                    </div>
                  </div>
                </div>
                <p className="instructor-bio-text">{instructor.bio}</p>
              </div>
            </section>
          )}
        </main>

        {/* Sticky Pricing / Actions Sidebar */}
        <aside className="details-sidebar-content animate-slide-right">
          <div className="sidebar-sticky-card">
            <div className="sidebar-banner-placeholder">
              <PlayCircle size={48} className="banner-play-icon" />
              <span>Preview Course</span>
            </div>

            <div className="sidebar-pricing-block">
              <span className="price-tag">{course.price}</span>
              <span className="guarantee-text">Free Lifetime Access with Enrollment</span>
            </div>

            <div className="sidebar-actions-wrap">
              {isEnrolled ? (
                <Link 
                  to={`/courses/${course.id}/learn`} 
                  className="btn btn-primary btn-full enroll-cta-btn"
                >
                  Go to Classroom
                </Link>
              ) : (
                <button 
                  onClick={handleEnroll} 
                  className="btn btn-primary btn-full enroll-cta-btn"
                >
                  Enroll Now
                </button>
              )}
            </div>

            <div className="sidebar-features-list">
              <h5 style={{ fontWeight: '700', marginBottom: '0.75rem' }}>This course includes:</h5>
              <div className="side-feat-item">
                <Clock size={16} /> <span>{course.duration} on-demand study video</span>
              </div>
              <div className="side-feat-item">
                <BookOpen size={16} /> <span>{course.lecturesCount} comprehensive modules</span>
              </div>
              <div className="side-feat-item">
                <Award size={16} /> <span>Certificate of Completion (100% progress)</span>
              </div>
              <div className="side-feat-item">
                <ShieldCheck size={16} /> <span>Full lifetime accessibility license</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
