import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, BookOpen, MessageSquare, HelpCircle, Users, Star, Award, CheckCircle } from 'lucide-react';
import { instructors } from '../data/coursesData';
import './InstructorWorkspace.css';

export default function InstructorWorkspace() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('analytics');
  const [localCourses, setLocalCourses] = useState([]);
  const [localQa, setLocalQa] = useState([]);
  
  // Lesson form state
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonDuration, setLessonDuration] = useState('');
  const [lessonContent, setLessonContent] = useState('');
  const [lessonSuccess, setLessonSuccess] = useState(false);

  // Q&A reply state
  const [replyText, setReplyText] = useState({});
  const [qaSuccess, setQaSuccess] = useState(false);

  // Quiz form state
  const [quizCourseId, setQuizCourseId] = useState('');
  const [quizQuestion, setQuizQuestion] = useState('');
  const [quizOptions, setQuizOptions] = useState(['', '', '', '']);
  const [quizCorrectIdx, setQuizCorrectIdx] = useState(0);
  const [quizExplanation, setQuizExplanation] = useState('');
  const [quizSuccess, setQuizSuccess] = useState(false);

  useEffect(() => {
    // Check credentials
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const role = localStorage.getItem('activeRole');
    if (!loggedIn || role !== 'instructor') {
      alert("Access Denied. Instructor role required.");
      navigate('/');
      return;
    }

    // Load dynamic courses registry
    const storedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
    setLocalCourses(storedCourses);
    if (storedCourses.length > 0) {
      setSelectedCourseId(storedCourses[0].id);
      setQuizCourseId(storedCourses[0].id);
    }

    // Load dynamic QA threads registry
    const storedQa = JSON.parse(localStorage.getItem('qaThreads') || '[]');
    setLocalQa(storedQa);
  }, [navigate]);

  const handleAddLesson = (e) => {
    e.preventDefault();
    if (!selectedCourseId || !lessonTitle.trim() || !lessonContent.trim() || !lessonDuration.trim()) {
      alert("Please fill in all inputs.");
      return;
    }

    const updatedCourses = localCourses.map(course => {
      if (course.id === selectedCourseId) {
        // Appending to the first chapter in syllabus for simplicity
        const updatedSyllabus = [...course.syllabus];
        if (updatedSyllabus.length === 0) {
          updatedSyllabus.push({ chapterTitle: 'Module 1: General Core', lessons: [] });
        }
        
        const newLesson = {
          id: `${course.id}-lesson-${Date.now()}`,
          title: lessonTitle,
          duration: lessonDuration,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          content: lessonContent
        };

        updatedSyllabus[0].lessons.push(newLesson);
        return { 
          ...course, 
          syllabus: updatedSyllabus,
          lecturesCount: course.lecturesCount + 1 
        };
      }
      return course;
    });

    localStorage.setItem('courses', JSON.stringify(updatedCourses));
    setLocalCourses(updatedCourses);
    
    setLessonTitle('');
    setLessonDuration('');
    setLessonContent('');
    setLessonSuccess(true);
    setTimeout(() => setLessonSuccess(false), 3000);
  };

  const handlePostReply = (threadId) => {
    const text = replyText[threadId];
    if (!text || !text.trim()) return;

    const teacherProfile = JSON.parse(localStorage.getItem('user') || '{}');
    const updatedQa = localQa.map(thread => {
      if (thread.id === threadId) {
        const answers = [...thread.answers, {
          author: `${teacherProfile.name} (Instructor)`,
          date: 'Just now',
          content: text
        }];
        return { ...thread, answers };
      }
      return thread;
    });

    localStorage.setItem('qaThreads', JSON.stringify(updatedQa));
    setLocalQa(updatedQa);

    setReplyText({ ...replyText, [threadId]: '' });
    setQaSuccess(true);
    setTimeout(() => setQaSuccess(false), 2000);
  };

  const handleAddQuiz = (e) => {
    e.preventDefault();
    if (!quizCourseId || !quizQuestion.trim() || quizOptions.some(o => !o.trim()) || !quizExplanation.trim()) {
      alert("Please fill in all quiz inputs.");
      return;
    }

    const updatedCourses = localCourses.map(course => {
      if (course.id === quizCourseId) {
        const newQuiz = {
          question: quizQuestion,
          options: [...quizOptions],
          answerIndex: quizCorrectIdx,
          explanation: quizExplanation
        };
        const quizzes = [...(course.quizzes || []), newQuiz];
        return { ...course, quizzes };
      }
      return course;
    });

    localStorage.setItem('courses', JSON.stringify(updatedCourses));
    setLocalCourses(updatedCourses);

    setQuizQuestion('');
    setQuizOptions(['', '', '', '']);
    setQuizCorrectIdx(0);
    setQuizExplanation('');
    setQuizSuccess(true);
    setTimeout(() => setQuizSuccess(false), 3000);
  };

  return (
    <div className="instructor-page container">
      {/* Workspace Header */}
      <header className="inst-header animate-fade-in">
        <span className="badge badge-primary">Educator Desk</span>
        <h1>Instructor Workspace</h1>
        <p className="subtitle">Coordinate your course content, address student questions, and build interactive checkpoints.</p>
      </header>

      {/* Tabs Menu */}
      <nav className="inst-tabs-nav animate-fade-in">
        <button className={`inst-tab-btn ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => setActiveTab('analytics')}>
          <BarChart size={16} /> Analytics Dashboard
        </button>
        <button className={`inst-tab-btn ${activeTab === 'lessons' ? 'active' : ''}`} onClick={() => setActiveTab('lessons')}>
          <BookOpen size={16} /> Course Builder
        </button>
        <button className={`inst-tab-btn ${activeTab === 'qa' ? 'active' : ''}`} onClick={() => setActiveTab('qa')}>
          <MessageSquare size={16} /> Student Q&A Board
        </button>
        <button className={`inst-tab-btn ${activeTab === 'quizzes' ? 'active' : ''}`} onClick={() => setActiveTab('quizzes')}>
          <HelpCircle size={16} /> Quiz Manager
        </button>
      </nav>

      {/* Tab Panels */}
      <main className="inst-panel-body animate-fade-in">

        {/* Tab 1: Analytics Dashboard */}
        {activeTab === 'analytics' && (
          <div className="tab-pane-wrapper">
            <h2>Your Class Statistics</h2>
            <p className="section-desc-sub text-muted">Review students enrolled, completion rates, and average rating metrics.</p>

            <div className="inst-analytics-grid">
              <div className="inst-stat-card">
                <Users size={28} className="stat-icon-theme" />
                <strong>1,240</strong>
                <span>Total Enrolled</span>
              </div>
              <div className="inst-stat-card">
                <Star size={28} className="stat-icon-theme gold" />
                <strong>4.9 / 5.0</strong>
                <span>Average Rating</span>
              </div>
              <div className="inst-stat-card">
                <Award size={28} className="stat-icon-theme green" />
                <strong>88.4%</strong>
                <span>Completion Rate</span>
              </div>
            </div>

            <h3 style={{ marginTop: '2.5rem', marginBottom: '1rem' }}>Active Courses Directory</h3>
            <div className="inst-courses-list">
              {localCourses.map(course => (
                <div key={course.id} className="inst-course-row">
                  <div>
                    <h4>{course.title}</h4>
                    <span className="text-muted">{course.category} • {course.difficulty}</span>
                  </div>
                  <div className="inst-course-meta-node">
                    <strong>{course.syllabus.reduce((acc, ch) => acc + ch.lessons.length, 0)} Lectures</strong>
                    <span>{course.quizzes?.length || 0} Quiz questions</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Course Builder (Lesson Editor) */}
        {activeTab === 'lessons' && (
          <div className="tab-pane-wrapper">
            <h2>Append Lecture Lesson</h2>
            <p className="section-desc-sub text-muted">Select a course to write detailed textual lecture materials directly to the curriculum.</p>

            {lessonSuccess && (
              <div className="custom-alert custom-alert-success animate-fade-in" style={{ marginBottom: '1.5rem' }}>
                <CheckCircle size={18} />
                <span>Success! New lecture content successfully written to course curriculum.</span>
              </div>
            )}

            <form onSubmit={handleAddLesson} className="workspace-form">
              <div className="form-group">
                <label className="form-label" htmlFor="course-select">Select Target Course</label>
                <select 
                  id="course-select"
                  className="form-input" 
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                >
                  {localCourses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                </select>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="lesson-title">Lecture Title</label>
                  <input 
                    id="lesson-title"
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. 1.5 Introduction to Flexbox Layouts"
                    value={lessonTitle}
                    onChange={(e) => setLessonTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="lesson-duration">Lecture Read Time</label>
                  <input 
                    id="lesson-duration"
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. 15 mins"
                    value={lessonDuration}
                    onChange={(e) => setLessonDuration(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="lesson-content">Lecture Content</label>
                <textarea 
                  id="lesson-content"
                  className="form-input inst-textarea" 
                  placeholder="Write the full textbook content of the lesson here for students to read and listen..."
                  value={lessonContent}
                  onChange={(e) => setLessonContent(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary">Add Lecture to Course</button>
            </form>
          </div>
        )}

        {/* Tab 3: Student Q&A Board */}
        {activeTab === 'qa' && (
          <div className="tab-pane-wrapper">
            <h2>Moderate Student Q&A Board</h2>
            <p className="section-desc-sub text-muted">Respond to queries from enrolled learners to clear logical friction.</p>

            {qaSuccess && (
              <div className="custom-alert custom-alert-success animate-fade-in" style={{ marginBottom: '1.5rem' }}>
                <CheckCircle size={18} />
                <span>Instructor response published successfully! Sync complete.</span>
              </div>
            )}

            <div className="inst-qa-threads-list">
              {localQa.length > 0 ? (
                localQa.map(thread => (
                  <div key={thread.id} className="inst-qa-thread-card">
                    <div className="inst-thread-question">
                      <div className="thread-user-meta">
                        <span>Student: <strong>{thread.author}</strong></span>
                        <span className="text-muted">{thread.date}</span>
                      </div>
                      <p className="inst-thread-content">{thread.content}</p>
                    </div>

                    {/* Published answers */}
                    {thread.answers.length > 0 && (
                      <div className="inst-thread-replies">
                        {thread.answers.map((ans, idx) => (
                          <div key={idx} className="reply-node-item">
                            <span className="reply-author"><strong>{ans.author}</strong>:</span>
                            <span className="reply-text">{ans.content}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Reply input */}
                    <div className="inst-reply-action-wrap">
                      <textarea
                        className="form-input inst-reply-textarea"
                        placeholder="Write your official instructor reply here..."
                        value={replyText[thread.id] || ''}
                        onChange={(e) => setReplyText({ ...replyText, [thread.id]: e.target.value })}
                        aria-label="Instructor reply"
                      />
                      <button 
                        className="btn btn-primary btn-full inst-post-reply-btn"
                        onClick={() => handlePostReply(thread.id)}
                        disabled={!replyText[thread.id]?.trim()}
                      >
                        Publish Reply
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="profile-empty-state text-center">
                  <MessageSquare size={48} className="empty-state-icon" />
                  <h3>Q&A Board Empty</h3>
                  <p>Students have not posted any discussion questions yet.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 4: Quiz Editor */}
        {activeTab === 'quizzes' && (
          <div className="tab-pane-wrapper">
            <h2>Add Quiz Checkpoint Question</h2>
            <p className="section-desc-sub text-muted">Create multiple choice questions to monitor learning performance effectively.</p>

            {quizSuccess && (
              <div className="custom-alert custom-alert-success animate-fade-in" style={{ marginBottom: '1.5rem' }}>
                <CheckCircle size={18} />
                <span>Success! New quiz question appended. Students will see it in the chapter quiz tab.</span>
              </div>
            )}

            <form onSubmit={handleAddQuiz} className="workspace-form">
              <div className="form-group">
                <label className="form-label" htmlFor="quiz-course-select">Select Course</label>
                <select 
                  id="quiz-course-select"
                  className="form-input" 
                  value={quizCourseId}
                  onChange={(e) => setQuizCourseId(e.target.value)}
                >
                  {localCourses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="quiz-question">Question Description</label>
                <input 
                  id="quiz-question"
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Which keyword declares a block-scoped local variable?"
                  value={quizQuestion}
                  onChange={(e) => setQuizQuestion(e.target.value)}
                  required
                />
              </div>

              <div className="form-grid-2">
                {quizOptions.map((opt, oIdx) => (
                  <div key={oIdx} className="form-group">
                    <label className="form-label" htmlFor={`quiz-option-${oIdx}`}>Option {String.fromCharCode(65 + oIdx)}</label>
                    <input 
                      id={`quiz-option-${oIdx}`}
                      type="text" 
                      className="form-input" 
                      placeholder={`e.g. Option text`}
                      value={opt}
                      onChange={(e) => {
                        const updatedOpts = [...quizOptions];
                        updatedOpts[oIdx] = e.target.value;
                        setQuizOptions(updatedOpts);
                      }}
                      required
                    />
                  </div>
                ))}
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="correct-answer">Correct Answer Option</label>
                  <select 
                    id="correct-answer"
                    className="form-input" 
                    value={quizCorrectIdx}
                    onChange={(e) => setQuizCorrectIdx(parseInt(e.target.value))}
                  >
                    <option value={0}>Option A</option>
                    <option value={1}>Option B</option>
                    <option value={2}>Option C</option>
                    <option value={3}>Option D</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="quiz-explanation">Explanation / Reasoning</label>
                  <input 
                    id="quiz-explanation"
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. The let keyword declares block scoped local variables."
                    value={quizExplanation}
                    onChange={(e) => setQuizExplanation(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary">Publish Quiz Question</button>
            </form>
          </div>
        )}

      </main>
    </div>
  );
}
