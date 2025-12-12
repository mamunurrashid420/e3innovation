import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
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

apiClient.interceptors.response.use(
  (response) => {
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      return { ...response, data: response.data.data };
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export const homeApi = {
  getSettings: () => apiClient.get('/public/settings'),
};

export const servicesApi = {
  getAll: () => apiClient.get('/public/services'),
  getBySlug: (slug: string) => apiClient.get(`/public/services/${slug}`),
};

export const projectsApi = {
  getAll: (params?: { category?: string; page?: number; per_page?: number }) =>
    apiClient.get('/public/projects', { params }),
  getBySlug: (slug: string) => apiClient.get(`/public/projects/${slug}`),
};

export const teamApi = {
  getAll: () => apiClient.get('/public/team'),
};

export const contactApi = {
  submit: (data: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  }) => apiClient.post('/public/contact', data),
};

export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    apiClient.post('/auth/login', credentials),
  logout: () => apiClient.post('/auth/logout'),
};

export const adminServicesApi = {
  getAll: () => apiClient.get('/admin/services'),
  create: (data: FormData) => apiClient.post('/admin/services', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getById: (id: number) => apiClient.get(`/admin/services/${id}`),
  update: (id: number, data: FormData) => apiClient.put(`/admin/services/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  delete: (id: number) => apiClient.delete(`/admin/services/${id}`),
};

export const adminProjectsApi = {
  getAll: () => apiClient.get('/admin/projects'),
  create: (data: FormData) => apiClient.post('/admin/projects', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getById: (id: number) => apiClient.get(`/admin/projects/${id}`),
  update: (id: number, data: FormData) => apiClient.put(`/admin/projects/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  delete: (id: number) => apiClient.delete(`/admin/projects/${id}`),
};

export const adminTeamApi = {
  getAll: () => apiClient.get('/admin/team'),
  create: (data: FormData) => apiClient.post('/admin/team', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getById: (id: number) => apiClient.get(`/admin/team/${id}`),
  update: (id: number, data: FormData) => apiClient.put(`/admin/team/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  delete: (id: number) => apiClient.delete(`/admin/team/${id}`),
};

export const adminSettingsApi = {
  get: () => apiClient.get('/admin/settings'),
  update: (data: FormData) => apiClient.put('/admin/settings', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
};

export const adminContactsApi = {
  getAll: (params?: { status?: string; page?: number }) =>
    apiClient.get('/admin/contacts', { params }),
  getById: (id: number) => apiClient.get(`/admin/contacts/${id}`),
  markAsRead: (id: number) => apiClient.patch(`/admin/contacts/${id}/read`),
};

export const uploadApi = {
  uploadFile: (file: File, folder?: string) => {
    const formData = new FormData();
    formData.append('file', file);
    if (folder) formData.append('folder', folder);
    return apiClient.post('/admin/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

export const api = {
  services: {
    getAll: async () => {
      const response = await servicesApi.getAll();
      return response.data;
    },
    getBySlug: async (slug: string) => {
      const response = await servicesApi.getBySlug(slug);
      return response.data;
    },
    create: async (data: any) => {
      const response = await adminServicesApi.create(data);
      return response.data;
    },
    update: async (id: number, data: any) => {
      const response = await adminServicesApi.update(id, data);
      return response.data;
    },
    delete: async (id: number) => {
      const response = await adminServicesApi.delete(id);
      return response.data;
    },
  },
  projects: {
    getAll: async (params?: any) => {
      const response = await projectsApi.getAll(params);
      return response.data;
    },
    getBySlug: async (slug: string) => {
      const response = await projectsApi.getBySlug(slug);
      return response.data;
    },
    create: async (data: any) => {
      const response = await adminProjectsApi.create(data);
      return response.data;
    },
    update: async (id: number, data: any) => {
      const response = await adminProjectsApi.update(id, data);
      return response.data;
    },
    delete: async (id: number) => {
      const response = await adminProjectsApi.delete(id);
      return response.data;
    },
  },
  team: {
    getAll: async () => {
      const response = await teamApi.getAll();
      return response.data;
    },
    create: async (data: any) => {
      const response = await adminTeamApi.create(data);
      return response.data;
    },
    update: async (id: number, data: any) => {
      const response = await adminTeamApi.update(id, data);
      return response.data;
    },
    delete: async (id: number) => {
      const response = await adminTeamApi.delete(id);
      return response.data;
    },
  },
};

export default apiClient;
