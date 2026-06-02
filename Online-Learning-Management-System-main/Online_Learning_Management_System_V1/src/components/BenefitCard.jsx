import React from 'react';
import * as Icons from 'lucide-react';
import './BenefitCard.css';

export default function BenefitCard({ iconName, title, description }) {
  const IconComponent = Icons[iconName] || Icons.CheckCircle;

  return (
    <div className="benefit-card">
      <div className="benefit-icon-wrapper">
        <IconComponent size={20} className="benefit-icon" />
      </div>
      <div className="benefit-content">
        <h3 className="benefit-title">{title}</h3>
        <p className="benefit-desc">{description}</p>
      </div>
    </div>
  );
}
