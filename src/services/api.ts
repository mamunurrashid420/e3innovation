import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export const homeApi = {
  getHomeData: () => api.get('/home'),
};

export const servicesApi = {
  getAll: () => api.get('/services'),
  getBySlug: (slug: string) => api.get(`/services/${slug}`),
};

export const projectsApi = {
  getAll: () => api.get('/projects'),
  getBySlug: (slug: string) => api.get(`/projects/${slug}`),
};

export const teamApi = {
  getAll: () => api.get('/team'),
};

export const contactApi = {
  submit: (data: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  }) => api.post('/contact', data),
};

export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
};

export const adminServicesApi = {
  getAll: () => api.get('/admin/services'),
  create: (data: FormData) => api.post('/admin/services', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getById: (id: number) => api.get(`/admin/services/${id}`),
  update: (id: number, data: FormData) => api.put(`/admin/services/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  delete: (id: number) => api.delete(`/admin/services/${id}`),
};

export const adminProjectsApi = {
  getAll: () => api.get('/admin/projects'),
  create: (data: FormData) => api.post('/admin/projects', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getById: (id: number) => api.get(`/admin/projects/${id}`),
  update: (id: number, data: FormData) => api.put(`/admin/projects/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  delete: (id: number) => api.delete(`/admin/projects/${id}`),
};

export const adminTeamApi = {
  getAll: () => api.get('/admin/team'),
  create: (data: FormData) => api.post('/admin/team', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getById: (id: number) => api.get(`/admin/team/${id}`),
  update: (id: number, data: FormData) => api.put(`/admin/team/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  delete: (id: number) => api.delete(`/admin/team/${id}`),
};

export const adminSettingsApi = {
  get: () => api.get('/admin/settings'),
  update: (data: FormData) => api.put('/admin/settings', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
};

export const adminContactsApi = {
  getAll: () => api.get('/admin/contacts'),
};

export default api;
