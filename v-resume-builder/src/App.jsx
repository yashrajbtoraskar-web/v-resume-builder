import { useState, useCallback, useEffect } from 'react';
import Navbar from './components/Navbar';
import PersonalForm from './components/PersonalForm';
import ExperienceForm from './components/ExperienceForm';
import { EducationForm, SkillsForm, ProjectsForm, CertificationsForm } from './components/OtherForms';
import FinishSection from './components/FinishSection';
import ResumePreview from './components/ResumePreview';
import ATSPanel from './components/ATSPanel';
import { defaultResume } from './data/defaultResume';
import { calculateATS } from './utils/atsScorer';
import './App.css';

const STORAGE_KEY = 'v-resume-data';

export default function App() {
  const [resume, setResume] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : defaultResume;
    } catch { return defaultResume; }
  });
  const [activeSection, setActiveSection] = useState('personal');
  const [previewScale, setPreviewScale] = useState(0.5);

  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resume));
    }, 500);
    return () => clearTimeout(timeout);
  }, [resume]);

  useEffect(() => {
    const updateScale = () => {
      const previewWidth = Math.min(window.innerWidth * 0.42, 500);
      setPreviewScale(previewWidth / 794);
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const updatePersonal = useCallback((personal) => setResume(r => ({ ...r, personal })), []);
  const updateExperience = useCallback((experience) => setResume(r => ({ ...r, experience })), []);
  const updateEducation = useCallback((education) => setResume(r => ({ ...r, education })), []);
  const updateSkills = useCallback((skills) => setResume(r => ({ ...r, skills })), []);
  const updateProjects = useCallback((projects) => setResume(r => ({ ...r, projects })), []);
  const updateCertifications = useCallback((certifications) => setResume(r => ({ ...r, certifications })), []);
  const updateTemplate = useCallback((template) => setResume(r => ({ ...r, template })), []);

  const atsResult = calculateATS(resume);

  const sectionOrder = ['personal', 'experience', 'education', 'skills', 'projects', 'certifications', 'finish'];
  const currentIdx = sectionOrder.indexOf(activeSection);

  const sections = {
    personal: <PersonalForm data={resume.personal} onChange={updatePersonal} />,
    experience: <ExperienceForm data={resume.experience} onChange={updateExperience} />,
    education: <EducationForm data={resume.education} onChange={updateEducation} />,
    skills: <SkillsForm data={resume.skills} onChange={updateSkills} />,
    projects: <ProjectsForm data={resume.projects} onChange={updateProjects} />,
    certifications: <CertificationsForm data={resume.certifications} onChange={updateCertifications} />,
    finish: <FinishSection resume={resume} onTemplateChange={updateTemplate} />,
  };

  return (
    <div className="app">
      <Navbar resume={resume} activeSection={activeSection} setActiveSection={setActiveSection} atsScore={atsResult.score} />
      <div className="app-body">
        <div className="form-panel">
          <div className="form-panel-inner">
            {sections[activeSection]}
            <div className="section-nav">
              {currentIdx > 0 && (
                <button className="btn btn-ghost" onClick={() => setActiveSection(sectionOrder[currentIdx - 1])}>← Back</button>
              )}
              <div style={{ flex: 1 }} />
              {currentIdx < sectionOrder.length - 1 && (
                <button className="btn btn-primary" onClick={() => setActiveSection(sectionOrder[currentIdx + 1])}>Next →</button>
              )}
            </div>
            <ATSPanel result={atsResult} />
          </div>
        </div>
        <div className="preview-panel">
          <div className="preview-sticky">
            <div className="preview-header">
              <span className="preview-title">Live Preview</span>
              <span className="autosave-badge">💾 Auto-saved</span>
            </div>
            <div className="preview-scroll">
              <div className="preview-scale-wrap" style={{ transform: `scale(${previewScale})`, transformOrigin: 'top center' }}>
                <ResumePreview resume={resume} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
