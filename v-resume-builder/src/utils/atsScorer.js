export function calculateATS(resume) {
  let score = 0;
  const tips = [];
  const passed = [];

  // Contact Info (20pts)
  const p = resume.personal;
  if (p.fullName) { score += 5; passed.push('Full name present'); }
  if (p.email) { score += 5; passed.push('Email address present'); }
  if (p.phone) { score += 5; passed.push('Phone number present'); }
  if (p.location) { score += 5; passed.push('Location present'); }
  if (!p.fullName) tips.push({ type: 'error', text: 'Add your full name' });
  if (!p.email) tips.push({ type: 'error', text: 'Add an email address' });
  if (!p.phone) tips.push({ type: 'error', text: 'Add a phone number' });
  if (!p.location) tips.push({ type: 'warn', text: 'Add your location (City, Country)' });

  // Summary (10pts)
  if (p.summary && p.summary.length >= 80) { score += 10; passed.push('Professional summary present'); }
  else if (p.summary) { score += 5; tips.push({ type: 'warn', text: 'Expand your summary to 80+ characters for better ATS scoring' }); }
  else tips.push({ type: 'error', text: 'Add a professional summary – critical for ATS' });

  // Experience (30pts)
  if (resume.experience.length === 0) {
    tips.push({ type: 'error', text: 'Add at least one work experience entry' });
  } else {
    score += Math.min(15, resume.experience.length * 5);
    passed.push(`${resume.experience.length} experience ${resume.experience.length === 1 ? 'entry' : 'entries'} added`);
    const withDesc = resume.experience.filter(e => e.description && e.description.length > 50);
    if (withDesc.length === resume.experience.length) { score += 10; passed.push('All experience entries have descriptions'); }
    else tips.push({ type: 'warn', text: 'Add detailed descriptions to all experience entries' });
    const withDates = resume.experience.filter(e => e.startDate);
    if (withDates.length === resume.experience.length) { score += 5; passed.push('All experience entries have dates'); }
    else tips.push({ type: 'warn', text: 'Add dates to all experience entries' });
  }

  // Education (15pts)
  if (resume.education.length === 0) {
    tips.push({ type: 'warn', text: 'Add your educational background' });
  } else {
    score += 10; passed.push('Education section complete');
    const withDegree = resume.education.filter(e => e.degree);
    if (withDegree.length === resume.education.length) { score += 5; passed.push('Degree info present in all education entries'); }
    else tips.push({ type: 'warn', text: 'Specify degree type in all education entries' });
  }

  // Skills (15pts)
  if (resume.skills.length === 0) {
    tips.push({ type: 'error', text: 'Add skills – ATS scans keywords from this section' });
  } else if (resume.skills.length < 5) {
    score += 5;
    tips.push({ type: 'warn', text: `Add more skills (currently ${resume.skills.length}, aim for 8+)` });
  } else {
    score += 15; passed.push(`${resume.skills.length} skills listed – great for ATS keyword matching`);
  }

  // Bonus (10pts)
  if (p.linkedin) { score += 3; passed.push('LinkedIn profile included'); }
  else tips.push({ type: 'info', text: 'Add your LinkedIn URL for recruiter access' });
  if (p.github || p.website) { score += 2; passed.push('Portfolio/GitHub link added'); }
  if (resume.projects.length > 0) { score += 3; passed.push('Projects section adds relevance'); }
  if (resume.certifications.length > 0) { score += 2; passed.push('Certifications boost credibility'); }

  score = Math.min(100, score);

  let grade, color;
  if (score >= 85) { grade = 'Excellent'; color = '#34d399'; }
  else if (score >= 70) { grade = 'Good'; color = '#fbbf24'; }
  else if (score >= 50) { grade = 'Fair'; color = '#f97316'; }
  else { grade = 'Needs Work'; color = '#f87171'; }

  return { score, grade, color, tips, passed };
}

export function generateId() {
  return Math.random().toString(36).substr(2, 9);
}
