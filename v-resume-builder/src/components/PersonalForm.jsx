import './FormSection.css';

export default function PersonalForm({ data, onChange }) {
  const set = (field, val) => onChange({ ...data, [field]: val });

  return (
    <div className="form-section fade-in">
      <div className="form-section-header">
        <div className="section-icon">👤</div>
        <div>
          <h2 className="section-title">Personal Information</h2>
          <p className="section-subtitle">This is the foundation of your resume. Fill it carefully.</p>
        </div>
      </div>

      <div className="form-grid form-grid-2">
        <div className="form-field">
          <label>Full Name *</label>
          <input value={data.fullName} onChange={e => set('fullName', e.target.value)} placeholder="e.g. Yashraj Sharma" />
        </div>
        <div className="form-field">
          <label>Professional Title *</label>
          <input value={data.jobTitle} onChange={e => set('jobTitle', e.target.value)} placeholder="e.g. Full Stack Developer" />
        </div>
        <div className="form-field">
          <label>Email *</label>
          <input type="email" value={data.email} onChange={e => set('email', e.target.value)} placeholder="you@example.com" />
        </div>
        <div className="form-field">
          <label>Phone *</label>
          <input value={data.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 98765 43210" />
        </div>
        <div className="form-field">
          <label>Location</label>
          <input value={data.location} onChange={e => set('location', e.target.value)} placeholder="Pune, Maharashtra, India" />
        </div>
        <div className="form-field">
          <label>Website / Portfolio</label>
          <input value={data.website} onChange={e => set('website', e.target.value)} placeholder="https://yoursite.com" />
        </div>
        <div className="form-field">
          <label>LinkedIn URL</label>
          <input value={data.linkedin} onChange={e => set('linkedin', e.target.value)} placeholder="linkedin.com/in/yourprofile" />
        </div>
        <div className="form-field">
          <label>GitHub URL</label>
          <input value={data.github} onChange={e => set('github', e.target.value)} placeholder="github.com/yourusername" />
        </div>
      </div>

      <div className="form-field">
        <label>Professional Summary *</label>
        <div className="textarea-wrap">
          <textarea
            value={data.summary}
            onChange={e => set('summary', e.target.value)}
            placeholder="Write 2-4 compelling sentences about your experience, key skills, and career goals. This is the first thing recruiters and ATS systems read..."
            rows={5}
          />
          <div className={`char-count ${data.summary?.length >= 80 ? 'good' : 'bad'}`}>
            {data.summary?.length || 0} chars {data.summary?.length >= 80 ? '✓' : '(aim for 80+)'}
          </div>
        </div>
      </div>
    </div>
  );
}
