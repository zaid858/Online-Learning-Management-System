import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import './SignUp.css';

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  });
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear validation error when typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};

    // Name check
    if (!formData.name.trim()) {
      newErrors.name = 'Full Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email check
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    // Password check
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm password check
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSuccess(true);
      
      const newUser = { 
        name: formData.name, 
        email: formData.email, 
        role: formData.role 
      };

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('activeRole', formData.role); // Set active viewer role

      // Dispatch global storage change event
      window.dispatchEvent(new Event('storage'));

      // Mock successful registration and auto-login redirection after 1.2 seconds
      setTimeout(() => {
        setIsSuccess(false);
        if (formData.role === 'instructor') {
          navigate('/instructor-workspace');
        } else if (formData.role === 'admin') {
          navigate('/admin-workspace');
        } else {
          navigate('/');
        }
      }, 1200);
    }
  };

  return (
    <div className="auth-page">
      <Link to="/" className="back-home-link">
        <ArrowLeft size={16} /> Back to Home
      </Link>

      <div className="auth-card signup-card">
        <div className="auth-header">
          <div className="auth-logo-icon signup-logo-icon">
            <User size={20} />
          </div>
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">Join EduSphere LMS and start your custom courses</p>
        </div>

        {isSuccess && (
          <div className="custom-alert custom-alert-success animate-fade-in">
            <CheckCircle size={18} />
            <span>Registration successful! Redirecting to dashboard...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Name field */}
          <div className="form-group">
            <label className="form-label" htmlFor="name">Full Name</label>
            <div className="input-with-icon">
              <User className="input-icon" size={18} />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`form-input icon-padding ${errors.name ? 'input-error-border' : ''}`}
                placeholder="John Doe"
              />
            </div>
            {errors.name && (
              <span className="form-error">
                <AlertCircle size={14} /> {errors.name}
              </span>
            )}
          </div>

          {/* Email field */}
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <div className="input-with-icon">
              <Mail className="input-icon" size={18} />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-input icon-padding ${errors.email ? 'input-error-border' : ''}`}
                placeholder="john@example.com"
              />
            </div>
            {errors.email && (
              <span className="form-error">
                <AlertCircle size={14} /> {errors.email}
              </span>
            )}
          </div>

          {/* Password field */}
          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <div className="input-with-icon">
              <Lock className="input-icon" size={18} />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`form-input icon-padding ${errors.password ? 'input-error-border' : ''}`}
                placeholder="Min 6 characters"
              />
            </div>
            {errors.password && (
              <span className="form-error">
                <AlertCircle size={14} /> {errors.password}
              </span>
            )}
          </div>

          {/* Confirm Password field */}
          <div className="form-group">
            <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-with-icon">
              <Lock className="input-icon" size={18} />
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`form-input icon-padding ${errors.confirmPassword ? 'input-error-border' : ''}`}
                placeholder="Repeat password"
              />
            </div>
            {errors.confirmPassword && (
              <span className="form-error">
                <AlertCircle size={14} /> {errors.confirmPassword}
              </span>
            )}
          </div>

          {/* Role selector field */}
          <div className="form-group">
            <label className="form-label" htmlFor="role">Register As</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="form-input"
            >
              <option value="student">Student / Learner</option>
              <option value="instructor">Instructor / Teacher</option>
              <option value="admin">Platform Administrator</option>
            </select>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary btn-full submit-btn" disabled={isSuccess}>
            {isSuccess ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="auth-footer-text">
          Already have an account?{' '}
          <Link to="/login" className="auth-link">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
