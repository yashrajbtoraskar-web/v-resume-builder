import './FinishSection.css';
import { calculateATS } from '../utils/atsScorer';
import { exportToPDF } from '../utils/exportPDF';
import { useState } from 'react';

const templates = [
  { id: 'modern', name: 'Modern', emoji: '🎨', desc: 'Two-column with sidebar — best for tech roles' },
  { id: 'classic', name: 'Classic', emoji: '📄', desc: 'Single-column, maximum ATS compatibility' },
  { id: 'executive', name: 'Executive', emoji: '👔', desc: 'Bold header, structured — great for senior roles' },
];

export default function FinishSection({ resume, onTemplateChange }) {
  const [exporting, setExporting] = useState(false);
  const { score, grade, color, tips } = calculateATS(resume);

  const handleExport = async () => {
    setExporting(true);
    await exportToPDF('resume-preview', resume.personal.fullName || 'resume');
    setExporting(false);
  };

  const handleCopy = () => {
    const text = buildPlainText(resume);
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="finish-section fade-in">
      <div className="form-section-header">
        <div className="section-icon">🎉</div>
        <div>
          <h2 className="section-title">Finish & Export</h2>
          <p className="section-subtitle">Choose your template, review your ATS score, and download.</p>
        </div>
      </div>

      {/* ATS Summary */}
      <div className="finish-ats-card" style={{ '--c': color }}>
        <div className="finish-ats-left">
          <div className="finish-ats-score" style={{ color }}>{score}</div>
          <div className="finish-ats-label">/ 100 ATS Score</div>
          <div className="finish-ats-grade" style={{ color }}>{grade}</div>
        </div>
        <div className="finish-ats-right">
          {tips.slice(0, 3).map((t, i) => (
            <div key={i} className={`finish-tip finish-tip-${t.type}`}>
              <span>{t.type === 'error' ? '✗' : t.type === 'warn' ? '!' : 'i'}</span>
              {t.text}
            </div>
          ))}
          {tips.length === 0 && <div className="finish-tip-perfect">✨ Your resume is fully optimized!</div>}
        </div>
      </div>

      {/* Template Picker */}
      <div>
        <label style={{ marginBottom: 12, display: 'block' }}>Choose Template</label>
        <div className="template-grid">
          {templates.map(t => (
            <button
              key={t.id}
              className={`template-card ${resume.template === t.id ? 'selected' : ''}`}
              onClick={() => onTemplateChange(t.id)}
            >
              <div className="template-emoji">{t.emoji}</div>
              <div className="template-name">{t.name}</div>
              <div className="template-desc">{t.desc}</div>
              {resume.template === t.id && <div className="template-check">✓ Selected</div>}
            </button>
          ))}
        </div>
      </div>

      {/* Export Actions */}
      <div className="finish-actions">
        <button className="btn btn-gold finish-export-btn" onClick={handleExport} disabled={exporting}>
          {exporting ? <><span className="spinner" /> Generating PDF...</> : <>📥 Download PDF Resume</>}
        </button>
        <button className="btn btn-ghost" onClick={handleCopy}>
          📋 Copy as Plain Text
        </button>
      </div>

      <div className="finish-tips-box">
        <h4>📌 Pro Tips for ATS Success</h4>
        <ul>
          <li>Match keywords from the job description in your resume</li>
          <li>Use standard section headings: "Experience", "Education", "Skills"</li>
          <li>Avoid tables, graphics, or columns in Classic template for raw ATS submission</li>
          <li>Quantify achievements: "increased sales by 30%" beats "improved sales"</li>
          <li>Include both spelled out and abbreviated versions: "Machine Learning (ML)"</li>
        </ul>
      </div>
    </div>
  );
}

function buildPlainText(r) {
  const p = r.personal;
  let txt = `${p.fullName}\n${p.jobTitle}\n${[p.email, p.phone, p.location].filter(Boolean).join(' | ')}\n\n`;
  if (p.summary) txt += `SUMMARY\n${p.summary}\n\n`;
  if (r.experience.length) {
    txt += `EXPERIENCE\n`;
    r.experience.forEach(e => { txt += `${e.position} at ${e.company}\n${e.description}\n\n`; });
  }
  if (r.education.length) {
    txt += `EDUCATION\n`;
    r.education.forEach(e => { txt += `${e.degree} in ${e.field} — ${e.institution}\n\n`; });
  }
  if (r.skills.length) txt += `SKILLS\n${r.skills.join(', ')}\n\n`;
  return txt;
}
