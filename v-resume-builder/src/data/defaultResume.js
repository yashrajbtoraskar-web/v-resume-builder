export const defaultResume = {
  personal: {
    fullName: '', jobTitle: '', email: '', phone: '',
    location: '', website: '', linkedin: '', github: '', summary: '',
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  template: 'modern',
};

export const emptyExperience = {
  id: '', company: '', position: '', location: '',
  startDate: '', endDate: '', current: false, description: '',
};

export const emptyEducation = {
  id: '', institution: '', degree: '', field: '',
  startDate: '', endDate: '', gpa: '', highlights: '',
};

export const templates = [
  { id: 'modern', name: 'Modern', desc: 'Clean two-column layout with accent colors' },
  { id: 'classic', name: 'Classic', desc: 'Traditional single-column, ATS-friendly' },
  { id: 'executive', name: 'Executive', desc: 'Bold heading with structured sections' },
];

export function generateId() {
  return Math.random().toString(36).substr(2, 9);
}
