import { useState } from 'react';
import { generateId, emptyExperience } from '../data/defaultResume';
import './FormSection.css';

function ExperienceCard({ exp, onUpdate, onDelete }) {
  const [open, setOpen] = useState(true);
  const set = (f, v) => onUpdate({ ...exp, [f]: v });

  return (
    <div className="entry-card">
      <div className="entry-card-header">
        <div>
          <div className="entry-card-title">{exp.position || 'New Position'}</div>
          <div className="entry-card-sub">{exp.company || 'Company'}</div>
        </div>
        <div className="entry-actions">
          <button className="btn-icon" onClick={() => setOpen(!open)} title="Toggle">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points={open ? "18 15 12 9 6 15" : "6 9 12 15 18 9"} />
            </svg>
          </button>
          <button className="btn-icon" onClick={onDelete} title="Delete">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="form-grid form-grid-2">
            <div className="form-field">
              <label>Job Title *</label>
              <input value={exp.position} onChange={e => set('position', e.target.value)} placeholder="Software Engineer" />
            </div>
            <div className="form-field">
              <label>Company *</label>
              <input value={exp.company} onChange={e => set('company', e.target.value)} placeholder="Google, Inc." />
            </div>
            <div className="form-field">
              <label>Location</label>
              <input value={exp.location} onChange={e => set('location', e.target.value)} placeholder="Pune, India" />
            </div>
            <div className="form-field">
              <label>Employment Type</label>
              <select value={exp.type || 'full-time'} onChange={e => set('type', e.target.value)}>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="internship">Internship</option>
                <option value="freelance">Freelance</option>
                <option value="contract">Contract</option>
              </select>
            </div>
            <div className="form-field">
              <label>Start Date *</label>
              <input type="month" value={exp.startDate} onChange={e => set('startDate', e.target.value)} />
            </div>
            <div className="form-field">
              <label>End Date</label>
              <input type="month" value={exp.endDate} onChange={e => set('endDate', e.target.value)} disabled={exp.current} placeholder="Present" />
              <label style={{ marginTop: 6, flexDirection: 'row', alignItems: 'center', gap: 6, textTransform: 'none', letterSpacing: 0, fontSize: 12, display: 'flex' }}>
                <input type="checkbox" style={{ width: 'auto' }} checked={exp.current} onChange={e => set('current', e.target.checked)} />
                Currently working here
              </label>
            </div>
          </div>

          <div className="form-field">
            <label>Job Description & Achievements *</label>
            <textarea
              value={exp.description}
              onChange={e => set('description', e.target.value)}
              placeholder={`• Led development of microservices architecture reducing latency by 40%\n• Collaborated with cross-functional team of 8 engineers\n• Implemented CI/CD pipeline improving deployment frequency by 3x`}
              rows={5}
            />
            <p style={{ fontSize: 11, color: 'var(--text3)', marginTop: 5 }}>
              💡 Use bullet points (•), start with action verbs, and quantify achievements for best ATS score.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ExperienceForm({ data, onChange }) {
  const add = () => onChange([...data, { ...emptyExperience, id: generateId() }]);
  const update = (id, updated) => onChange(data.map(e => e.id === id ? updated : e));
  const del = (id) => onChange(data.filter(e => e.id !== id));

  return (
    <div className="form-section fade-in">
      <div className="form-section-header">
        <div className="section-icon">💼</div>
        <div>
          <h2 className="section-title">Work Experience</h2>
          <p className="section-subtitle">List your most recent experience first. Quantify achievements with numbers.</p>
        </div>
      </div>

      {data.map(exp => (
        <ExperienceCard key={exp.id} exp={exp} onUpdate={u => update(exp.id, u)} onDelete={() => del(exp.id)} />
      ))}

      <button className="add-btn" onClick={add}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        Add Work Experience
      </button>
    </div>
  );
}
