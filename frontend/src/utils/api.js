import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Create axios instance
const api = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Public API calls
export const getCompanyInfo = () => api.get('/company');
export const getServices = () => api.get('/services');
export const getService = (id) => api.get(`/services/${id}`);
export const getProjects = () => api.get('/projects');
export const getProject = (id) => api.get(`/projects/${id}`);
export const submitContactForm = (data) => api.post('/contact', data);

// Admin API calls
export const adminLogin = (credentials) => api.post('/admin/login', credentials);
export const updateCompanyInfo = (data) => api.put('/admin/company', data);
export const createService = (data) => api.post('/admin/services', data);
export const updateService = (id, data) => api.put(`/admin/services/${id}`, data);
export const deleteService = (id) => api.delete(`/admin/services/${id}`);
export const createProject = (data) => api.post('/admin/projects', data);
export const updateProject = (id, data) => api.put(`/admin/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/admin/projects/${id}`);
export const getContactMessages = () => api.get('/admin/messages');
export const deleteContactMessage = (id) => api.delete(`/admin/messages/${id}`);

export default api;
