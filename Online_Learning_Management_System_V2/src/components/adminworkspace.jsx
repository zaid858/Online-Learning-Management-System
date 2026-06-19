import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Settings, Users, BookOpen, MessageSquare, Terminal, PlusCircle, CheckCircle, Trash } from 'lucide-react';
import { instructors } from '../data/coursesData';
import useTranslation from '../hooks/useTranslation';
import './adminworkspace.css';

export default function AdminWorkspace() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('metrics');
  const [localCourses, setLocalCourses] = useState([]);
  const [localUsers, setLocalUsers] = useState([
    { id: 1, name: 'Alex Rivera', email: 'alex@edusphere.org', role: 'student', status: 'Active' },
    { id: 2, name: 'Maya Lin', email: 'maya@edusphere.org', role: 'student', status: 'Active' },
    { id: 3, name: 'Dr. Jane Doe', email: 'jdoe@edusphere.org', role: 'instructor', status: 'Active' },
    { id: 4, name: 'John Smith', email: 'jsmith@edusphere.org', role: 'instructor', status: 'Active' },
    { id: 5, name: 'Admin Portal', email: 'admin@edusphere.org', role: 'admin', status: 'Active' }
  ]);
  const [localTickets, setLocalTickets] = useState([]);
  const [systemLogs, setSystemLogs] = useState([
    { id: 1, time: '10:14:02', text: 'System session mounted successfully.' },
    { id: 2, time: '10:14:32', text: 'LocalStorage courses registry initialized.' }
  ]);

  // Course Form state
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDesc, setCourseDesc] = useState('');
  const [courseLongDesc, setCourseLongDesc] = useState('');
  const [courseCat, setCourseCat] = useState('Development');
  const [courseDiff, setCourseDiff] = useState('Beginner');
  const [courseInst, setCourseInst] = useState('jsmith');
  const [courseDuration, setCourseDuration] = useState('20 hours');
  const [courseSuccess, setCourseSuccess] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    // Check credentials
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const role = localStorage.getItem('activeRole');
    if (!loggedIn || role !== 'admin') {
      alert(t("Access Denied. Administrator role required."));
      navigate('/');
      return;
    }

    // Load courses
    const storedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
    setLocalCourses(storedCourses);

    // Load support tickets
    const storedTickets = JSON.parse(localStorage.getItem('contactRequests') || '[]');
    setLocalTickets(storedTickets);
  }, [navigate]);

  const handleCreateCourse = (e) => {
    e.preventDefault();
    if (!courseTitle.trim() || !courseDesc.trim() || !courseLongDesc.trim()) {
      alert(t("Please fill in all course parameters."));
      return;
    }

    const newId = courseTitle.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const newCourseObj = {
      id: newId,
      instructorId: courseInst,
      title: courseTitle,
      category: courseCat,
      difficulty: courseDiff,
      price: 'Free',
      rating: 5.0,
      reviewsCount: 0,
      duration: courseDuration,
      lecturesCount: 0,
      description: courseDesc,
      longDescription: courseLongDesc,
      syllabus: [
        { chapterTitle: 'Module 1: Getting Started', lessons: [] }
      ],
      quizzes: []
    };

    const updatedCourses = [...localCourses, newCourseObj];
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
    setLocalCourses(updatedCourses);

    // Add log
    appendLog(`${t('Course created')}: "${courseTitle}" (ID: ${newId})`);

    // Reset Form
    setCourseTitle('');
    setCourseDesc('');
    setCourseLongDesc('');
    setCourseSuccess(true);
    setTimeout(() => setCourseSuccess(false), 3000);
  };

  const toggleUserStatus = (userId) => {
    const updatedUsers = localUsers.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'Active' ? 'Blocked' : 'Active';
        appendLog(`"${u.name}" - ${t('User account status toggled to')} ${t(nextStatus)}`);
        return { ...u, status: nextStatus };
      }
      return u;
    });
    setLocalUsers(updatedUsers);
  };

  const changeUserRole = (userId, newRole) => {
    const updatedUsers = localUsers.map(u => {
      if (u.id === userId) {
        appendLog(`"${u.name}" - ${t('User role updated to')} ${t(newRole)}`);
        return { ...u, role: newRole };
      }
      return u;
    });
    setLocalUsers(updatedUsers);
  };

  const resolveTicket = (ticketId) => {
    const updatedTickets = localTickets.map(ticket => {
      if (ticket.id === ticketId) {
        appendLog(`${t('Support ticket resolved')}: #${ticketId}`);
        return { ...ticket, status: 'Resolved' };
      }
      return ticket;
    });
    localStorage.setItem('contactRequests', JSON.stringify(updatedTickets));
    setLocalTickets(updatedTickets);
  };

  const deleteTicket = (ticketId) => {
    const updatedTickets = localTickets.filter(ticket => ticket.id !== ticketId);
    localStorage.setItem('contactRequests', JSON.stringify(updatedTickets));
    setLocalTickets(updatedTickets);
    appendLog(`${t('Support ticket deleted')}: #${ticketId}`);
  };

  const appendLog = (text) => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    setSystemLogs(prev => [
      { id: Date.now(), time: timeStr, text },
      ...prev
    ]);
  };

  return (
    <div className="admin-page container">
      {/* Workspace Header */}
      <header className="admin-header animate-fade-in">
        <span className="badge badge-primary">{t('Admin Panel')}</span>
        <h1>{t('Accessibility & Administrative Workspace')}</h1>
        <p className="subtitle">{t('Admin Workspace Subtitle')}</p>
      </header>

      {/* Tabs Menu */}
      <nav className="admin-tabs-nav animate-fade-in">
        <button className={`admin-tab-btn ${activeTab === 'metrics' ? 'active' : ''}`} onClick={() => setActiveTab('metrics')}>
          <Shield size={16} /> {t('Platform Metrics')}
        </button>
        <button className={`admin-tab-btn ${activeTab === 'course-creator' ? 'active' : ''}`} onClick={() => setActiveTab('course-creator')}>
          <PlusCircle size={16} /> {t('Course Creator')}
        </button>
        <button className={`admin-tab-btn ${activeTab === 'user-manager' ? 'active' : ''}`} onClick={() => setActiveTab('user-manager')}>
          <Users size={16} /> {t('User Directory')}
        </button>
        <button className={`admin-tab-btn ${activeTab === 'support-tickets' ? 'active' : ''}`} onClick={() => setActiveTab('support-tickets')}>
          <MessageSquare size={16} /> {t('Support Inbox')} ({localTickets.filter(ticket => ticket.status !== 'Resolved').length})
        </button>
        <button className={`admin-tab-btn ${activeTab === 'logs' ? 'active' : ''}`} onClick={() => setActiveTab('logs')}>
          <Terminal size={16} /> {t('System Activity Logs')}
        </button>
      </nav>

      {/* Tab Panels */}
      <main className="admin-panel-body animate-fade-in">

        {/* Tab 1: Platform Metrics */}
        {activeTab === 'metrics' && (
          <div className="tab-pane-wrapper">
            <h2>{t('Global Statistics')}</h2>
            <p className="section-desc-sub text-muted">{t('Admin Sub')}</p>

            <div className="admin-metrics-grid">
              <div className="admin-metric-card">
                <Users size={28} className="m-icon color-primary" />
                <strong>{localUsers.length}</strong>
                <span>{t('Registered Users')}</span>
              </div>
              <div className="admin-metric-card">
                <BookOpen size={28} className="m-icon color-success" />
                <strong>{localCourses.length}</strong>
                <span>{t('Courses Listed')}</span>
              </div>
              <div className="admin-metric-card">
                <MessageSquare size={28} className="m-icon color-accent" />
                <strong>{localTickets.length}</strong>
                <span>{t('Support Inquiries')}</span>
              </div>
            </div>

            <div className="system-health-block">
              <h3>⚡ {t('Portal Health Metrics')}</h3>
              <ul>
                <li>{t('Database connection state:')} <strong className="color-success">{t('Online (Mock LocalStorage SQL)')}</strong></li>
                <li>{t('API Route responsive speed:')} <strong>{t('4ms latency')}</strong></li>
                <li>{t('Accessibility mode states:')} <strong>{t('Active (Floating toggles)')}</strong></li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: Course Creator */}
        {activeTab === 'course-creator' && (
          <div className="tab-pane-wrapper">
            <h2>{t('Spawn Brand New Course')}</h2>
            <p className="section-desc-sub text-muted">{t('Complete form parameters below. The course compiles instantly and is published to the catalog.')}</p>

            {courseSuccess && (
              <div className="custom-alert custom-alert-success animate-fade-in" style={{ marginBottom: '1.5rem' }}>
                <CheckCircle size={18} />
                <span>{t('Course successfully compiled and published. Ready for student enrollments!')}</span>
              </div>
            )}

            <form onSubmit={handleCreateCourse} className="workspace-form">
              <div className="form-group">
                <label className="form-label" htmlFor="new-course-title">{t('Course Title')}</label>
                <input 
                  id="new-course-title"
                  type="text" 
                  className="form-input" 
                  placeholder={t('Course Title Placeholder')}
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-grid-3">
                <div className="form-group">
                  <label className="form-label" htmlFor="new-course-cat">{t('Category:')}</label>
                  <select 
                    id="new-course-cat"
                    className="form-input"
                    value={courseCat}
                    onChange={(e) => setCourseCat(e.target.value)}
                  >
                    <option value="Development">{t('Development')}</option>
                    <option value="Design">{t('Design')}</option>
                    <option value="Data Science">{t('Data Science')}</option>
                    <option value="Marketing">{t('Marketing')}</option>
                    <option value="Business">{t('Business')}</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="new-course-diff">{t('Difficulty:')}</label>
                  <select 
                    id="new-course-diff"
                    className="form-input"
                    value={courseDiff}
                    onChange={(e) => setCourseDiff(e.target.value)}
                  >
                    <option value="Beginner">{t('Beginner')}</option>
                    <option value="Intermediate">{t('Intermediate')}</option>
                    <option value="Advanced">{t('Advanced')}</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="new-course-inst">{t('Instructor')}</label>
                  <select 
                    id="new-course-inst"
                    className="form-input"
                    value={courseInst}
                    onChange={(e) => setCourseInst(e.target.value)}
                  >
                    {instructors.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="new-course-desc">{t('Short Summary')}</label>
                <input 
                  id="new-course-desc"
                  type="text" 
                  className="form-input" 
                  placeholder={t('Course Summary Placeholder')}
                  value={courseDesc}
                  onChange={(e) => setCourseDesc(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="new-course-long-desc">{t('Full Syllabus Description')}</label>
                <textarea 
                  id="new-course-long-desc"
                  className="form-input inst-textarea" 
                  placeholder={t('Course Description Placeholder')}
                  value={courseLongDesc}
                  onChange={(e) => setCourseLongDesc(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary">{t('Compile & Publish Course')}</button>
            </form>
          </div>
        )}

        {/* Tab 3: User Manager */}
        {activeTab === 'user-manager' && (
          <div className="tab-pane-wrapper">
            <h2>{t('User Account Directory')}</h2>
            <p className="section-desc-sub text-muted">{t('User Directory Description')}</p>

            <div className="admin-table-container">
              <table className="admin-users-table">
                <thead>
                  <tr>
                    <th>{t('Display Name')}</th>
                    <th>{t('Email Address')}</th>
                    <th>{t('User Role')}</th>
                    <th>{t('Account Status')}</th>
                    <th>{t('Audit Operations')}</th>
                  </tr>
                </thead>
                <tbody>
                  {localUsers.map(u => (
                    <tr key={u.id}>
                      <td><strong>{u.name}</strong></td>
                      <td>{u.email}</td>
                      <td>
                        <select 
                          className="role-cell-select"
                          value={u.role}
                          onChange={(e) => changeUserRole(u.id, e.target.value)}
                          aria-label="User role"
                        >
                          <option value="student">{t('Student')}</option>
                          <option value="instructor">{t('Instructor')}</option>
                          <option value="admin">{t('Admin')}</option>
                        </select>
                      </td>
                      <td>
                        <span className={`status-cell-badge ${u.status === 'Active' ? 'active' : 'blocked'}`}>
                          {t(u.status)}
                        </span>
                      </td>
                      <td>
                        <button 
                          className={`btn ${u.status === 'Active' ? 'btn-secondary' : 'btn-primary'} block-toggle-btn`}
                          onClick={() => toggleUserStatus(u.id)}
                        >
                          {u.status === 'Active' ? t('Block Account') : t('Unblock Account')}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Support Ticket Inbox */}
        {activeTab === 'support-tickets' && (
          <div className="tab-pane-wrapper">
            <h2>{t('Support Tickets Inbox')}</h2>
            <p className="section-desc-sub text-muted">{t('Respond to contact requests submitted by active learners.')}</p>

            <div className="admin-tickets-list">
              {localTickets.length > 0 ? (
                localTickets.map(ticket => (
                  <div key={ticket.id} className={`admin-ticket-card ${ticket.status === 'Resolved' ? 'resolved' : ''}`}>
                    <div className="ticket-header">
                      <div>
                        <h3>{t('Subject')}: {ticket.subject}</h3>
                        <span className="text-muted">{t('From')}: {ticket.name} ({ticket.email})</span>
                      </div>
                      <span className={`ticket-status-tag ${ticket.status === 'Resolved' ? 'resolved' : 'pending'}`}>
                        {t(ticket.status || 'Pending')}
                      </span>
                    </div>
                    <p className="ticket-message-text">{ticket.message}</p>
                    <div className="ticket-actions-row">
                      {ticket.status !== 'Resolved' && (
                        <button 
                          className="btn btn-primary"
                          onClick={() => resolveTicket(ticket.id)}
                        >
                          {t('Resolve Ticket')}
                        </button>
                      )}
                      <button 
                        className="btn btn-secondary delete-ticket-btn"
                        onClick={() => deleteTicket(ticket.id)}
                        title={t('Delete')}
                      >
                        <Trash size={14} /> {t('Delete')}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="profile-empty-state text-center">
                  <MessageSquare size={48} className="empty-state-icon" />
                  <h3>{t('Support Inbox Empty')}</h3>
                  <p>{t('No query tickets have been registered through the Contact support page yet.')}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 5: System Activity Logs */}
        {activeTab === 'logs' && (
          <div className="tab-pane-wrapper">
            <h2>{t('System Activity Terminal')}</h2>
            <p className="section-desc-sub text-muted">{t('Terminal Description')}</p>

            <div className="terminal-logs-screen">
              {systemLogs.map(log => (
                <div key={log.id} className="terminal-line">
                  <span className="terminal-time">[{log.time}]</span>
                  <span className="terminal-text">{log.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
