import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Users, MessageSquare, Award, BookOpen } from 'lucide-react';
import { instructors, courses } from '../data/coursesData';
import useTranslation from '../hooks/useTranslation';
import './instructors.css';

export default function Instructors() {
  const { t } = useTranslation();

  const getInstructorCourses = (instructorId) => {
    return courses.filter(c => c.instructorId === instructorId);
  };

  return (
    <div className="instructors-page container">
      {/* Page Header */}
      <header className="instructors-header animate-fade-in">
        <span className="badge badge-primary">{t('Our Faculty')}</span>
        <h1>{t('Meet Our Expert Instructors')}</h1>
        <p className="subtitle">
          {t('Faculty Subtitle')}
        </p>
      </header>

      {/* Instructors Directory Grid */}
      <main className="instructors-grid animate-fade-in">
        {instructors.map((inst) => {
          const taughtCourses = getInstructorCourses(inst.id);
          
          return (
            <article key={inst.id} className="instructor-profile-card">
              <div className="instructor-header-group">
                <div className="instructor-avatar-ring">
                  {inst.avatar}
                </div>
                <div className="instructor-identity">
                  <h2>{t(inst.name)}</h2>
                  <p className="instructor-title-label">{t(inst.role)}</p>
                </div>
              </div>

              {/* Statistics row */}
              <div className="instructor-stats-row">
                <div className="stat-node">
                  <Star size={16} className="star-icon" fill="currentColor" />
                  <span><strong>{inst.rating}</strong> {t('Rating')}</span>
                </div>
                <div className="stat-node">
                  <Users size={16} className="users-icon" />
                  <span><strong>{inst.students}</strong> {t('Students')}</span>
                </div>
                <div className="stat-node">
                  <MessageSquare size={16} className="reviews-icon" />
                  <span><strong>{inst.reviewsCount}</strong> {t('Reviews')}</span>
                </div>
              </div>

              <div className="instructor-body-details">
                <h4>{t('Biography')}</h4>
                <p className="instructor-bio-text">{t(inst.bio)}</p>

                <h4>{t('Areas of Expertise')}</h4>
                <div className="expertise-tags-wrap">
                  {inst.expertise.split(',').map((exp, idx) => (
                    <span key={idx} className="exp-tag">{t(exp.trim())}</span>
                  ))}
                </div>

                {taughtCourses.length > 0 && (
                  <div className="taught-courses-zone">
                    <h4>{t('Courses Taught')}</h4>
                    <div className="taught-courses-links-list">
                      {taughtCourses.map((c) => (
                        <Link 
                          key={c.id} 
                          to={`/courses/${c.id}`} 
                          className="taught-course-link-item"
                        >
                          <BookOpen size={14} />
                          <span className="c-link-title">{t(c.title)}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </main>
    </div>
  );
}
