import React from 'react';
import './Legal.css';

export default function Privacy() {
  return (
    <div className="legal-page container">
      <div className="legal-card animate-fade-in">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last Updated: May 2026</p>
        
        <p className="intro">
          EduSphere operates as a mock Learning Management System ecosystem. This privacy policy explains how user cookies and registration states are loaded and persistent in browser stores.
        </p>

        <h2>1. Client-Side Data (localStorage)</h2>
        <p>
          EduSphere does not utilize databases, remote servers, API connectors, or trackers. All registration records (full name, email, credentials), syllabus learning progress trackers, chapter quiz scoring indexes, and student notebook scratchpads are strictly saved directly within the user browser via `localStorage` API nodes.
        </p>

        <h2>2. Data Subject Rights & Controls</h2>
        <p>
          Because all credentials are saved locally:
        </p>
        <ul>
          <li>We cannot view, share, recover, edit, or manipulate your data.</li>
          <li>Clearing browser cookies, history, or caching datasets will wipe out active learning progressions, mock certificates, and session profiles.</li>
          <li>You can reset everything at any time by logging out or selecting clear cache from your browser tools.</li>
        </ul>

        <h2>3. Third Party Integrations</h2>
        <p>
          The application does not embed third party advertisements, analytic trackers, or analytics metrics engines.
        </p>

        <h2>4. Contact Desk</h2>
        <p>
          For privacy concerns or query inquiries, write to support@edusphere.org.
        </p>
      </div>
    </div>
  );
}
