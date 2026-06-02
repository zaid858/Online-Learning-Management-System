import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, BookOpen, Clock, Star, ArrowRight, Award } from 'lucide-react';
import { courses, instructors } from '../data/coursesData';
import './Courses.css';

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All');
  const [enrolledIds, setEnrolledIds] = useState([]);
  const [progressData, setProgressData] = useState({});
  const [coursesList, setCoursesList] = useState([]);

  useEffect(() => {
    // Load courses dynamically from localStorage
    const storedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
    if (storedCourses.length > 0) {
      setCoursesList(storedCourses);
    } else {
      setCoursesList(courses);
    }

    // Read enrollment state from localStorage
    const enrolled = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    setEnrolledIds(enrolled);

    // Read lesson progress from localStorage
    const progress = JSON.parse(localStorage.getItem('lessonProgress') || '{}');
    setProgressData(progress);
  }, []);

  const getInstructorName = (instructorId) => {
    const inst = instructors.find(i => i.id === instructorId);
    return inst ? inst.name : 'Unknown Instructor';
  };

  const getCourseProgress = (course) => {
    if (!enrolledIds.includes(course.id)) return null;
    
    // Find all lesson IDs for this course
    const allLessonIds = [];
    course.syllabus.forEach(chapter => {
      chapter.lessons.forEach(lesson => {
        allLessonIds.push(lesson.id);
      });
    });

    if (allLessonIds.length === 0) return 0;

    // Count how many are marked true in progressData
    const completedCount = allLessonIds.filter(id => !!progressData[id]).length;
    return Math.round((completedCount / allLessonIds.length) * 100);
  };

  // Filter courses
  const filteredCourses = coursesList.filter(course => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'All' || course.category === categoryFilter;
    const matchesDifficulty = difficultyFilter === 'All' || course.difficulty === difficultyFilter;
    
    let matchesPrice = true;
    if (priceFilter === 'Free') {
      matchesPrice = course.price.toLowerCase() === 'free';
    } else if (priceFilter === 'Paid') {
      matchesPrice = course.price.toLowerCase() !== 'free';
    }

    return matchesSearch && matchesCategory && matchesDifficulty && matchesPrice;
  });

  const categories = ['All', 'Development', 'Design', 'Data Science', 'Marketing', 'Business'];

  return (
    <div className="courses-page container">
      {/* Page Header */}
      <header className="courses-header animate-fade-in">
        <span className="badge badge-primary">Course Catalog</span>
        <h1>Explore Our Professional Courses</h1>
        <p className="subtitle">
          Acquire in-demand skills with our interactive visual curriculum curated by industry leaders.
        </p>
      </header>

      {/* Search & Filter Toolbar */}
      <section className="search-filter-section">
        <div className="search-box">
          <Search className="search-icon" size={20} />
          <input 
            type="text" 
            placeholder="Search for subjects, skills, or titles..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filters-container">
          {/* Category Filters (Pills) */}
          <div className="category-pills">
            {categories.map(cat => (
              <button
                key={cat}
                className={`pill-btn ${categoryFilter === cat ? 'active' : ''}`}
                onClick={() => setCategoryFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sub-Filters dropdowns */}
          <div className="sub-filters">
            <div className="filter-select-wrapper">
              <SlidersHorizontal size={16} className="select-icon" />
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                aria-label="Difficulty Filter"
              >
                <option value="All">All Difficulties</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div className="filter-select-wrapper">
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                aria-label="Price Filter"
              >
                <option value="All">All Prices</option>
                <option value="Free">Free</option>
                <option value="Paid">Paid</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <main className="courses-grid-section">
        {filteredCourses.length > 0 ? (
          <div className="courses-grid">
            {filteredCourses.map((course) => {
              const progress = getCourseProgress(course);
              const isEnrolled = enrolledIds.includes(course.id);
              
              return (
                <article key={course.id} className="course-card animate-fade-in">
                  <div className="course-card-banner">
                    <span className="course-category-badge">{course.category}</span>
                    <span className="course-difficulty-badge">{course.difficulty}</span>
                    <div className="course-banner-overlay"></div>
                  </div>
                  
                  <div className="course-card-content">
                    <div className="course-instructor-meta">
                      <span>By {getInstructorName(course.instructorId)}</span>
                    </div>

                    <h3 className="course-title">
                      <Link to={`/courses/${course.id}`}>{course.title}</Link>
                    </h3>
                    
                    <p className="course-desc-short">{course.description}</p>
                    
                    <div className="course-ratings">
                      <Star size={16} className="star-icon" fill="currentColor" />
                      <span className="rating-val">{course.rating}</span>
                      <span className="rating-count">({course.reviewsCount} reviews)</span>
                    </div>

                    <div className="course-meta-details">
                      <span className="meta-item">
                        <Clock size={15} /> {course.duration}
                      </span>
                      <span className="meta-item">
                        <BookOpen size={15} /> {course.lecturesCount} Lectures
                      </span>
                    </div>

                    {/* Progress Bar or Pricing Area */}
                    {isEnrolled ? (
                      <div className="course-progress-container">
                        <div className="progress-labels">
                          <span>Progress</span>
                          <span>{progress}%</span>
                        </div>
                        <div className="progress-track-bg">
                          <div 
                            className="progress-bar-fill" 
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <Link 
                          to={`/courses/${course.id}/learn`} 
                          className="btn btn-primary btn-full course-card-btn"
                        >
                          {progress === 100 ? 'Review Course' : 'Resume Learning'}
                        </Link>
                      </div>
                    ) : (
                      <div className="course-pricing-action">
                        <div className="course-price-wrap">
                          <span className="price-label">Price</span>
                          <span className="price-value">{course.price}</span>
                        </div>
                        <Link 
                          to={`/courses/${course.id}`} 
                          className="btn btn-secondary course-card-btn"
                        >
                          View Details <ArrowRight size={15} />
                        </Link>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="no-results-card">
            <h3>No Courses Match Your Criteria</h3>
            <p>Try resetting filters, searching for another keyword, or clearing the search box.</p>
            <button 
              className="btn btn-primary"
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('All');
                setDifficultyFilter('All');
                setPriceFilter('All');
              }}
            >
              Reset All Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
