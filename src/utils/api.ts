import { projectId, publicAnonKey } from './supabase/info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-b9482a76`;

// Helper function for API calls
async function apiCall(endpoint: string, options: RequestInit = {}) {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      // Try to parse error response
      const errorText = await response.text();
      let errorMessage = 'Request failed';
      
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.error || errorJson.message || errorMessage;
      } catch {
        // If response is not JSON, use the text
        if (errorText.includes('Not Found')) {
          errorMessage = 'API endpoint not found. Please ensure Supabase Edge Functions are deployed and database tables are created.';
        } else {
          errorMessage = errorText || errorMessage;
        }
      }
      
      throw new Error(errorMessage);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : {};
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error: Unable to connect to server');
  }
}

// Testimonials API
export const testimonialsAPI = {
  getAll: () => apiCall('/api/testimonials'),
  create: (data: { name: string; designation: string; company: string; quote: string }) =>
    apiCall('/api/testimonials', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: { name: string; designation: string; company: string; quote: string; approved: boolean }) =>
    apiCall(`/api/testimonials/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => apiCall(`/api/testimonials/${id}`, { method: 'DELETE' }),
};

// Team API
export const teamAPI = {
  getAll: () => apiCall('/api/team'),
  create: (data: { name: string; role: string; image: string; bio?: string; social: any }) =>
    apiCall('/api/team', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: { name: string; role: string; image: string; bio?: string; social: any }) =>
    apiCall(`/api/team/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => apiCall(`/api/team/${id}`, { method: 'DELETE' }),
};

// Projects API
export const projectsAPI = {
  getAll: () => apiCall('/api/projects'),
  create: (data: { title: string; category: string; tags: string[]; image: string; challenge: string; solution: string; outcome: string; technologies: string[] }) =>
    apiCall('/api/projects', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: { title: string; category: string; tags: string[]; image: string; challenge: string; solution: string; outcome: string; technologies: string[]; published: boolean }) =>
    apiCall(`/api/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => apiCall(`/api/projects/${id}`, { method: 'DELETE' }),
};

// Logos API
export const logosAPI = {
  getAll: () => apiCall('/api/logos'),
  create: (data: { name: string; image: string }) =>
    apiCall('/api/logos', { method: 'POST', body: JSON.stringify(data) }),
  delete: (id: string) => apiCall(`/api/logos/${id}`, { method: 'DELETE' }),
};

// Contact Forms API
export const contactAPI = {
  submit: (data: { name: string; email: string; phone?: string; company?: string; service?: string; message: string; formType?: string }) =>
    apiCall('/api/contact', { method: 'POST', body: JSON.stringify(data) }),
};

// Newsletter API
export const newsletterAPI = {
  subscribe: (email: string) =>
    apiCall('/api/newsletter/subscribe', { method: 'POST', body: JSON.stringify({ email }) }),
};

// Client Auth API
export const authAPI = {
  register: (data: { email: string; password: string; name: string; company: string }) =>
    apiCall('/api/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  verifyOTP: (email: string, otp: string) =>
    apiCall('/api/auth/verify-otp', { method: 'POST', body: JSON.stringify({ email, otp }) }),
  login: (email: string, password: string) =>
    apiCall('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
};

// Admin API
export const adminAPI = {
  getClients: () => apiCall('/api/admin/clients'),
  toggleClientStatus: (id: string) => apiCall(`/api/admin/clients/${id}/toggle`, { method: 'PUT' }),
};

// Jobs API
export const jobsAPI = {
  getAll: () => apiCall('/api/jobs'),
  create: (data: { 
    title: string; 
    department: string; 
    location: string; 
    type: string; 
    experience: string; 
    salary_range?: string;
    description: string; 
    responsibilities: string[]; 
    requirements: string[]; 
    benefits: string[];
    active: boolean;
  }) => apiCall('/api/jobs', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: { 
    title: string; 
    department: string; 
    location: string; 
    type: string; 
    experience: string; 
    salary_range?: string;
    description: string; 
    responsibilities: string[]; 
    requirements: string[]; 
    benefits: string[];
    active: boolean;
  }) => apiCall(`/api/jobs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => apiCall(`/api/jobs/${id}`, { method: 'DELETE' }),
};

// Job Applications API
export const jobApplicationsAPI = {
  getAll: () => apiCall('/api/job-applications'),
  submit: (data: {
    job_id: string;
    job_title: string;
    name: string;
    email: string;
    phone: string;
    location: string;
    experience: string;
    linkedin_url?: string;
    portfolio_url?: string;
    cover_letter: string;
    resume_url: string;
  }) => apiCall('/api/job-applications', { method: 'POST', body: JSON.stringify(data) }),
  updateStatus: (id: string, status: string) => 
    apiCall(`/api/job-applications/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
  delete: (id: string) => apiCall(`/api/job-applications/${id}`, { method: 'DELETE' }),
};

// Helper functions for easier access
export const getJobs = async () => {
  const response = await jobsAPI.getAll();
  return response.jobs || [];
};

export const submitJobApplication = async (data: any) => {
  return await jobApplicationsAPI.submit(data);
};
