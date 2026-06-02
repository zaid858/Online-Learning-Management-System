import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '', role: 'student' });
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
    
    // Email/username check
    if (!formData.email.trim()) {
      newErrors.email = 'Email or Username is required';
    } else if (formData.email.includes('@')) {
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSuccess(true);
      const namePart = formData.email.includes('@') ? formData.email.split('@')[0] : formData.email;
      const displayName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
      
      const loggedUser = { 
        name: displayName, 
        email: formData.email, 
        role: formData.role 
      };
      
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(loggedUser));
      localStorage.setItem('activeRole', formData.role); // Set active viewer role

      // Dispatch global storage change event
      window.dispatchEvent(new Event('storage'));

      // Mock successful login redirection after 1.2 seconds
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

      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo-icon">
            <Lock size={20} />
          </div>
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Sign in to resume your learning achievements</p>
        </div>

        {isSuccess && (
          <div className="custom-alert custom-alert-success animate-fade-in">
            <CheckCircle size={18} />
            <span>Success! Redirecting to dashboard...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Email / Username field */}
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email or Username</label>
            <div className="input-with-icon">
              <Mail className="input-icon" size={18} />
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-input icon-padding ${errors.email ? 'input-error-border' : ''}`}
                placeholder="Enter email or username"
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
            <div className="form-label-row">
              <label className="form-label" htmlFor="password">Password</label>
              <a href="#forgot" className="forgot-password" onClick={(e) => { e.preventDefault(); alert("Password reset system linked to mock email provider."); }}>Forgot?</a>
            </div>
            <div className="input-with-icon">
              <Lock className="input-icon" size={18} />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`form-input icon-padding ${errors.password ? 'input-error-border' : ''}`}
                placeholder="••••••••"
              />
            </div>
            {errors.password && (
              <span className="form-error">
                <AlertCircle size={14} /> {errors.password}
              </span>
            )}
          </div>

          {/* Role selector field */}
          <div className="form-group">
            <label className="form-label" htmlFor="role">Sign In As</label>
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
            {isSuccess ? 'Logging In...' : 'Log In'}
          </button>
        </form>

        <p className="auth-footer-text">
          Don't have an account?{' '}
          <Link to="/signup" className="auth-link">
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
}
