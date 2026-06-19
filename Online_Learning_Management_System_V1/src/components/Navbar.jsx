import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, Menu, X, LogOut } from 'lucide-react';
import './navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const checkState = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loggedIn);
      if (loggedIn) {
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        setUser(userData);
      } else {
        setUser(null);
      }
    };
    
    checkState();

    window.addEventListener('storage', checkState);
    return () => {
      window.removeEventListener('storage', checkState);
    };
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    localStorage.removeItem('activeRole');
    setIsLoggedIn(false);
    setUser(null);
    closeMenu();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'Instructors', path: '/instructors' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const getNavLinks = () => {
    const baseLinks = [...navLinks];
    if (isLoggedIn) {
      baseLinks.splice(1, 0, { name: 'Student Dashboard', path: '/profile' });
    }
    return baseLinks;
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <div className="logo-icon">
            <BookOpen size={24} />
          </div>
          <span>EduSphere</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-links">
          {getNavLinks().map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="navbar-actions">
          {isLoggedIn ? (
            <div className="user-profile-menu">
              <div className="profile-link-wrap" title="Student Profile (Dashboard Disabled)">
                <div className="profile-badge">
                  {getInitials(user?.name)}
                </div>
                <span className="profile-name">{user?.name?.split(' ')[0] || 'Student'}</span>
              </div>
              <button onClick={handleLogout} className="btn btn-secondary logout-btn" title="Log Out">
                <LogOut size={16} /> Log Out
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary nav-btn">
                Log In
              </Link>
              <Link to="/signup" className="btn btn-primary nav-btn">
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle Menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${isOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-links">
          {getNavLinks().map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
              onClick={closeMenu}
            >
              {link.name}
            </Link>
          ))}
          <div className="mobile-drawer-actions">
            {isLoggedIn ? (
              <div className="mobile-profile-wrapper">
                <div className="mobile-profile-info">
                  <div className="profile-badge">
                    {getInitials(user?.name)}
                  </div>
                  <div>
                    <h4 className="mobile-user-name">{user?.name || 'Student'}</h4>
                    <span className="mobile-user-email">{user?.email || ''}</span>
                  </div>
                </div>
                <button onClick={handleLogout} className="btn btn-secondary btn-full logout-btn">
                  <LogOut size={16} /> Log Out
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary btn-full" onClick={closeMenu}>
                  Log In
                </Link>
                <Link to="/signup" className="btn btn-primary btn-full" onClick={closeMenu}>
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
