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

export const supabaseApi = {
  // ============ SERVICES ============

  services: {
    getAll: async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        return (data || []).map(service => ({
          ...service,
          short_description: service.description,
        }));
      } catch (error) {
        console.error('Failed to fetch services:', error);
        return [];
      }
    },

    getBySlug: async (slug: string) => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();

        if (error) throw error;

        if (data) {
          return {
            ...data,
            short_description: data.description,
          };
        }
        return null;
      } catch (error) {
        console.error('Failed to fetch service:', error);
        return null;
      }
    },

    create: async (serviceData: any) => {
      try {
        const slug = serviceData.slug || slugify(serviceData.title);

        const { data, error } = await supabase
          .from('services')
          .insert([{ ...serviceData, slug }])
          .select()
          .single();

        if (error) throw error;
        return data;
      } catch (error) {
        console.error('Failed to create service:', error);
        throw error;
      }
    },

    update: async (id: number, serviceData: any) => {
      try {
        const { data, error } = await supabase
          .from('services')
          .update(serviceData)
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        return data;
      } catch (error) {
        console.error('Failed to update service:', error);
        throw error;
      }
    },

    delete: async (id: number) => {
      try {
        const { error } = await supabase
          .from('services')
          .delete()
          .eq('id', id);

        if (error) throw error;
        return { success: true };
      } catch (error) {
        console.error('Failed to delete service:', error);
        throw error;
      }
    },
  },

  // ============ PROJECTS ============

  projects: {
    getAll: async (params?: any) => {
      try {
        let query = supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (params?.per_page) {
          query = query.limit(params.per_page);
        }

        const { data, error } = await query;

        if (error) throw error;

        return (data || []).map(project => ({
          ...project,
          featured_image: project.image,
        }));
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        return [];
      }
    },

    getBySlug: async (slug: string) => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();

        if (error) throw error;

        if (data) {
          return {
            ...data,
            featured_image: data.image,
          };
        }
        return null;
      } catch (error) {
        console.error('Failed to fetch project:', error);
        return null;
      }
    },

    create: async (projectData: any) => {
      try {
        const slug = projectData.slug || slugify(projectData.title);

        const { data, error } = await supabase
          .from('projects')
          .insert([{ ...projectData, slug }])
          .select()
          .single();

        if (error) throw error;
        return data;
      } catch (error) {
        console.error('Failed to create project:', error);
        throw error;
      }
    },

    update: async (id: number, projectData: any) => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        return data;
      } catch (error) {
        console.error('Failed to update project:', error);
        throw error;
      }
    },

    delete: async (id: number) => {
      try {
        const { error } = await supabase
          .from('projects')
          .delete()
          .eq('id', id);

        if (error) throw error;
        return { success: true };
      } catch (error) {
        console.error('Failed to delete project:', error);
        throw error;
      }
    },
  },

  // ============ TEAM MEMBERS ============

  team: {
    getAll: async () => {
      try {
        const { data, error } = await supabase
          .from('team_members')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        return (data || []).map(member => ({
          ...member,
          designation: member.role,
          photo: member.image,
          social_links: {
            linkedin: member.linkedin || undefined,
            twitter: member.twitter || undefined,
            github: member.github || undefined,
          },
        }));
      } catch (error) {
        console.error('Failed to fetch team:', error);
        return [];
      }
    },

    getById: async (id: number) => {
      try {
        const { data, error } = await supabase
          .from('team_members')
          .select('*')
          .eq('id', id)
          .maybeSingle();

        if (error) throw error;

        if (data) {
          return {
            ...data,
            designation: data.role,
            photo: data.image,
            social_links: {
              linkedin: data.linkedin || undefined,
              twitter: data.twitter || undefined,
              github: data.github || undefined,
            },
          };
        }
        return null;
      } catch (error) {
        console.error('Failed to fetch team member:', error);
        return null;
      }
    },

    create: async (memberData: any) => {
      try {
        const { data, error } = await supabase
          .from('team_members')
          .insert([{
            name: memberData.name,
            role: memberData.role || memberData.designation,
            bio: memberData.bio,
            image: memberData.image || memberData.photo,
            email: memberData.email,
            linkedin: memberData.social_links?.linkedin || memberData.linkedin,
            twitter: memberData.social_links?.twitter || memberData.twitter,
            github: memberData.social_links?.github || memberData.github,
          }])
          .select()
          .single();

        if (error) throw error;
        return data;
      } catch (error) {
        console.error('Failed to create team member:', error);
        throw error;
      }
    },

    update: async (id: number, memberData: any) => {
      try {
        const updateData: any = {
          name: memberData.name,
          role: memberData.role || memberData.designation,
          bio: memberData.bio,
          image: memberData.image || memberData.photo,
          email: memberData.email,
        };

        if (memberData.social_links) {
          updateData.linkedin = memberData.social_links.linkedin;
          updateData.twitter = memberData.social_links.twitter;
          updateData.github = memberData.social_links.github;
        } else {
          updateData.linkedin = memberData.linkedin;
          updateData.twitter = memberData.twitter;
          updateData.github = memberData.github;
        }

        const { data, error } = await supabase
          .from('team_members')
          .update(updateData)
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        return data;
      } catch (error) {
        console.error('Failed to update team member:', error);
        throw error;
      }
    },

    delete: async (id: number) => {
      try {
        const { error } = await supabase
          .from('team_members')
          .delete()
          .eq('id', id);

        if (error) throw error;
        return { success: true };
      } catch (error) {
        console.error('Failed to delete team member:', error);
        throw error;
      }
    },
  },

  // ============ CONTACT MESSAGES ============

  contact: {
    submit: async (messageData: any) => {
      try {
        const { data, error } = await supabase
          .from('contact_messages')
          .insert([messageData])
          .select()
          .single();

        if (error) throw error;
        return data;
      } catch (error) {
        console.error('Failed to submit contact message:', error);
        throw error;
      }
    },

    getAll: async (params?: any) => {
      try {
        let query = supabase
          .from('contact_messages')
          .select('*')
          .order('created_at', { ascending: false });

        if (params?.page) {
          const page = parseInt(params.page);
          const perPage = params.per_page || 10;
          const from = (page - 1) * perPage;
          const to = from + perPage - 1;
          query = query.range(from, to);
        }

        const { data, error } = await query;

        if (error) throw error;
        return data || [];
      } catch (error) {
        console.error('Failed to fetch contacts:', error);
        return [];
      }
    },

    markAsRead: async (id: number) => {
      try {
        const { data, error } = await supabase
          .from('contact_messages')
          .update({ is_read: true })
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        return data;
      } catch (error) {
        console.error('Failed to mark contact as read:', error);
        throw error;
      }
    },

    delete: async (id: number) => {
      try {
        const { error } = await supabase
          .from('contact_messages')
          .delete()
          .eq('id', id);

        if (error) throw error;
        return { success: true };
      } catch (error) {
        console.error('Failed to delete contact message:', error);
        throw error;
      }
    },
  },

  // ============ SLIDERS ============

  sliders: {
    getAll: async () => {
      try {
        const { data, error } = await supabase
          .from('sliders')
          .select('*')
          .eq('is_active', true)
          .order('order_index', { ascending: true });

        if (error) throw error;
        return data || [];
      } catch (error) {
        console.error('Failed to fetch sliders:', error);
        return [];
      }
    },

    adminGetAll: async () => {
      try {
        const { data, error } = await supabase
          .from('sliders')
          .select('*')
          .order('order_index', { ascending: true });

        if (error) throw error;
        return data || [];
      } catch (error) {
        console.error('Failed to fetch admin sliders:', error);
        return [];
      }
    },

    create: async (sliderData: any) => {
      try {
        const { data, error } = await supabase
          .from('sliders')
          .insert([sliderData])
          .select()
          .single();

        if (error) throw error;
        return data;
      } catch (error) {
        console.error('Failed to create slider:', error);
        throw error;
      }
    },

    update: async (id: number, sliderData: any) => {
      try {
        const { data, error } = await supabase
          .from('sliders')
          .update(sliderData)
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        return data;
      } catch (error) {
        console.error('Failed to update slider:', error);
        throw error;
      }
    },

    delete: async (id: number) => {
      try {
        const { error } = await supabase
          .from('sliders')
          .delete()
          .eq('id', id);

        if (error) throw error;
        return { success: true };
      } catch (error) {
        console.error('Failed to delete slider:', error);
        throw error;
      }
    },

    toggleStatus: async (id: number) => {
      try {
        const { data: currentSlider, error: fetchError } = await supabase
          .from('sliders')
          .select('is_active')
          .eq('id', id)
          .single();

        if (fetchError) throw fetchError;

        const { data, error } = await supabase
          .from('sliders')
          .update({ is_active: !currentSlider.is_active })
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        return data;
      } catch (error) {
        console.error('Failed to toggle slider status:', error);
        throw error;
      }
    },

    reorder: async (orderData: Array<{ id: number; order: number }>) => {
      try {
        const updates = orderData.map(({ id, order }) =>
          supabase
            .from('sliders')
            .update({ order_index: order })
            .eq('id', id)
        );

        await Promise.all(updates);
        return { success: true };
      } catch (error) {
        console.error('Failed to reorder sliders:', error);
        throw error;
      }
    },
  },
};

export default supabaseApi;
