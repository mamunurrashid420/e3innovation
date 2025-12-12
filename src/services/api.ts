import { supabase } from '../lib/supabase';

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

export const api = {
  services: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },

    getBySlug: async (slug: string) => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (error) throw error;
      return data;
    },

    create: async (serviceData: any) => {
      const slug = slugify(serviceData.title);
      const { data, error } = await supabase
        .from('services')
        .insert([{ ...serviceData, slug }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    update: async (id: number, serviceData: any) => {
      const slug = slugify(serviceData.title);
      const { data, error } = await supabase
        .from('services')
        .update({ ...serviceData, slug, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    delete: async (id: number) => {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { success: true };
    },
  },

  projects: {
    getAll: async (params?: any) => {
      let query = supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (params?.category) {
        query = query.eq('category', params.category);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data;
    },

    getBySlug: async (slug: string) => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (error) throw error;
      return data;
    },

    create: async (projectData: any) => {
      const slug = slugify(projectData.title);
      const { data, error } = await supabase
        .from('projects')
        .insert([{ ...projectData, slug }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    update: async (id: number, projectData: any) => {
      const slug = slugify(projectData.title);
      const { data, error } = await supabase
        .from('projects')
        .update({ ...projectData, slug, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    delete: async (id: number) => {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { success: true };
    },
  },

  team: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },

    create: async (memberData: any) => {
      const { data, error } = await supabase
        .from('team_members')
        .insert([memberData])
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    update: async (id: number, memberData: any) => {
      const { data, error } = await supabase
        .from('team_members')
        .update({ ...memberData, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    delete: async (id: number) => {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { success: true };
    },
  },

  contact: {
    submit: async (messageData: any) => {
      const { data, error } = await supabase
        .from('contact_messages')
        .insert([messageData])
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    getAll: async () => {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },

    markAsRead: async (id: number) => {
      const { data, error } = await supabase
        .from('contact_messages')
        .update({ is_read: true })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
  },

  sliders: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('sliders')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      return data;
    },

    getActive: async () => {
      const { data, error } = await supabase
        .from('sliders')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true });

      if (error) throw error;
      return data;
    },

    create: async (sliderData: any) => {
      const { data, error } = await supabase
        .from('sliders')
        .insert([sliderData])
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    update: async (id: number, sliderData: any) => {
      const { data, error } = await supabase
        .from('sliders')
        .update({ ...sliderData, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    delete: async (id: number) => {
      const { error } = await supabase
        .from('sliders')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { success: true };
    },
  },
};

export default supabase;
