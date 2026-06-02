import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckSquare, Square, Award, HelpCircle, FileText, MessageSquare, PlayCircle, Star, Save, Volume2, Pause, Play, Square as StopSquare } from 'lucide-react';
import { courses } from '../data/coursesData';
import './CourseViewer.css';

export default function CourseViewer() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [completedLessonIds, setCompletedLessonIds] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [playerMode, setPlayerMode] = useState('text'); // 'text' or 'video'
  
  // Speech Synthesis state
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speechRate, setSpeechRate] = useState(1.0);

  // Scratchpad state
  const [studentNotes, setStudentNotes] = useState('');
  const [saveNotesSuccess, setSaveNotesSuccess] = useState(false);

  // Q&A state
  const [newQuestion, setNewQuestion] = useState('');
  const [qaThreads, setQaThreads] = useState([]);

  // AI Chatbot state
  const [aiChatLog, setAiChatLog] = useState([
    { sender: 'ai', text: "Hello! I am your EduSphere AI Tutor. Ask me anything about the current lesson, and I will try to help explain it!" }
  ]);
  const [aiInput, setAiInput] = useState('');
  const [aiIsTyping, setAiIsTyping] = useState(false);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

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

    // Verify enrollment
    const enrolled = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    if (!enrolled.includes(foundCourse.id)) {
      alert("You must enroll in this course to view the classroom!");
      navigate(`/courses/${foundCourse.id}`);
      return;
    }

    // Set initial active lesson to the first lesson in the curriculum
    if (foundCourse.syllabus.length > 0 && foundCourse.syllabus[0].lessons.length > 0) {
      setActiveLesson(foundCourse.syllabus[0].lessons[0]);
    }

    // Load completed lessons from localStorage
    const progress = JSON.parse(localStorage.getItem('lessonProgress') || '{}');
    const completedIds = Object.keys(progress).filter(id => progress[id] === true);
    setCompletedLessonIds(completedIds);

    // Load notes from localStorage
    const savedNotes = localStorage.getItem(`notes_${foundCourse.id}`) || '';
    setStudentNotes(savedNotes);

    // Load QA threads
    const storedQa = JSON.parse(localStorage.getItem('qaThreads') || '[]');
    setQaThreads(storedQa);
  }, [courseId, navigate]);

  // Real-time synchronization event listener
  useEffect(() => {
    const handleStorageChange = () => {
      const storedQa = JSON.parse(localStorage.getItem('qaThreads') || '[]');
      setQaThreads(storedQa);
      
      const storedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
      const foundCourse = storedCourses.find(c => c.id === courseId);
      if (foundCourse) {
        setCourse(foundCourse);
        if (activeLesson) {
          let updatedLesson = null;
          foundCourse.syllabus.forEach(ch => {
            ch.lessons.forEach(l => {
              if (l.id === activeLesson.id) updatedLesson = l;
            });
          });
          if (updatedLesson) {
            setActiveLesson(updatedLesson);
          }
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [courseId, activeLesson]);

  // Speech cleanup on lesson change or component unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
    };
  }, [activeLesson]);

  if (!course || !activeLesson) {
    return <div className="container" style={{ padding: '8rem 2rem', textAlign: 'center' }}>Loading classroom...</div>;
  }

  // Calculate total lessons in this course
  const totalLessons = [];
  course.syllabus.forEach(ch => {
    ch.lessons.forEach(l => totalLessons.push(l));
  });

  const activeQuizzes = (activeLesson && activeLesson.quizzes && activeLesson.quizzes.length > 0)
    ? activeLesson.quizzes
    : (course.quizzes || []);

  const progressPercent = totalLessons.length > 0 
    ? Math.round((totalLessons.filter(l => completedLessonIds.includes(l.id)).length / totalLessons.length) * 100) 
    : 0;

  const handleToggleLessonComplete = (lessonId) => {
    const progress = JSON.parse(localStorage.getItem('lessonProgress') || '{}');
    const isNowCompleted = !progress[lessonId];
    progress[lessonId] = isNowCompleted;
    localStorage.setItem('lessonProgress', JSON.stringify(progress));

    const updatedCompleted = Object.keys(progress).filter(id => progress[id] === true);
    setCompletedLessonIds(updatedCompleted);

    // If newly 100% completed, offer alert
    const newProgressPercent = Math.round((totalLessons.filter(l => progress[l.id]).length / totalLessons.length) * 100);
    if (newProgressPercent === 100 && isNowCompleted) {
      setTimeout(() => {
        alert("🎉 Congratulations! You have finished all lessons in this course! A Certificate of Completion is now available in your Profile Dashboard.");
      }, 500);
    }
  };

  const handleSaveNotes = () => {
    localStorage.setItem(`notes_${course.id}`, studentNotes);
    setSaveNotesSuccess(true);
    setTimeout(() => setSaveNotesSuccess(false), 2000);
  };

  const handlePostQuestion = (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    const storedQa = JSON.parse(localStorage.getItem('qaThreads') || '[]');
    const newThread = {
      id: storedQa.length + 1,
      courseId: course.id,
      author: JSON.parse(localStorage.getItem('user') || '{}').name || 'Active Student',
      date: 'Just now',
      content: newQuestion,
      answers: []
    };
    const updatedQa = [newThread, ...storedQa];
    setQaThreads(updatedQa);
    localStorage.setItem('qaThreads', JSON.stringify(updatedQa));
    setNewQuestion('');

    // Dispatch storage event to alert teacher dashboard
    window.dispatchEvent(new Event('storage'));
  };

  const handleSendAiMessage = (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;

    const studentMessage = aiInput;
    setAiChatLog(prev => [...prev, { sender: 'student', text: studentMessage }]);
    setAiInput('');
    setAiIsTyping(true);

    setTimeout(() => {
      let responseText = '';
      const textLower = studentMessage.toLowerCase();
      const lessonTitleLower = activeLesson.title.toLowerCase();
      const lessonContentLower = activeLesson.content.toLowerCase();
      
      if (textLower.includes('explain') || textLower.includes('what is') || textLower.includes('define') || textLower.includes('how does')) {
        const techKeywords = ['closure', 'html5', 'semantic', 'css', 'grid', 'flexbox', 'promise', 'async', 'await', 'react', 'state', 'props', 'useeffect', 'usestate', 'hooks', 'rest', 'express', 'node', 'database', 'event loop', 'api', 'dom', 'virtual dom', 'responsive'];
        let foundKeywords = [];
        techKeywords.forEach(kw => {
          if (textLower.includes(kw) && lessonContentLower.includes(kw)) {
            foundKeywords.push(kw);
          }
        });

        if (foundKeywords.length > 0) {
          responseText = `Regarding "${foundKeywords.join(', ')}" in the lesson: in "${activeLesson.title}", the content explains that "${activeLesson.content.substring(0, 150)}..." \n\nLet me elaborate: this design pattern allows you to maintain clean modular logic and robust interface components. Try applying it in your workspace code or notepad annotations!`;
        } else {
          responseText = `In this lesson on "${activeLesson.title}", the curriculum outlines: "${activeLesson.content.substring(0, 200)}...". Let me know if you would like me to explain a specific term from this text!`;
        }
      } else if (textLower.includes('quiz') || textLower.includes('question') || textLower.includes('test')) {
        responseText = `To verify your understanding of "${activeLesson.title}", go to the "Chapter Quizzes" tab! You will see exactly 10 questions covering closures, React rendering rules, CSS layouts, and asynchronous syntax based on your choice. Let me know if you need help with any specific question!`;
      } else if (textLower.includes('code') || textLower.includes('example') || textLower.includes('write')) {
        if (lessonTitleLower.includes('closure') || lessonContentLower.includes('closure')) {
          responseText = `Sure! Here is a simple closure script example:\n\`\`\`javascript\nfunction createCounter() {\n  let count = 0;\n  return function() {\n    count++;\n    return count;\n  };\n}\nconst counter = createCounter();\nconsole.log(counter()); // 1\nconsole.log(counter()); // 2\n\`\`\`\nThis inner function remembers its outer scope variable \`count\`!`;
        } else if (lessonTitleLower.includes('react') || lessonContentLower.includes('react') || lessonContentLower.includes('hooks')) {
          responseText = `Here is a React component state hook sample:\n\`\`\`jsx\nimport React, { useState } from 'react';\n\nexport default function ClickCounter() {\n  const [count, setCount] = useState(0);\n  return (\n    <button onClick={() => setCount(count + 1)}>\n      Clicks: {count}\n    </button>\n  );\n}\n\`\`\``;
        } else if (lessonTitleLower.includes('flexbox') || lessonContentLower.includes('flexbox') || lessonContentLower.includes('grid')) {
          responseText = `Here is a CSS Grid layout snippet:\n\`\`\`css\n.grid-container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 1.5rem;\n}\n\`\`\`\nThis builds a highly fluid 2D responsive alignment zone!`;
        } else {
          responseText = `I can help with code snippets! Can you specify what language or component block you are writing? For reference, this lesson "${activeLesson.title}" handles: \n\n\`${activeLesson.content.substring(0, 100)}...\``;
        }
      } else if (textLower.includes('hello') || textLower.includes('hi') || textLower.includes('hey')) {
        responseText = `Hello! How can I help you study "${activeLesson.title}" today? Ask me questions about closures, flexbox layouts, database routes, or React render hooks!`;
      } else {
        responseText = `That's an interesting question about this lecture topic! In "${activeLesson.title}", the core lesson notes explain: \n\n"${activeLesson.content}" \n\nIs there a specific detail about this content you want me to expand on or write code examples for?`;
      }

      setAiChatLog(prev => [...prev, { sender: 'ai', text: responseText }]);
      setAiIsTyping(false);
    }, 1000);
  };

  const handleSelectQuizOption = (qIndex, oIndex) => {
    if (quizSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [qIndex]: oIndex
    });
  };

  const handleSubmitQuiz = () => {
    if (quizSubmitted) return;
    let score = 0;
    activeQuizzes.forEach((quiz, index) => {
      if (selectedAnswers[index] === quiz.answerIndex) {
        score += 1;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  // Text-To-Speech Handlers
  const handleSpeak = (rateValue = speechRate) => {
    window.speechSynthesis.cancel();
    
    // Create text string from lesson content
    const textToSpeak = `${activeLesson.title}. ${activeLesson.content}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    utterance.rate = rateValue;
    
    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    if (isSpeaking) {
      if (isPaused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
      } else {
        window.speechSynthesis.pause();
        setIsPaused(true);
      }
    }
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  const handleChangeRate = (newRate) => {
    setSpeechRate(newRate);
    if (isSpeaking && !isPaused) {
      // Re-trigger speak with the new rate instantly
      handleSpeak(newRate);
    }
  };

  return (
    <div className="classroom-layout">
      {/* Classroom Sidebar: Curriculum Playlist */}
      <aside className="classroom-sidebar">
        <div className="sidebar-header-box">
          <Link to={`/courses/${course.id}`} className="class-back-btn">
            <ArrowLeft size={16} /> Course Overview
          </Link>
          <h3 className="sidebar-course-title">{course.title}</h3>
          
          {/* Progress Section */}
          <div className="sidebar-progress-zone">
            <div className="progress-details-text">
              <span>Your Course Progress</span>
              <strong>{progressPercent}%</strong>
            </div>
            <div className="sidebar-progress-track">
              <div 
                className="sidebar-progress-fill" 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <span className="fraction-lessons">
              {totalLessons.filter(l => completedLessonIds.includes(l.id)).length} of {totalLessons.length} completed
            </span>
          </div>
        </div>

        {/* Syllabus Playlist */}
        <div className="sidebar-playlist">
          {course.syllabus.map((chapter, chapterIndex) => (
            <div key={chapterIndex} className="playlist-chapter">
              <h4 className="playlist-chapter-title">{chapter.chapterTitle}</h4>
              <div className="playlist-lessons-wrap">
                {chapter.lessons.map((lesson) => {
                  const isActive = activeLesson.id === lesson.id;
                  const isCompleted = completedLessonIds.includes(lesson.id);

                  return (
                    <div 
                      key={lesson.id} 
                      className={`playlist-lesson-row ${isActive ? 'active' : ''}`}
                    >
                      <button 
                        className="toggle-complete-checkbox"
                        onClick={() => handleToggleLessonComplete(lesson.id)}
                        aria-label={isCompleted ? "Mark lesson incomplete" : "Mark lesson complete"}
                      >
                        {isCompleted ? (
                          <CheckSquare size={18} className="checkbox-icon checked" />
                        ) : (
                          <Square size={18} className="checkbox-icon" />
                        )}
                      </button>

                      <div 
                        className="lesson-clickable-area"
                        onClick={() => {
                          setActiveLesson(lesson);
                          // Clear quiz if active lesson changes
                          handleResetQuiz();
                        }}
                      >
                        <span className="lesson-row-title">{lesson.title}</span>
                        <div className="lesson-duration-row">
                          <PlayCircle size={12} /> {lesson.duration}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Classroom Main View: Lesson Reader & Tab Details */}
      <main className="classroom-main">
        
        {/* Player Mode Switcher */}
        <div className="player-mode-selector">
          <button 
            className={`mode-btn ${playerMode === 'video' ? 'active' : ''}`}
            onClick={() => {
              setPlayerMode('video');
              handleStop(); // stop TTS if active
            }}
          >
            🎬 Video Lecture
          </button>
          <button 
            className={`mode-btn ${playerMode === 'text' ? 'active' : ''}`}
            onClick={() => setPlayerMode('text')}
          >
            📖 Text Lesson
          </button>
        </div>

        {/* Classroom Player Viewport */}
        {playerMode === 'video' ? (
          <section className="video-viewport">
            <video 
              src={activeLesson.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'} 
              controls 
              className="classroom-video-player"
              width="100%"
              poster="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60"
            />
          </section>
        ) : (
          /* Elegant Text Lesson Panel */
          <section className="lesson-reader-container">
            <div className="text-viewport">
              <div className="reader-header">
                <span className="reader-tag">📖 Interactive Text Lesson</span>
                <h2 className="reader-lesson-title">{activeLesson.title}</h2>
              </div>
              
              <div className="reader-body">
                <p className="lesson-paragraph-text">{activeLesson.content}</p>
              </div>

              {/* AI Text-To-Speech Controller Bar */}
              <div className="speech-controls-bar">
                <div className="speech-btn-group">
                  {!isSpeaking ? (
                    <button onClick={() => handleSpeak()} className="btn btn-primary speech-btn" title="Listen to AI Reader">
                      <Volume2 size={16} /> Listen Aloud
                    </button>
                  ) : (
                    <>
                      <button onClick={handlePauseResume} className="btn btn-secondary speech-btn">
                        {isPaused ? <Play size={14} /> : <Pause size={14} />} {isPaused ? 'Resume' : 'Pause'}
                      </button>
                      <button onClick={handleStop} className="btn btn-secondary speech-btn stop-btn">
                        <StopSquare size={14} fill="currentColor" /> Stop
                      </button>
                    </>
                  )}
                </div>

                {/* Speed rate selector pills */}
                <div className="rate-selector-group">
                  <span className="rate-label">AI Speed:</span>
                  {[0.75, 1.0, 1.25, 1.5, 2.0].map((rate) => (
                    <button
                      key={rate}
                      className={`rate-pill-btn ${speechRate === rate ? 'active' : ''}`}
                      onClick={() => handleChangeRate(rate)}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>

                {/* Glowing Soundwave Speaking Indicator */}
                {isSpeaking && !isPaused && (
                  <div className="speech-wave-indicator" title="AI reading in progress">
                    <div className="wave-bar"></div>
                    <div className="wave-bar"></div>
                    <div className="wave-bar"></div>
                    <div className="wave-bar"></div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Tab Selection */}
        <section className="classroom-tabs-nav">
          <button 
            className={`tab-item-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <FileText size={16} /> Overview
          </button>
          <button 
            className={`tab-item-btn ${activeTab === 'notes' ? 'active' : ''}`}
            onClick={() => setActiveTab('notes')}
          >
            <FileText size={16} /> Dynamic Notes
          </button>
          <button 
            className={`tab-item-btn ${activeTab === 'qa' ? 'active' : ''}`}
            onClick={() => setActiveTab('qa')}
          >
            <MessageSquare size={16} /> Discussion Forum
          </button>
          <button 
            className={`tab-item-btn ${activeTab === 'ai' ? 'active' : ''}`}
            onClick={() => setActiveTab('ai')}
          >
            <MessageSquare size={16} /> AI Tutor Assistant
          </button>
          <button 
            className={`tab-item-btn ${activeTab === 'quiz' ? 'active' : ''}`}
            onClick={() => setActiveTab('quiz')}
          >
            <HelpCircle size={16} /> Chapter Quizzes
          </button>
        </section>

        {/* Tab Panels */}
        <section className="classroom-tab-panel-content">
          
          {/* Panel 1: Overview */}
          {activeTab === 'overview' && (
            <div className="tab-pane-fade-in">
              <h2>About this Lecture</h2>
              <p style={{ marginBottom: '1.5rem', fontSize: '1.05rem', color: 'var(--text-main)' }}>
                This lesson is part of the **{course.title}** curriculum. In this module, we discuss underlying protocols, design strategies, core operations, and real-world implementations. Follow along, write notes, and verify your comprehension using the Quiz module.
              </p>
              <h3>Topics Covered</h3>
              <ul className="topics-list" style={{ marginLeft: '1.5rem', marginTop: '0.75rem', gap: '0.5rem', display: 'flex', flexDirection: 'column' }}>
                <li>Structural definitions and development environments.</li>
                <li>Best practices for building fast, responsive operations.</li>
                <li>Debugging common configuration discrepancies.</li>
                <li>Testing local files for responsiveness.</li>
              </ul>
            </div>
          )}

          {/* Panel 2: Notes */}
          {activeTab === 'notes' && (
            <div className="tab-pane-fade-in notes-pane">
              <div className="notes-header-row">
                <h2>Lecture Notepad</h2>
                <button 
                  className={`btn btn-secondary save-notes-btn ${saveNotesSuccess ? 'success' : ''}`}
                  onClick={handleSaveNotes}
                >
                  <Save size={16} /> {saveNotesSuccess ? 'Notes Saved!' : 'Save Notes'}
                </button>
              </div>
              <p className="tab-subtitle-text">Save annotations, code snippets, and thoughts. They will persist automatically in your browser.</p>
              <textarea 
                className="notes-textarea" 
                placeholder="Type your notes for this course here..." 
                value={studentNotes}
                onChange={(e) => setStudentNotes(e.target.value)}
                aria-label="Lecture Notepad"
              />
            </div>
          )}

          {/* Panel 3: Discussion Forum */}
          {activeTab === 'qa' && (
            <div className="tab-pane-fade-in qa-pane">
              <h2>Course Q&A Discussion Forum</h2>
              <p className="tab-subtitle-text">Ask questions or share tips with instructors and classmates.</p>

              {/* Submit Question Form */}
              <form onSubmit={handlePostQuestion} className="post-question-form">
                <textarea 
                  placeholder="Ask a new technical question..." 
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  required
                  aria-label="Question text"
                />
                <button type="submit" className="btn btn-primary">Post Question</button>
              </form>

              {/* QA Thread listing */}
              <div className="qa-threads-list">
                {qaThreads.map((thread) => (
                  <div key={thread.id} className="qa-thread-item">
                    <div className="thread-question-box">
                      <div className="thread-user-meta">
                        <span className="thread-author"><strong>{thread.author}</strong></span>
                        <span className="thread-date">{thread.date}</span>
                      </div>
                      <p className="thread-content">{thread.content}</p>
                    </div>

                    {/* Answers block */}
                    {thread.answers.length > 0 ? (
                      <div className="thread-answers-box">
                        {thread.answers.map((ans, aIdx) => (
                          <div key={aIdx} className="answer-item">
                            <div className="thread-user-meta">
                              <span className="answer-author"><strong>{ans.author}</strong></span>
                              <span className="thread-date">{ans.date}</span>
                            </div>
                            <p className="answer-content">{ans.content}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="no-answers-prompt">No replies yet. Instructors check this board periodically.</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Panel 4: Graded Quizzes */}
          {activeTab === 'quiz' && (
            <div className="tab-pane-fade-in quiz-pane">
              <div className="quiz-header-row">
                <h2>Chapter Quiz ({activeQuizzes.length} Questions)</h2>
                {quizSubmitted && activeQuizzes.length > 0 && (
                  <div className="quiz-score-badge">
                    Score: {quizScore} / {activeQuizzes.length} (
                    {Math.round((quizScore / activeQuizzes.length) * 100)}%)
                  </div>
                )}
              </div>
              <p className="tab-subtitle-text">Complete the quiz below to check your comprehension of this module. A passing grade validates your syllabus progress.</p>

              {activeQuizzes.length > 0 ? (
                <div className="quiz-questions-list">
                  {activeQuizzes.map((quiz, qIdx) => {
                    const isCorrect = selectedAnswers[qIdx] === quiz.answerIndex;
                    return (
                      <div key={qIdx} className={`quiz-question-card ${quizSubmitted ? (isCorrect ? 'correct' : 'incorrect') : ''}`}>
                        <h4 className="quiz-question-title">Q{qIdx + 1}: {quiz.question}</h4>
                        
                        <div className="quiz-options-list">
                          {quiz.options.map((option, oIdx) => {
                            const isSelected = selectedAnswers[qIdx] === oIdx;
                            const isOptionCorrect = oIdx === quiz.answerIndex;
                            
                            let optionClass = '';
                            if (isSelected) optionClass += ' selected';
                            if (quizSubmitted) {
                              if (isOptionCorrect) optionClass += ' correct-option';
                              else if (isSelected) optionClass += ' incorrect-option';
                            }

                            return (
                              <button
                                key={oIdx}
                                className={`quiz-option-btn${optionClass}`}
                                onClick={() => handleSelectQuizOption(qIdx, oIdx)}
                                disabled={quizSubmitted}
                              >
                                <span className="option-indicator">{String.fromCharCode(65 + oIdx)}</span>
                                <span className="option-text">{option}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Explanation box */}
                        {quizSubmitted && (
                          <div className={`quiz-explanation-box ${isCorrect ? 'correct' : 'incorrect'}`}>
                            <strong>Explanation:</strong> {quiz.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="profile-empty-state text-center" style={{ padding: '2rem' }}>
                  <HelpCircle size={48} className="empty-state-icon" />
                  <h3>No Quiz Questions Available</h3>
                  <p>The instructor has not added questions for this course yet.</p>
                </div>
              )}

              {/* Quiz footer button */}
              {activeQuizzes.length > 0 && (
                <div className="quiz-footer-actions">
                  {!quizSubmitted ? (
                    <button 
                      className="btn btn-primary"
                      onClick={handleSubmitQuiz}
                      disabled={Object.keys(selectedAnswers).length < activeQuizzes.length}
                    >
                      Submit Quiz Answers
                    </button>
                  ) : (
                    <button 
                      className="btn btn-secondary"
                      onClick={handleResetQuiz}
                    >
                      Retake Quiz
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Panel 5: AI Tutor Assistant */}
          {activeTab === 'ai' && (
            <div className="tab-pane-fade-in ai-chatbot-pane">
              <div className="ai-chat-header">
                <MessageSquare size={20} className="color-primary" />
                <h3>EduSphere AI Study Assistant</h3>
              </div>
              
              <div className="ai-chat-messages">
                {aiChatLog.map((msg, mIdx) => (
                  <div key={mIdx} className={`ai-chat-bubble ${msg.sender}`}>
                    {msg.text.split('\n').map((line, lIdx) => (
                      <p key={lIdx} style={{ margin: '0 0 0.5rem 0' }}>{line}</p>
                    ))}
                  </div>
                ))}
                
                {aiIsTyping && (
                  <div className="ai-chat-bubble ai typing-indicator">
                    <span>AI Tutor is formulating explanation...</span>
                  </div>
                )}
              </div>

              <form onSubmit={handleSendAiMessage} className="ai-chat-input-area">
                <input 
                  type="text" 
                  className="ai-chat-input"
                  placeholder={`Ask a question about: "${activeLesson.title}"...`}
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  disabled={aiIsTyping}
                  aria-label="AI message input"
                />
                <button 
                  type="submit" 
                  className="btn btn-primary ai-chat-send-btn"
                  disabled={aiIsTyping}
                >
                  Ask Tutor
                </button>
              </form>
            </div>
          )}

        </section>
      </main>
    </div>
  );
}
