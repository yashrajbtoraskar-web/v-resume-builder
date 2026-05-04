import { useState } from 'react';
import { generateId } from '../data/defaultResume';
import './FormSection.css';

// ─── Education ───────────────────────────────────────────────
function EduCard({ edu, onUpdate, onDelete }) {
  const [open, setOpen] = useState(true);
  const set = (f, v) => onUpdate({ ...edu, [f]: v });
  return (
    <div className="entry-card">
      <div className="entry-card-header">
        <div>
          <div className="entry-card-title">{edu.institution || 'Institution'}</div>
          <div className="entry-card-sub">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</div>
        </div>
        <div className="entry-actions">
          <button className="btn-icon" onClick={() => setOpen(!open)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points={open?"18 15 12 9 6 15":"6 9 12 15 18 9"}/></svg>
          </button>
          <button className="btn-icon" onClick={onDelete}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6M9 6V4h6v2"/></svg>
          </button>
        </div>
      </div>
      {open && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="form-grid form-grid-2">
            <div className="form-field">
              <label>Institution *</label>
              <input value={edu.institution} onChange={e => set('institution', e.target.value)} placeholder="MIT World Peace University" />
            </div>
            <div className="form-field">
              <label>Degree *</label>
              <select value={edu.degree} onChange={e => set('degree', e.target.value)}>
                <option value="">Select degree</option>
                <option>Bachelor of Technology</option>
                <option>Bachelor of Engineering</option>
                <option>Bachelor of Science</option>
                <option>Bachelor of Computer Applications</option>
                <option>Master of Computer Applications</option>
                <option>Master of Technology</option>
                <option>Master of Science</option>
                <option>MBA</option>
                <option>PhD</option>
                <option>Diploma</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-field">
              <label>Field of Study</label>
              <input value={edu.field} onChange={e => set('field', e.target.value)} placeholder="Computer Science" />
            </div>
            <div className="form-field">
              <label>GPA / Percentage</label>
              <input value={edu.gpa} onChange={e => set('gpa', e.target.value)} placeholder="8.5 / 10  or  85%" />
            </div>
            <div className="form-field">
              <label>Start Date</label>
              <input type="month" value={edu.startDate} onChange={e => set('startDate', e.target.value)} />
            </div>
            <div className="form-field">
              <label>End Date (or expected)</label>
              <input type="month" value={edu.endDate} onChange={e => set('endDate', e.target.value)} />
            </div>
          </div>
          <div className="form-field">
            <label>Highlights / Activities</label>
            <textarea rows={3} value={edu.highlights} onChange={e => set('highlights', e.target.value)} placeholder="Relevant coursework, clubs, achievements, thesis title..." />
          </div>
        </div>
      )}
    </div>
  );
}

export function EducationForm({ data, onChange }) {
  const add = () => onChange([...data, { id: generateId(), institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '', highlights: '' }]);
  const update = (id, u) => onChange(data.map(e => e.id === id ? u : e));
  const del = (id) => onChange(data.filter(e => e.id !== id));
  return (
    <div className="form-section fade-in">
      <div className="form-section-header">
        <div className="section-icon">🎓</div>
        <div>
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle">Include all relevant degrees, certifications, and coursework.</p>
        </div>
      </div>
      {data.map(edu => <EduCard key={edu.id} edu={edu} onUpdate={u => update(edu.id, u)} onDelete={() => del(edu.id)} />)}
      <button className="add-btn" onClick={add}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Add Education
      </button>
    </div>
  );
}

// ─── Skills ──────────────────────────────────────────────────
export function SkillsForm({ data, onChange }) {
  const [input, setInput] = useState('');
  const addSkill = () => {
    const trimmed = input.trim();
    if (trimmed && !data.includes(trimmed)) {
      onChange([...data, trimmed]);
      setInput('');
    }
  };
  const remove = (s) => onChange(data.filter(x => x !== s));
  const handleKey = (e) => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addSkill(); } };

  const suggestions = ['JavaScript','TypeScript','React','Node.js','Python','Java','SQL','MongoDB','Git','Docker','AWS','REST API','GraphQL','Machine Learning','Data Analysis','Spring Boot','Kubernetes','Redis','PostgreSQL'];

  return (
    <div className="form-section fade-in">
      <div className="form-section-header">
        <div className="section-icon">⚡</div>
        <div>
          <h2 className="section-title">Skills</h2>
          <p className="section-subtitle">ATS systems match your skills to job keywords. Add 8+ relevant skills.</p>
        </div>
      </div>

      <div className="form-field">
        <label>Add a Skill</label>
        <div className="skill-input-row">
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey} placeholder="Type a skill and press Enter..." />
          <button className="btn btn-primary" onClick={addSkill} style={{ whiteSpace: 'nowrap' }}>+ Add</button>
        </div>
      </div>

      {data.length > 0 && (
        <div>
          <label>Your Skills ({data.length})</label>
          <div className="skill-tags">
            {data.map(s => (
              <span key={s} className="skill-tag">
                {s}
                <button onClick={() => remove(s)}>×</button>
              </span>
            ))}
          </div>
        </div>
      )}

      <div>
        <label>Quick Add (click to add)</label>
        <div className="skill-tags">
          {suggestions.filter(s => !data.includes(s)).map(s => (
            <span key={s} className="skill-tag" onClick={() => onChange([...data, s])} style={{ cursor: 'pointer', opacity: 0.6 }}>
              + {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Projects ────────────────────────────────────────────────
function ProjectCard({ proj, onUpdate, onDelete }) {
  const set = (f, v) => onUpdate({ ...proj, [f]: v });
  return (
    <div className="entry-card">
      <div className="entry-card-header">
        <div className="entry-card-title">{proj.name || 'New Project'}</div>
        <button className="btn-icon" onClick={onDelete}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6M9 6V4h6v2"/></svg>
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div className="form-grid form-grid-2">
          <div className="form-field">
            <label>Project Name *</label>
            <input value={proj.name} onChange={e => set('name', e.target.value)} placeholder="V Resume Builder" />
          </div>
          <div className="form-field">
            <label>Technologies Used</label>
            <input value={proj.technologies} onChange={e => set('technologies', e.target.value)} placeholder="React, Node.js, MongoDB" />
          </div>
          <div className="form-field">
            <label>Live URL</label>
            <input value={proj.link} onChange={e => set('link', e.target.value)} placeholder="https://..." />
          </div>
          <div className="form-field">
            <label>GitHub URL</label>
            <input value={proj.github} onChange={e => set('github', e.target.value)} placeholder="github.com/..." />
          </div>
        </div>
        <div className="form-field">
          <label>Description *</label>
          <textarea rows={3} value={proj.description} onChange={e => set('description', e.target.value)} placeholder="What did you build? What problem did it solve? What was your impact?" />
        </div>
      </div>
    </div>
  );
}

export function ProjectsForm({ data, onChange }) {
  const add = () => onChange([...data, { id: generateId(), name: '', description: '', technologies: '', link: '', github: '' }]);
  const update = (id, u) => onChange(data.map(p => p.id === id ? u : p));
  const del = (id) => onChange(data.filter(p => p.id !== id));
  return (
    <div className="form-section fade-in">
      <div className="form-section-header">
        <div className="section-icon">🚀</div>
        <div>
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">Showcase your best work. Especially important for fresh graduates.</p>
        </div>
      </div>
      {data.map(p => <ProjectCard key={p.id} proj={p} onUpdate={u => update(p.id, u)} onDelete={() => del(p.id)} />)}
      <button className="add-btn" onClick={add}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Add Project
      </button>
    </div>
  );
}

// ─── Certifications ──────────────────────────────────────────
export function CertificationsForm({ data, onChange }) {
  const add = () => onChange([...data, { id: generateId(), name: '', issuer: '', date: '', credentialId: '', url: '' }]);
  const update = (id, u) => onChange(data.map(c => c.id === id ? u : c));
  const del = (id) => onChange(data.filter(c => c.id !== id));
  const set = (id, f, v) => update(id, { ...data.find(c => c.id === id), [f]: v });
  return (
    <div className="form-section fade-in">
      <div className="form-section-header">
        <div className="section-icon">🏆</div>
        <div>
          <h2 className="section-title">Certifications</h2>
          <p className="section-subtitle">Professional certifications and licenses strengthen your profile.</p>
        </div>
      </div>
      {data.map(cert => (
        <div key={cert.id} className="entry-card">
          <div className="entry-card-header">
            <div className="entry-card-title">{cert.name || 'Certification Name'}</div>
            <button className="btn-icon" onClick={() => del(cert.id)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6M9 6V4h6v2"/></svg>
            </button>
          </div>
          <div className="form-grid form-grid-2">
            <div className="form-field">
              <label>Certification Name *</label>
              <input value={cert.name} onChange={e => set(cert.id, 'name', e.target.value)} placeholder="AWS Solutions Architect" />
            </div>
            <div className="form-field">
              <label>Issuing Organization *</label>
              <input value={cert.issuer} onChange={e => set(cert.id, 'issuer', e.target.value)} placeholder="Amazon Web Services" />
            </div>
            <div className="form-field">
              <label>Issue Date</label>
              <input type="month" value={cert.date} onChange={e => set(cert.id, 'date', e.target.value)} />
            </div>
            <div className="form-field">
              <label>Credential ID</label>
              <input value={cert.credentialId} onChange={e => set(cert.id, 'credentialId', e.target.value)} placeholder="ABC123XYZ" />
            </div>
          </div>
        </div>
      ))}
      <button className="add-btn" onClick={add}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Add Certification
      </button>
    </div>
  );
}
