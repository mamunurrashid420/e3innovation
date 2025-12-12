import axios, { AxiosInstance, AxiosError } from 'axios';
import { cacheManager } from './cache';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// Create axios instance with timeout
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle responses
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

export const laravelApi = {
  // ============ PUBLIC ENDPOINTS ============

  settings: {
    getAll: async () => {
      try {
        const { data } = await apiClient.get('/public/settings');
        return data.data || data;
      } catch (error) {
        console.error('Failed to fetch settings:', error);
        throw error;
      }
    },
  },

  services: {
    getAll: async () => {
      try {
        const { data } = await apiClient.get('/public/services');
        return data.data || [];
      } catch (error) {
        console.error('Failed to fetch services:', error);
        throw error;
      }
    },

    getBySlug: async (slug: string) => {
      try {
        const { data } = await apiClient.get(`/public/services/${slug}`);
        return data.data || null;
      } catch (error) {
        console.error('Failed to fetch service:', error);
        throw error;
      }
    },

    // Admin endpoints
    create: async (serviceData: any) => {
      try {
        const { data } = await apiClient.post('/admin/services', serviceData);
        return data.data;
      } catch (error) {
        console.error('Failed to create service:', error);
        throw error;
      }
    },

    update: async (id: number, serviceData: any) => {
      try {
        const { data } = await apiClient.put(`/admin/services/${id}`, serviceData);
        return data.data;
      } catch (error) {
        console.error('Failed to update service:', error);
        throw error;
      }
    },

    delete: async (id: number) => {
      try {
        await apiClient.delete(`/admin/services/${id}`);
        return { success: true };
      } catch (error) {
        console.error('Failed to delete service:', error);
        throw error;
      }
    },

    adminGetAll: async () => {
      try {
        const { data } = await apiClient.get('/admin/services');
        return data.data || [];
      } catch (error) {
        console.error('Failed to fetch admin services:', error);
        throw error;
      }
    },
  },

  projects: {
    getAll: async (params?: any) => {
      try {
        const { data } = await apiClient.get('/public/projects', { params });
        return data.data || [];
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        throw error;
      }
    },

    getBySlug: async (slug: string) => {
      try {
        const { data } = await apiClient.get(`/public/projects/${slug}`);
        return data.data || null;
      } catch (error) {
        console.error('Failed to fetch project:', error);
        throw error;
      }
    },

    // Admin endpoints
    create: async (projectData: any) => {
      try {
        const { data } = await apiClient.post('/admin/projects', projectData);
        return data.data;
      } catch (error) {
        console.error('Failed to create project:', error);
        throw error;
      }
    },

    update: async (id: number, projectData: any) => {
      try {
        const { data } = await apiClient.put(`/admin/projects/${id}`, projectData);
        return data.data;
      } catch (error) {
        console.error('Failed to update project:', error);
        throw error;
      }
    },

    delete: async (id: number) => {
      try {
        await apiClient.delete(`/admin/projects/${id}`);
        return { success: true };
      } catch (error) {
        console.error('Failed to delete project:', error);
        throw error;
      }
    },

    adminGetAll: async () => {
      try {
        const { data } = await apiClient.get('/admin/projects');
        return data.data || [];
      } catch (error) {
        console.error('Failed to fetch admin projects:', error);
        throw error;
      }
    },
  },

  team: {
    getAll: async () => {
      try {
        const { data } = await apiClient.get('/public/team');
        return data.data || [];
      } catch (error) {
        console.error('Failed to fetch team:', error);
        throw error;
      }
    },

    // Admin endpoints
    create: async (memberData: any) => {
      try {
        const { data } = await apiClient.post('/admin/team', memberData);
        return data.data;
      } catch (error) {
        console.error('Failed to create team member:', error);
        throw error;
      }
    },

    update: async (id: number, memberData: any) => {
      try {
        const { data } = await apiClient.put(`/admin/team/${id}`, memberData);
        return data.data;
      } catch (error) {
        console.error('Failed to update team member:', error);
        throw error;
      }
    },

    delete: async (id: number) => {
      try {
        await apiClient.delete(`/admin/team/${id}`);
        return { success: true };
      } catch (error) {
        console.error('Failed to delete team member:', error);
        throw error;
      }
    },

    adminGetAll: async () => {
      try {
        const { data } = await apiClient.get('/admin/team');
        return data.data || [];
      } catch (error) {
        console.error('Failed to fetch admin team:', error);
        throw error;
      }
    },
  },

  contact: {
    submit: async (messageData: any) => {
      try {
        const { data } = await apiClient.post('/public/contact', messageData);
        return data.data;
      } catch (error) {
        console.error('Failed to submit contact message:', error);
        throw error;
      }
    },

    // Admin endpoints
    getAll: async (params?: any) => {
      try {
        const { data } = await apiClient.get('/admin/contacts', { params });
        return data.data || [];
      } catch (error) {
        console.error('Failed to fetch contacts:', error);
        throw error;
      }
    },

    markAsRead: async (id: number) => {
      try {
        const { data } = await apiClient.patch(`/admin/contacts/${id}/read`);
        return data.data;
      } catch (error) {
        console.error('Failed to mark contact as read:', error);
        throw error;
      }
    },
  },

  sliders: {
    getAll: async () => {
      try {
        const { data } = await apiClient.get('/public/sliders');
        return data.data || [];
      } catch (error) {
        console.error('Failed to fetch sliders:', error);
        throw error;
      }
    },

    getActive: async () => {
      try {
        const { data } = await apiClient.get('/public/sliders?active=true');
        return data.data || [];
      } catch (error) {
        console.error('Failed to fetch active sliders:', error);
        throw error;
      }
    },

    // Admin endpoints
    create: async (sliderData: any) => {
      try {
        const { data } = await apiClient.post('/admin/sliders', sliderData);
        return data.data;
      } catch (error) {
        console.error('Failed to create slider:', error);
        throw error;
      }
    },

    update: async (id: number, sliderData: any) => {
      try {
        const { data } = await apiClient.put(`/admin/sliders/${id}`, sliderData);
        return data.data;
      } catch (error) {
        console.error('Failed to update slider:', error);
        throw error;
      }
    },

    delete: async (id: number) => {
      try {
        await apiClient.delete(`/admin/sliders/${id}`);
        return { success: true };
      } catch (error) {
        console.error('Failed to delete slider:', error);
        throw error;
      }
    },

    adminGetAll: async () => {
      try {
        const { data } = await apiClient.get('/admin/sliders');
        return data.data || [];
      } catch (error) {
        console.error('Failed to fetch admin sliders:', error);
        throw error;
      }
    },
  },

  // ============ AUTHENTICATION ============

  auth: {
    login: async (email: string, password: string) => {
      try {
        const { data } = await apiClient.post('/auth/login', { email, password });
        if (data.data?.access_token) {
          localStorage.setItem('admin_token', data.data.access_token);
        }
        return data.data;
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },

    logout: async () => {
      try {
        await apiClient.post('/auth/logout');
        localStorage.removeItem('admin_token');
      } catch (error) {
        console.error('Logout failed:', error);
        localStorage.removeItem('admin_token');
      }
    },

    me: async () => {
      try {
        const { data } = await apiClient.get('/auth/me');
        return data.data;
      } catch (error) {
        console.error('Failed to fetch user:', error);
        throw error;
      }
    },
  },

  // ============ FILE UPLOAD ============

  upload: {
    file: async (file: File, folder?: string) => {
      try {
        const formData = new FormData();
        formData.append('file', file);
        if (folder) {
          formData.append('folder', folder);
        }

        const { data } = await apiClient.post('/admin/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return data.data;
      } catch (error) {
        console.error('File upload failed:', error);
        throw error;
      }
    },
  },
};

export default laravelApi;
