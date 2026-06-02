import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Award, BookOpen, Settings, CheckCircle, Clock, X, ChevronRight } from 'lucide-react';
import { courses, instructors } from '../data/coursesData';
import './Profile.css';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [enrolledIds, setEnrolledIds] = useState([]);
  const [progressData, setProgressData] = useState({});
  const [activeTab, setActiveTab] = useState('courses');

  // Modal State for Certificate
  const [selectedCertificateCourse, setSelectedCertificateCourse] = useState(null);

  // Edit Settings state
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [settingsSuccess, setSettingsSuccess] = useState(false);
  const [coursesList, setCoursesList] = useState([]);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!loggedIn) {
      alert("Please log in to view your dashboard!");
      navigate('/login');
      return;
    }

    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(userData);
    setEditName(userData.name || '');
    setEditEmail(userData.email || '');

    const enrolled = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    setEnrolledIds(enrolled);

    const progress = JSON.parse(localStorage.getItem('lessonProgress') || '{}');
    setProgressData(progress);

    // Read courses dynamically from localStorage
    const storedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
    if (storedCourses.length > 0) {
      setCoursesList(storedCourses);
    } else {
      setCoursesList(courses);
    }
  }, [navigate]);

  if (!user) {
    return <div className="container" style={{ padding: '8rem 2rem', textAlign: 'center' }}>Loading profile...</div>;
  }

  const getCourseProgress = (course) => {
    const allLessonIds = [];
    course.syllabus.forEach(chapter => {
      chapter.lessons.forEach(lesson => {
        allLessonIds.push(lesson.id);
      });
    });

    if (allLessonIds.length === 0) return 0;
    const completedCount = allLessonIds.filter(id => !!progressData[id]).length;
    return Math.round((completedCount / allLessonIds.length) * 100);
  };

  const getInstructorName = (instructorId) => {
    const inst = instructors.find(i => i.id === instructorId);
    return inst ? inst.name : 'Unknown';
  };

  // Filter courses that are enrolled
  const enrolledCourses = coursesList.filter(c => enrolledIds.includes(c.id));

  // Determine completed courses for certificates (progress === 100%)
  const completedCourses = enrolledCourses.filter(c => getCourseProgress(c) === 100);

  // Dynamic recommendations based on enrolled course categories
  const getRecommendedCourses = () => {
    const enrolledCategories = enrolledCourses.map(c => c.category);
    
    if (enrolledCategories.length === 0) {
      // Return top 2 courses user is not enrolled in
      return coursesList.filter(c => !enrolledIds.includes(c.id)).slice(0, 2);
    }
    
    const matching = coursesList.filter(c => 
      enrolledCategories.includes(c.category) && 
      !enrolledIds.includes(c.id)
    );
    
    if (matching.length > 0) {
      return matching.slice(0, 2);
    }
    
    return coursesList.filter(c => !enrolledIds.includes(c.id)).slice(0, 2);
  };

  const recommendedCourses = getRecommendedCourses();

  const handleSaveSettings = (e) => {
    e.preventDefault();
    if (!editName.trim() || !editEmail.trim()) {
      alert("Fields cannot be empty!");
      return;
    }

    const updatedUser = { ...user, name: editName, email: editEmail };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    
    // Dispatch a storage event to force header re-render immediately
    window.dispatchEvent(new Event('storage'));
    
    setSettingsSuccess(true);
    setTimeout(() => setSettingsSuccess(false), 2000);
  };

  return (
    <div className="profile-page container">
      {/* Dashboard Header Profile Panel */}
      <header className="profile-dashboard-card animate-fade-in">
        <div className="profile-details-left">
          <div className="profile-avatar-giant">
            {user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'ST'}
          </div>
          <div className="profile-text-group">
            <h1>Welcome, {user.name}!</h1>
            <p className="profile-email-label">{user.email}</p>
            <span className="badge badge-primary">Student Account</span>
          </div>
        </div>

        {/* Global profile statistics */}
        <div className="profile-quick-stats">
          <div className="stat-card-box">
            <BookOpen size={24} className="stat-card-icon color-primary" />
            <div className="stat-text">
              <strong>{enrolledCourses.length}</strong>
              <span>Courses Enrolled</span>
            </div>
          </div>
          
          <div className="stat-card-box">
            <Award size={24} className="stat-card-icon color-success" />
            <div className="stat-text">
              <strong>{completedCourses.length}</strong>
              <span>Certificates Earned</span>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs navigation */}
      <section className="profile-tabs-nav animate-fade-in">
        <button 
          className={`profile-tab-btn ${activeTab === 'courses' ? 'active' : ''}`}
          onClick={() => setActiveTab('courses')}
        >
          <BookOpen size={16} /> Enrolled Courses
        </button>
        <button 
          className={`profile-tab-btn ${activeTab === 'certificates' ? 'active' : ''}`}
          onClick={() => setActiveTab('certificates')}
        >
          <Award size={16} /> Certificates ({completedCourses.length})
        </button>
        <button 
          className={`profile-tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <Settings size={16} /> Account Settings
        </button>
      </section>

      {/* Dynamic Tab Panes */}
      <main className="profile-tab-panel animate-fade-in">
        
        {/* Tab 1: Enrolled Courses */}
        {activeTab === 'courses' && (
          <div className="tab-pane-wrapper courses-dashboard-layout">
            <div className="courses-main-section">
              <h2>Your Active Courses</h2>
              <p className="section-desc-sub text-muted">Track your progress and resume learning modules.</p>

              {enrolledCourses.length > 0 ? (
                <div className="profile-courses-grid">
                  {enrolledCourses.map((course) => {
                    const progress = getCourseProgress(course);
                    return (
                      <article key={course.id} className="profile-course-card">
                        <div className="p-course-content">
                          <span className="p-course-category">{course.category}</span>
                          <h3>{course.title}</h3>
                          <p className="p-course-instructor">Instructor: {getInstructorName(course.instructorId)}</p>
                          
                          {/* Progress ring/bar info */}
                          <div className="p-course-progress-block">
                            <div className="p-progress-text-row">
                              <span>Syllabus Completed</span>
                              <strong>{progress}%</strong>
                            </div>
                            <div className="p-progress-bar-track">
                              <div 
                                className="p-progress-bar-fill"
                                style={{ width: `${progress}%` }}
                              ></div>
                            </div>
                          </div>

                          <div className="p-course-actions">
                            <Link 
                              to={`/courses/${course.id}/learn`}
                              className="btn btn-primary btn-full p-study-btn"
                            >
                              {progress === 100 ? 'Review Lectures' : 'Resume Learning'}
                            </Link>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="profile-empty-state text-center">
                  <BookOpen size={48} className="empty-state-icon" />
                  <h3>Not Enrolled in Any Courses Yet</h3>
                  <p>Browse our catalog to select a learning path and begin your coding journey.</p>
                  <Link to="/courses" className="btn btn-primary">Browse Courses <ChevronRight size={16} /></Link>
                </div>
              )}
            </div>

            {/* Sidebar section: study reminders & recommended courses */}
            <div className="courses-sidebar-section">
              {/* Study Reminders */}
              <div className="dashboard-widget-card reminders-widget animate-fade-in">
                <h3>🔔 Study Streak & Reminders</h3>
                <div className="reminders-list">
                  <div className="reminder-item-node">
                    <span className="reminder-icon">🔥</span>
                    <div>
                      <strong>Streak: Keep up your 3-day study streak!</strong>
                      <p>Complete a lesson today to extend it.</p>
                    </div>
                  </div>
                  {enrolledCourses.length > 0 && enrolledCourses.some(c => getCourseProgress(c) < 100) && (
                    <div className="reminder-item-node">
                      <span className="reminder-icon">📝</span>
                      <div>
                        <strong>Chapter Checkpoint Reminder</strong>
                        <p>Complete the quiz for {enrolledCourses.find(c => getCourseProgress(c) < 100).title}.</p>
                      </div>
                    </div>
                  )}
                  <div className="reminder-item-node">
                    <span className="reminder-icon">💡</span>
                    <div>
                      <strong>Need help?</strong>
                      <p>Use the AI Tutor chatbot tab inside the classroom viewer!</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personalized Recommended Courses */}
              <div className="dashboard-widget-card recommendations-widget animate-fade-in">
                <h3>🎯 Recommended for You</h3>
                <div className="recommendations-list">
                  {recommendedCourses.length > 0 ? (
                    recommendedCourses.map(rec => (
                      <div key={rec.id} className="rec-item-card">
                        <span className="rec-category">{rec.category}</span>
                        <h4>{rec.title}</h4>
                        <div className="rec-footer">
                          <span className="rec-rating">⭐ {rec.rating}</span>
                          <Link to={`/courses/${rec.id}`} className="rec-link">
                            View Course
                          </Link>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="no-rec-text">No recommendations available. Enroll in more courses to get tailored suggestions!</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Certificates */}
        {activeTab === 'certificates' && (
          <div className="tab-pane-wrapper">
            <h2>Earned Certificates</h2>
            <p className="section-desc-sub text-muted">Complete 100% of a course curriculum to unlock your certificate.</p>

            {completedCourses.length > 0 ? (
              <div className="certificates-list-grid">
                {completedCourses.map((course) => (
                  <article key={course.id} className="certificate-unlock-card animate-fade-in">
                    <div className="cert-left-design">
                      <Award size={36} className="cert-card-medal" />
                    </div>
                    <div className="cert-details-block">
                      <span className="cert-meta-label">Verifiable Certificate</span>
                      <h3>Certificate of Excellence</h3>
                      <p className="cert-course-name">Course: {course.title}</p>
                      <button 
                        className="btn btn-accent cert-action-btn"
                        onClick={() => setSelectedCertificateCourse(course)}
                      >
                        View Certificate
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="profile-empty-state text-center">
                <Award size={48} className="empty-state-icon" />
                <h3>No Certificates Available</h3>
                <p>Complete 100% of your enrolled courses' lessons in the classroom viewer to unlock certificates of excellence.</p>
                <Link to="/courses" className="btn btn-secondary">Resume Study Path</Link>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Account Settings */}
        {activeTab === 'settings' && (
          <div className="tab-pane-wrapper settings-pane">
            <h2>Edit Account Profile</h2>
            <p className="section-desc-sub text-muted">Modify registration coordinates. Updates occur instantly.</p>

            {settingsSuccess && (
              <div className="custom-alert custom-alert-success animate-fade-in" style={{ marginBottom: '1.5rem' }}>
                <CheckCircle size={18} />
                <span>Account settings saved successfully! Navigation displays updated initials.</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="settings-edit-form">
              <div className="form-group">
                <label className="form-label" htmlFor="edit-name">Full Display Name</label>
                <input 
                  id="edit-name"
                  type="text" 
                  className="form-input" 
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="edit-email">Account Email Address</label>
                <input 
                  id="edit-email"
                  type="email" 
                  className="form-input" 
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary save-settings-submit">
                Save Profile Settings
              </button>
            </form>
          </div>
        )}

      </main>

      {/* Certificate Viewer Overlay Modal */}
      {selectedCertificateCourse && (
        <div className="certificate-modal-overlay">
          <div className="certificate-modal-container animate-fade-in">
            {/* Modal Header */}
            <div className="modal-header-actions">
              <button 
                className="close-modal-btn"
                onClick={() => setSelectedCertificateCourse(null)}
                aria-label="Close Certificate"
              >
                <X size={24} />
              </button>
            </div>

            {/* Certificate Premium Printable Design */}
            <div className="printable-certificate-frame">
              <div className="cert-border-outer">
                <div className="cert-border-inner">
                  {/* Watermark/Decorative Badge background */}
                  <div className="cert-watermark-icon">EduSphere</div>
                  
                  <header className="cert-main-header">
                    <span className="cert-accent-bar"></span>
                    <h1>CERTIFICATE OF COMPLETION</h1>
                    <p className="cert-award-statement">This certificate is proudly presented to</p>
                  </header>

                  <main className="cert-body-awardee">
                    <h2 className="awardee-name">{user.name}</h2>
                    <p className="cert-achievement-text">
                      for successfully completing all curriculum, chapter checkpoints, and lecture requirements for the professional syllabus
                    </p>
                    <h3 className="cert-course-title-label">{selectedCertificateCourse.title}</h3>
                  </main>

                  <footer className="cert-signatures-footer">
                    <div className="signature-block">
                      <div className="sign-line cursive-sign">John Smith</div>
                      <span className="sign-divider"></span>
                      <p className="signer-role">EduSphere LMS Director</p>
                    </div>

                    {/* Decorative gold emblem */}
                    <div className="cert-gold-emblem">
                      <Award size={40} className="gold-medal-icon" />
                    </div>

                    <div className="signature-block">
                      <div className="sign-line cursive-sign">
                        {getInstructorName(selectedCertificateCourse.instructorId)}
                      </div>
                      <span className="sign-divider"></span>
                      <p className="signer-role">Lead Syllabus Instructor</p>
                    </div>
                  </footer>

                  <div className="cert-serial-footer">
                    <span>Certificate verification: <strong>ES-{selectedCertificateCourse.id.toUpperCase()}-{user.name.split(' ').join('').toUpperCase()}</strong></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Download advice note */}
            <div className="modal-actions-footer">
              <button 
                className="btn btn-secondary" 
                onClick={() => window.print()}
              >
                Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
