import { useState } from 'react';
import { exportToPDF } from '../utils/exportPDF';
import './Navbar.css';

export default function Navbar({ resume, activeSection, setActiveSection, atsScore }) {
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    await exportToPDF('resume-preview', resume.personal.fullName || 'my');
    setExporting(false);
  };

  const sections = ['personal', 'experience', 'education', 'skills', 'projects', 'certifications', 'finish'];
  const sectionLabels = {
    personal: 'Profile', experience: 'Experience', education: 'Education',
    skills: 'Skills', projects: 'Projects', certifications: 'Certs', finish: 'Finish'
  };

  const color = atsScore >= 85 ? '#34d399' : atsScore >= 70 ? '#fbbf24' : atsScore >= 50 ? '#f97316' : '#f87171';

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <span className="brand-v">Vyaish</span>
        <span className="brand-text">Resume</span>
        <span className="brand-dot" />
      </div>

      <div className="nav-steps">
        {sections.map((s, i) => (
          <button
            key={s}
            className={`nav-step ${activeSection === s ? 'active' : ''}`}
            onClick={() => setActiveSection(s)}
          >
            <span className="step-num">{i + 1}</span>
            <span className="step-label">{sectionLabels[s]}</span>
          </button>
        ))}
      </div>

      <div className="nav-right">
        <div className="ats-badge" style={{ '--score-color': color }}>
          <svg viewBox="0 0 36 36" className="ats-ring">
            <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5" />
            <circle
              cx="18" cy="18" r="15" fill="none"
              stroke={color} strokeWidth="2.5"
              strokeDasharray={`${(atsScore / 100) * 94.2} 94.2`}
              strokeLinecap="round"
              transform="rotate(-90 18 18)"
            />
          </svg>
          <div className="ats-info">
            <span className="ats-num" style={{ color }}>{atsScore}</span>
            <span className="ats-label">ATS</span>
          </div>
        </div>

        <button className="btn btn-gold" onClick={handleExport} disabled={exporting}>
          {exporting ? (
            <span className="spinner" />
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          )}
          {exporting ? 'Exporting...' : 'Export PDF'}
        </button>
      </div>
    </nav>
  );
}
