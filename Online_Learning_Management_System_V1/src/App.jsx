import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Home from './components/home';
import Login from './components/login';
import SignUp from './components/signup';
import { courses as defaultCourses } from './data/coursesData';

// Layout wrapper for pages containing the global Header and Footer
function MainLayout() {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  useEffect(() => {
    // Initialize or update courses registry in local storage
    const storedCoursesStr = localStorage.getItem('courses');
    if (!storedCoursesStr) {
      localStorage.setItem('courses', JSON.stringify(defaultCourses));
    } else {
      // Migration: merge lesson-specific quizzes if they are missing in local storage registry
      try {
        const stored = JSON.parse(storedCoursesStr);
        const fsCourse = stored.find(c => c.id === 'full-stack-web-dev');
        
        // If the stored course exists but its first lesson lacks custom quizzes, execute merge migration
        if (fsCourse && fsCourse.syllabus && fsCourse.syllabus[0] && fsCourse.syllabus[0].lessons && !fsCourse.syllabus[0].lessons[0].quizzes) {
          const updated = stored.map(c => {
            const defaultC = defaultCourses.find(dc => dc.id === c.id);
            if (defaultC) {
              const updatedSyllabus = c.syllabus.map((chapter, chIdx) => {
                const defaultCh = defaultC.syllabus[chIdx];
                if (defaultCh) {
                  const updatedLessons = chapter.lessons.map((lesson) => {
                    // Try to find matching default lesson to retrieve its specialized quizzes
                    const defaultChLessons = defaultCh.lessons || [];
                    const defaultL = defaultChLessons.find(dl => dl.id === lesson.id);
                    if (defaultL && defaultL.quizzes) {
                      return { ...lesson, quizzes: defaultL.quizzes };
                    }
                    return lesson;
                  });
                  return { ...chapter, lessons: updatedLessons };
                }
                return chapter;
              });
              return { ...c, syllabus: updatedSyllabus };
            }
            return c;
          });
          localStorage.setItem('courses', JSON.stringify(updated));
        }
      } catch (err) {
        console.error("Local storage migration error:", err);
      }
    }
    
    // Initialize Q&A threads database table in local storage
    const defaultQaThreads = [
      { 
        id: 1, 
        courseId: 'full-stack-web-dev',
        author: 'Alex Rivera', 
        date: '3 days ago', 
        content: 'What is the best way to practice closures in standard scripts? I feel like I understand it in theory but struggle to write clean scopes.', 
        answers: [
          { 
            author: 'John Smith (Instructor)', 
            date: '2 days ago', 
            content: 'Create a small counter utility or private variable simulation. Try to write functions that return functions, tracking state outside the returned scope!' 
          }
        ] 
      },
      { 
        id: 2, 
        courseId: 'full-stack-web-dev',
        author: 'Maya Lin', 
        date: 'Yesterday', 
        content: 'In Module 2, does React perform asynchronous queueing on hook setters?', 
        answers: [] 
      }
    ];
    if (!localStorage.getItem('qaThreads')) {
      localStorage.setItem('qaThreads', JSON.stringify(defaultQaThreads));
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Main Website Shell */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Navigate to="/" replace />} />
          <Route path="/courses/:courseId" element={<Navigate to="/" replace />} />
          <Route path="/instructors" element={<Navigate to="/" replace />} />
          <Route path="/about" element={<Navigate to="/" replace />} />
          <Route path="/contact" element={<Navigate to="/" replace />} />
          <Route path="/profile" element={<Navigate to="/" replace />} />
          <Route path="/instructor-workspace" element={<Navigate to="/" replace />} />
          <Route path="/admin-workspace" element={<Navigate to="/" replace />} />
          <Route path="/privacy" element={<Navigate to="/" replace />} />
          <Route path="/terms" element={<Navigate to="/" replace />} />
        </Route>

        {/* Standalone Pages without Global Header/Footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/courses/:courseId/learn" element={<Navigate to="/" replace />} />

        {/* Wildcard Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
