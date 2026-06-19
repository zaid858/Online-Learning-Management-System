import React from 'react';
import * as Icons from 'lucide-react';
import './lmsfeaturecard.css';

export default function LMSFeatureCard({ iconName, title, description, badge }) {
  // Dynamically resolve icon from name
  const IconComponent = Icons[iconName] || Icons.HelpCircle;

  return (
    <div className="feature-card">
      <div className="feature-icon-wrapper">
        <IconComponent size={24} className="feature-icon" />
      </div>
      
      {badge && <span className="badge badge-primary feature-badge">{badge}</span>}
      
      <h3 className="feature-title">{title}</h3>
      <p className="feature-desc">{description}</p>
    </div>
  );
}
