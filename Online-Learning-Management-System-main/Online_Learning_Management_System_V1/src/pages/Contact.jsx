import React, { useState } from 'react';
import { Mail, Phone, Clock, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email structure';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Message subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message content is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear field error on change
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSuccess(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }
  };

  return (
    <div className="contact-page container">
      {/* Page Header */}
      <header className="contact-header animate-fade-in">
        <span className="badge badge-primary">Support Desk</span>
        <h1>Get in Touch With Us</h1>
        <p className="subtitle">
          Have queries about syllabus access, corporate licenses, or custom educator setups? We are here to help.
        </p>
      </header>

      {/* Main Body Grid */}
      <main className="contact-grid">
        {/* Left Column: Form Card */}
        <section className="contact-form-card animate-slide-left">
          <h2>Send Us a Message</h2>
          <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>We typically reply within 24 operational hours.</p>

          {isSuccess && (
            <div className="custom-alert custom-alert-success animate-fade-in">
              <CheckCircle size={18} />
              <span>Thank you! Your query has been recorded. Our support team will get in touch shortly.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input
                id="name"
                type="text"
                name="name"
                className="form-input"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && (
                <span className="form-error">
                  <AlertCircle size={14} /> {errors.name}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                className="form-input"
                placeholder="johndoe@example.com"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <span className="form-error">
                  <AlertCircle size={14} /> {errors.email}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="subject" className="form-label">Subject</label>
              <input
                id="subject"
                type="text"
                name="subject"
                className="form-input"
                placeholder="Course Enrollment Query"
                value={formData.subject}
                onChange={handleInputChange}
              />
              {errors.subject && (
                <span className="form-error">
                  <AlertCircle size={14} /> {errors.subject}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">Message Content</label>
              <textarea
                id="message"
                name="message"
                className="form-input form-textarea"
                placeholder="Type your questions or comments here..."
                value={formData.message}
                onChange={handleInputChange}
              />
              {errors.message && (
                <span className="form-error">
                  <AlertCircle size={14} /> {errors.message}
                </span>
              )}
            </div>

            <button type="submit" className="btn btn-primary btn-full submit-contact-btn">
              Send Message <Send size={16} />
            </button>
          </form>
        </section>

        {/* Right Column: Support Details & Coordinates */}
        <aside className="contact-details-side animate-slide-right">
          {/* Coordinates card */}
          <div className="coordinates-card">
            <h3>Support Directory</h3>
            
            <div className="coordinate-node">
              <Mail className="node-icon" size={20} />
              <div>
                <h5>Email Support</h5>
                <p>support@edusphere.org</p>
                <p>admissions@edusphere.org</p>
              </div>
            </div>

            <div className="coordinate-node">
              <Phone className="node-icon" size={20} />
              <div>
                <h5>Phone Contact</h5>
                <p>+1 (555) 019-2834 (Admissions)</p>
                <p>+1 (555) 019-5867 (Tech Support)</p>
              </div>
            </div>

            <div className="coordinate-node">
              <Clock className="node-icon" size={20} />
              <div>
                <h5>Operational Hours</h5>
                <p>Monday - Friday: 09:00 - 18:00 EST</p>
                <p>Saturday: 10:00 - 14:00 EST</p>
              </div>
            </div>

            <div className="coordinate-node">
              <MapPin className="node-icon" size={20} />
              <div>
                <h5>Global HQ</h5>
                <p>450 EduSphere Way, Suite 800</p>
                <p>Boston, MA 02110, United States</p>
              </div>
            </div>
          </div>

          {/* Interactive Map Mock */}
          <div className="mock-map-card">
            <div className="mock-map-dot animate-pulse"></div>
            <span>Boston Office HQ (Mock Map Coordinate)</span>
          </div>
        </aside>
      </main>
    </div>
  );
}
