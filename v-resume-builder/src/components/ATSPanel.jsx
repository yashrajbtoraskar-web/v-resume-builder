import './ATSPanel.css';

export default function ATSPanel({ result }) {
  const { score, grade, color, tips, passed } = result;

  return (
    <div className="ats-panel fade-in">
      <div className="ats-header">
        <div className="ats-score-big" style={{ '--c': color }}>
          <svg viewBox="0 0 120 120" className="ats-donut">
            <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
            <circle
              cx="60" cy="60" r="50" fill="none"
              stroke={color} strokeWidth="8"
              strokeDasharray={`${(score / 100) * 314} 314`}
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
              style={{ transition: 'stroke-dasharray 0.8s ease' }}
            />
          </svg>
          <div className="ats-center">
            <span className="ats-score-num" style={{ color }}>{score}</span>
            <span className="ats-score-label">/ 100</span>
          </div>
        </div>
        <div className="ats-meta">
          <h3 className="ats-grade" style={{ color }}>{grade}</h3>
          <p className="ats-desc">ATS Compatibility Score</p>
          <div className="ats-bar-wrap">
            <div className="ats-bar" style={{ width: `${score}%`, background: color }} />
          </div>
        </div>
      </div>

      <div className="ats-sections">
        {passed.length > 0 && (
          <div className="ats-section">
            <h4 className="ats-sec-title success">✓ Passing</h4>
            {passed.map((p, i) => (
              <div key={i} className="ats-item ats-pass">
                <span className="ats-icon">✓</span>
                <span>{p}</span>
              </div>
            ))}
          </div>
        )}

        {tips.length > 0 && (
          <div className="ats-section">
            <h4 className="ats-sec-title warn">⚡ Improvements</h4>
            {tips.map((t, i) => (
              <div key={i} className={`ats-item ats-tip ats-${t.type}`}>
                <span className="ats-icon">
                  {t.type === 'error' ? '✗' : t.type === 'warn' ? '!' : 'i'}
                </span>
                <span>{t.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="ats-footer">
        <p>💡 ATS systems scan keywords. Use <strong>industry terms</strong>, add <strong>measurable achievements</strong>, and keep formatting <strong>clean</strong>.</p>
      </div>
    </div>
  );
}
