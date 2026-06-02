import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mail, Phone, MapPin, Send } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
    e.target.reset();
  };

  return (
    <footer className="footer">
      <div className="container footer-grid">
        {/* Brand Section */}
        <div className="footer-brand animate-fade-in">
          <Link to="/" className="footer-logo">
            <div className="footer-logo-icon">
              <BookOpen size={20} />
            </div>
            <span>EduSphere</span>
          </Link>
          <p className="footer-description">
            EduSphere is a state-of-the-art Online Learning Management System designed to empower learners and educators worldwide. Gain lifetime access to premium courses, certifications, and hands-on guidance.
          </p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="Twitter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-column animate-fade-in">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home Page</Link></li>
            <li><Link to="/courses">Browse Courses</Link></li>
            <li><Link to="/instructors">Our Instructors</Link></li>
            <li><Link to="/about">About Our LMS</Link></li>
            <li><Link to="/contact">Contact Support</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-column animate-fade-in">
          <h3>Contact Us</h3>
          <ul className="contact-info">
            <li>
              <MapPin size={18} className="contact-icon" />
              <span>100 Innovation Way, Tech Park, NY 10001</span>
            </li>
            <li>
              <Phone size={18} className="contact-icon" />
              <span>+1 (800) 123-4567</span>
            </li>
            <li>
              <Mail size={18} className="contact-icon" />
              <span>support@edusphere-lms.com</span>
            </li>
          </ul>
        </div>

        {/* Newsletter subscription */}
        <div className="footer-column footer-newsletter animate-fade-in">
          <h3>Stay Updated</h3>
          <p>Subscribe to our newsletter to receive the latest updates, tips, and course discount announcements.</p>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Your email address" 
              required 
              className="newsletter-input" 
            />
            <button type="submit" className="newsletter-btn" aria-label="Subscribe">
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p>&copy; {new Date().getFullYear()} EduSphere LMS. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
