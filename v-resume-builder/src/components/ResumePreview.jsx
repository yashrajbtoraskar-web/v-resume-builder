import './ResumePreview.css';

const fmtDate = (d) => {
  if (!d) return '';
  const [y, m] = d.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[parseInt(m) - 1]} ${y}`;
};

function ModernTemplate({ r }) {
  const p = r.personal;
  return (
    <div className="tmpl tmpl-modern">
      <div className="tmpl-sidebar">
        <div className="tmpl-name-block">
          <div className="tmpl-initials">{p.fullName ? p.fullName.split(' ').map(n => n[0]).join('').slice(0,2) : 'YS'}</div>
          <h1 className="tmpl-name">{p.fullName || 'Your Name'}</h1>
          <p className="tmpl-title">{p.jobTitle || 'Professional Title'}</p>
        </div>

        <div className="tmpl-contact-block">
          {p.email && <div className="tmpl-contact-item"><span className="ci-icon">✉</span><span>{p.email}</span></div>}
          {p.phone && <div className="tmpl-contact-item"><span className="ci-icon">📞</span><span>{p.phone}</span></div>}
          {p.location && <div className="tmpl-contact-item"><span className="ci-icon">📍</span><span>{p.location}</span></div>}
          {p.linkedin && <div className="tmpl-contact-item"><span className="ci-icon">in</span><span>{p.linkedin}</span></div>}
          {p.github && <div className="tmpl-contact-item"><span className="ci-icon">⌥</span><span>{p.github}</span></div>}
          {p.website && <div className="tmpl-contact-item"><span className="ci-icon">🌐</span><span>{p.website}</span></div>}
        </div>

        {r.skills.length > 0 && (
          <div className="tmpl-sidebar-section">
            <h3 className="tmpl-sidebar-heading">Skills</h3>
            <div className="tmpl-skill-list">
              {r.skills.map((s, i) => <div key={i} className="tmpl-skill-item"><span className="tmpl-skill-dot" />{s}</div>)}
            </div>
          </div>
        )}

        {r.certifications.length > 0 && (
          <div className="tmpl-sidebar-section">
            <h3 className="tmpl-sidebar-heading">Certifications</h3>
            {r.certifications.map((c, i) => (
              <div key={i} className="tmpl-cert-item">
                <div className="tmpl-cert-name">{c.name}</div>
                <div className="tmpl-cert-issuer">{c.issuer} {c.date && `· ${fmtDate(c.date)}`}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="tmpl-main">
        {p.summary && (
          <div className="tmpl-section">
            <h2 className="tmpl-heading">Summary</h2>
            <p className="tmpl-summary">{p.summary}</p>
          </div>
        )}

        {r.experience.length > 0 && (
          <div className="tmpl-section">
            <h2 className="tmpl-heading">Experience</h2>
            {r.experience.map((e, i) => (
              <div key={i} className="tmpl-exp-item">
                <div className="tmpl-exp-header">
                  <div>
                    <div className="tmpl-exp-title">{e.position}</div>
                    <div className="tmpl-exp-company">{e.company}{e.location ? ` · ${e.location}` : ''}</div>
                  </div>
                  <div className="tmpl-exp-dates">
                    {fmtDate(e.startDate)} – {e.current ? 'Present' : fmtDate(e.endDate)}
                  </div>
                </div>
                {e.description && (
                  <div className="tmpl-exp-desc">
                    {e.description.split('\n').map((l, j) => l.trim() && <p key={j}>{l.trim()}</p>)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {r.education.length > 0 && (
          <div className="tmpl-section">
            <h2 className="tmpl-heading">Education</h2>
            {r.education.map((e, i) => (
              <div key={i} className="tmpl-exp-item">
                <div className="tmpl-exp-header">
                  <div>
                    <div className="tmpl-exp-title">{e.institution}</div>
                    <div className="tmpl-exp-company">{e.degree}{e.field ? ` in ${e.field}` : ''}{e.gpa ? ` · ${e.gpa}` : ''}</div>
                  </div>
                  <div className="tmpl-exp-dates">
                    {fmtDate(e.startDate)} – {fmtDate(e.endDate)}
                  </div>
                </div>
                {e.highlights && <p className="tmpl-exp-desc">{e.highlights}</p>}
              </div>
            ))}
          </div>
        )}

        {r.projects.length > 0 && (
          <div className="tmpl-section">
            <h2 className="tmpl-heading">Projects</h2>
            {r.projects.map((pr, i) => (
              <div key={i} className="tmpl-exp-item">
                <div className="tmpl-exp-header">
                  <div className="tmpl-exp-title">{pr.name}</div>
                  {pr.technologies && <div className="tmpl-tech-tag">{pr.technologies}</div>}
                </div>
                <p className="tmpl-exp-desc">{pr.description}</p>
                <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                  {pr.link && <a href={pr.link} className="tmpl-link">🌐 Live</a>}
                  {pr.github && <a href={pr.github} className="tmpl-link">⌥ GitHub</a>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ClassicTemplate({ r }) {
  const p = r.personal;
  return (
    <div className="tmpl tmpl-classic">
      <div className="tmpl-classic-header">
        <h1 className="tmpl-classic-name">{p.fullName || 'Your Name'}</h1>
        <p className="tmpl-classic-title">{p.jobTitle}</p>
        <div className="tmpl-classic-contacts">
          {[p.email, p.phone, p.location, p.linkedin].filter(Boolean).join(' | ')}
        </div>
      </div>

      {p.summary && (
        <div className="tmpl-classic-section">
          <h2 className="tmpl-classic-heading">PROFESSIONAL SUMMARY</h2>
          <p>{p.summary}</p>
        </div>
      )}

      {r.experience.length > 0 && (
        <div className="tmpl-classic-section">
          <h2 className="tmpl-classic-heading">WORK EXPERIENCE</h2>
          {r.experience.map((e, i) => (
            <div key={i} className="tmpl-classic-entry">
              <div className="tmpl-classic-entry-header">
                <strong>{e.position}</strong> — {e.company}{e.location ? `, ${e.location}` : ''}
                <span className="tmpl-classic-dates">{fmtDate(e.startDate)} – {e.current ? 'Present' : fmtDate(e.endDate)}</span>
              </div>
              {e.description && <div className="tmpl-classic-desc">{e.description.split('\n').map((l,j) => l.trim() && <p key={j}>{l.trim()}</p>)}</div>}
            </div>
          ))}
        </div>
      )}

      {r.education.length > 0 && (
        <div className="tmpl-classic-section">
          <h2 className="tmpl-classic-heading">EDUCATION</h2>
          {r.education.map((e, i) => (
            <div key={i} className="tmpl-classic-entry">
              <div className="tmpl-classic-entry-header">
                <strong>{e.institution}</strong> — {e.degree}{e.field ? ` in ${e.field}` : ''}
                <span className="tmpl-classic-dates">{fmtDate(e.startDate)} – {fmtDate(e.endDate)}</span>
              </div>
              {e.gpa && <p>GPA: {e.gpa}</p>}
              {e.highlights && <p>{e.highlights}</p>}
            </div>
          ))}
        </div>
      )}

      {r.skills.length > 0 && (
        <div className="tmpl-classic-section">
          <h2 className="tmpl-classic-heading">SKILLS</h2>
          <p>{r.skills.join(' · ')}</p>
        </div>
      )}

      {r.projects.length > 0 && (
        <div className="tmpl-classic-section">
          <h2 className="tmpl-classic-heading">PROJECTS</h2>
          {r.projects.map((pr, i) => (
            <div key={i} className="tmpl-classic-entry">
              <div className="tmpl-classic-entry-header"><strong>{pr.name}</strong>{pr.technologies && ` | ${pr.technologies}`}</div>
              <p>{pr.description}</p>
            </div>
          ))}
        </div>
      )}

      {r.certifications.length > 0 && (
        <div className="tmpl-classic-section">
          <h2 className="tmpl-classic-heading">CERTIFICATIONS</h2>
          {r.certifications.map((c, i) => (
            <div key={i} className="tmpl-classic-entry">
              <strong>{c.name}</strong> — {c.issuer}{c.date && ` (${fmtDate(c.date)})`}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ExecutiveTemplate({ r }) {
  const p = r.personal;
  return (
    <div className="tmpl tmpl-exec">
      <div className="tmpl-exec-header">
        <div className="tmpl-exec-accent" />
        <div className="tmpl-exec-name-block">
          <h1 className="tmpl-exec-name">{p.fullName || 'Your Name'}</h1>
          <p className="tmpl-exec-title">{p.jobTitle}</p>
        </div>
        <div className="tmpl-exec-contacts">
          <div className="tmpl-exec-contact-grid">
            {p.email && <span>✉ {p.email}</span>}
            {p.phone && <span>📞 {p.phone}</span>}
            {p.location && <span>📍 {p.location}</span>}
            {p.linkedin && <span>in {p.linkedin}</span>}
          </div>
        </div>
      </div>

      <div className="tmpl-exec-body">
        {p.summary && (
          <div className="tmpl-exec-section">
            <div className="tmpl-exec-heading-row"><h2 className="tmpl-exec-heading">Executive Summary</h2></div>
            <p className="tmpl-exec-summary">{p.summary}</p>
          </div>
        )}

        {r.skills.length > 0 && (
          <div className="tmpl-exec-section">
            <div className="tmpl-exec-heading-row"><h2 className="tmpl-exec-heading">Core Competencies</h2></div>
            <div className="tmpl-exec-skills">
              {r.skills.map((s,i) => <span key={i} className="tmpl-exec-skill">{s}</span>)}
            </div>
          </div>
        )}

        {r.experience.length > 0 && (
          <div className="tmpl-exec-section">
            <div className="tmpl-exec-heading-row"><h2 className="tmpl-exec-heading">Professional Experience</h2></div>
            {r.experience.map((e,i) => (
              <div key={i} className="tmpl-exec-entry">
                <div className="tmpl-exec-entry-top">
                  <div>
                    <div className="tmpl-exec-pos">{e.position}</div>
                    <div className="tmpl-exec-co">{e.company}{e.location ? ` · ${e.location}` : ''}</div>
                  </div>
                  <div className="tmpl-exec-date">{fmtDate(e.startDate)} – {e.current ? 'Present' : fmtDate(e.endDate)}</div>
                </div>
                {e.description && <div className="tmpl-exec-desc">{e.description.split('\n').map((l,j)=>l.trim()&&<p key={j}>{l.trim()}</p>)}</div>}
              </div>
            ))}
          </div>
        )}

        <div className="tmpl-exec-two-col">
          {r.education.length > 0 && (
            <div className="tmpl-exec-section">
              <div className="tmpl-exec-heading-row"><h2 className="tmpl-exec-heading">Education</h2></div>
              {r.education.map((e,i) => (
                <div key={i} className="tmpl-exec-entry">
                  <div className="tmpl-exec-pos">{e.degree}{e.field ? ` in ${e.field}` : ''}</div>
                  <div className="tmpl-exec-co">{e.institution}</div>
                  <div className="tmpl-exec-date">{fmtDate(e.endDate)}{e.gpa ? ` · GPA: ${e.gpa}` : ''}</div>
                </div>
              ))}
            </div>
          )}

          {r.certifications.length > 0 && (
            <div className="tmpl-exec-section">
              <div className="tmpl-exec-heading-row"><h2 className="tmpl-exec-heading">Certifications</h2></div>
              {r.certifications.map((c,i) => (
                <div key={i} className="tmpl-exec-entry">
                  <div className="tmpl-exec-pos">{c.name}</div>
                  <div className="tmpl-exec-co">{c.issuer} {c.date && `· ${fmtDate(c.date)}`}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ResumePreview({ resume }) {
  const templates = { modern: ModernTemplate, classic: ClassicTemplate, executive: ExecutiveTemplate };
  const Template = templates[resume.template] || ModernTemplate;
  return (
    <div className="resume-preview-wrap">
      <div id="resume-preview" className="resume-sheet">
        <Template r={resume} />
      </div>
    </div>
  );
}
