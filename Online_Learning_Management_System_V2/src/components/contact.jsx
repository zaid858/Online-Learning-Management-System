import React, { useState } from 'react';
import { Mail, Phone, Clock, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import useTranslation from '../hooks/useTranslation';
import './contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const { t } = useTranslation();

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = t('Full Name Required');
    } else if (formData.name.trim().length < 2) {
      newErrors.name = t('Name Length Error');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('Email Required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('Email Invalid');
    }

    if (!formData.subject.trim()) {
      newErrors.subject = t('Subject Required');
    }

    if (!formData.message.trim()) {
      newErrors.message = t('Message Required');
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t('Message Length Error');
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
      // Save contact request mock for admin dashboard audit logs
      const contactRequests = JSON.parse(localStorage.getItem('contactRequests') || '[]');
      contactRequests.push({
        id: contactRequests.length + 1,
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        status: 'Pending'
      });
      localStorage.setItem('contactRequests', JSON.stringify(contactRequests));
      window.dispatchEvent(new Event('storage'));

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
        <span className="badge badge-primary">{t('Support Desk')}</span>
        <h1>{t('Get in Touch')}</h1>
        <p className="subtitle">
          {t('Contact Subtitle')}
        </p>
      </header>

      {/* Main Body Grid */}
      <main className="contact-grid">
        {/* Left Column: Form Card */}
        <section className="contact-form-card animate-slide-left">
          <h2>{t('Send Message Card Title')}</h2>
          <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>{t('Reply Info')}</p>

          {isSuccess && (
            <div className="custom-alert custom-alert-success animate-fade-in">
              <CheckCircle size={18} />
              <span>{t('Contact Success Message')}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="name" className="form-label">{t('Full Name')}</label>
              <input
                id="name"
                type="text"
                name="name"
                className="form-input"
                placeholder={t('John Doe')}
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
              <label htmlFor="email" className="form-label">{t('Email Address')}</label>
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
              <label htmlFor="subject" className="form-label">{t('Subject')}</label>
              <input
                id="subject"
                type="text"
                name="subject"
                className="form-input"
                placeholder={t('Course Enrollment Query')}
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
              <label htmlFor="message" className="form-label">{t('Message Content Input')}</label>
              <textarea
                id="message"
                name="message"
                className="form-input form-textarea"
                placeholder={t('Type comments placeholder')}
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
              {t('Send Message Button')} <Send size={16} />
            </button>
          </form>
        </section>

        {/* Right Column: Support Details & Coordinates */}
        <aside className="contact-details-side animate-slide-right">
          {/* Coordinates card */}
          <div className="coordinates-card">
            <h3>{t('Support Directory')}</h3>
            
            <div className="coordinate-node">
              <Mail className="node-icon" size={20} />
              <div>
                <h5>{t('Email Support')}</h5>
                <p>support@edusphere.org</p>
                <p>admissions@edusphere.org</p>
              </div>
            </div>

            <div className="coordinate-node">
              <Phone className="node-icon" size={20} />
              <div>
                <h5>{t('Phone Contact')}</h5>
                <p>+1 (555) 019-2834 (Admissions)</p>
                <p>+1 (555) 019-5867 (Tech Support)</p>
              </div>
            </div>

            <div className="coordinate-node">
              <Clock className="node-icon" size={20} />
              <div>
                <h5>{t('Operational Hours Label')}</h5>
                <p>{t('Monday - Friday: 09:00 - 18:00 EST')}</p>
                <p>{t('Saturday: 10:00 - 14:00 EST')}</p>
              </div>
            </div>

            <div className="coordinate-node">
              <MapPin className="node-icon" size={20} />
              <div>
                <h5>{t('Global HQ')}</h5>
                <p>{t('450 EduSphere Way, Suite 800')}</p>
                <p>{t('Boston, MA 02110, United States')}</p>
              </div>
            </div>
          </div>

          {/* Interactive Map Mock */}
          <div className="mock-map-card">
            <div className="mock-map-dot animate-pulse"></div>
            <span>{t('Map HQ Label')}</span>
          </div>
        </aside>
      </main>
    </div>
  );
}
