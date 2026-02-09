import { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { api } from '../../services/api';
import { Project } from '../../types';
import { Plus, Edit, Trash2 } from 'lucide-react';
import FormInput from '../../components/FormInput';
import FileUpload from '../../components/FileUpload';
import Alert from '../../components/Alert';

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    image: '',
    technologies: '',
    features: '',
    github_url: '',
    live_url: '',
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await api.projects.getAll();
      setProjects(data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      setAlert({ type: 'error', message: 'Failed to load projects' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      description: project.description,
      category: project.category,
      image: project.image,
      technologies: project.technologies.join(', '),
      features: project.features.join('\n'),
      github_url: project.github_url || '',
      live_url: project.live_url || '',
    });
    setIsCreating(false);
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      category: '',
      image: '',
      technologies: '',
      features: '',
      github_url: '',
      live_url: '',
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsCreating(false);
    setFormData({
      title: '',
      description: '',
      category: '',
      image: '',
      technologies: '',
      features: '',
      github_url: '',
      live_url: '',
    });
  };

  const handleSave = async () => {
    try {
      const projectData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        image: formData.image,
        technologies: formData.technologies.split(',').map(t => t.trim()).filter(t => t),
        features: formData.features.split('\n').filter(f => f.trim()),
        github_url: formData.github_url || undefined,
        live_url: formData.live_url || undefined,
      };

      if (isCreating) {
        await api.projects.create(projectData);
        setAlert({ type: 'success', message: 'Project created successfully' });
      } else if (editingId) {
        await api.projects.update(editingId, projectData);
        setAlert({ type: 'success', message: 'Project updated successfully' });
      }

      await fetchProjects();
      handleCancel();
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || error?.message || 'Failed to save project';
      setAlert({ type: 'error', message: errorMessage });
      console.error('Save error:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      await api.projects.delete(id);
      setAlert({ type: 'success', message: 'Project deleted successfully' });
      await fetchProjects();
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to delete project' });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8 pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Project Portfolio</h1>
            <p className="text-slate-500 mt-1 font-medium italic">Manage and showcase your engineering triumphs</p>
          </div>
          {!isCreating && !editingId && (
            <button
              onClick={handleCreate}
              className="group relative flex items-center space-x-2 px-6 py-3 bg-slate-900 text-white rounded-2xl hover:bg-blue-600 transition-all duration-300 shadow-lg shadow-slate-900/20 active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Plus className="w-5 h-5 relative z-10" />
              <span className="relative z-10 font-bold tracking-wide uppercase text-xs">Register New Project</span>
            </button>
          )}
        </div>

        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        {(isCreating || editingId) && (
          <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-2xl shadow-slate-200/50 p-8 border border-white max-w-5xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8">
              <div className="w-48 h-48 bg-blue-100/50 rounded-full blur-3xl -mr-24 -mt-24" />
            </div>

            <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center relative z-10">
              <div className="w-2 h-8 bg-blue-600 rounded-full mr-4" />
              {isCreating ? 'Launch Project Listing' : 'Refine Project Details'}
            </h2>

            <div className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <FormInput
                    label="Project Title"
                    name="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    placeholder="e.g., E3 Innovations Dashboard"
                  />
                  <FormInput
                    label="Deep Dive Description"
                    name="description"
                    type="textarea"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={4}
                    placeholder="Explain the 'why' and 'how' of this project..."
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormInput
                      label="Category"
                      name="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                      placeholder="e.g., Web App"
                    />
                    <FormInput
                      label="Tech Stack (Comma-sep)"
                      name="technologies"
                      value={formData.technologies}
                      onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                      required
                      placeholder="React, Tailwind, Node"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-slate-700 uppercase tracking-widest ml-1">Visual Showcase</label>
                    <FileUpload
                      label="Upload Hero Image"
                      onUploadSuccess={(_fileUrl, filePath) => {
                        setFormData(prev => ({ ...prev, image: filePath }));
                        setAlert({ type: 'success', message: 'Visual asset updated!' });
                      }}
                      onUploadError={(error) => {
                        setAlert({ type: 'error', message: `Asset failed: ${error}` });
                      }}
                      folder="projects"
                      maxSize={3}
                    />

                    {formData.image && (
                      <div className="mt-4 group relative overflow-hidden rounded-[1.5rem] border-2 border-slate-100 aspect-video shadow-inner">
                        <img
                          src={formData.image.startsWith('http') ? formData.image : `${import.meta.env.VITE_API_BASE_URL?.replace('/api', '')}/${formData.image}`}
                          alt="Project Preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="GitHub Repository (Optional)"
                  name="github_url"
                  value={formData.github_url}
                  onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                  placeholder="https://github.com/..."
                />
                <FormInput
                  label="Live Deployment (Optional)"
                  name="live_url"
                  value={formData.live_url}
                  onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <FormInput
                label="Key Features (One feature per line)"
                name="features"
                type="textarea"
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                required
                rows={5}
                placeholder="Real-time Analytics\nSecure Authentication\nResponsive Design"
              />

              <div className="flex items-center space-x-4 pt-6 border-t border-slate-100">
                <button
                  onClick={handleSave}
                  className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-black uppercase text-xs tracking-[0.15em] hover:shadow-xl hover:shadow-blue-500/20 transition-all active:scale-[0.98]"
                >
                  {isCreating ? 'Deploy Project' : 'Commit Changes'}
                </button>
                <button
                  onClick={handleCancel}
                  className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold uppercase text-xs tracking-[0.15em] hover:bg-slate-200 transition-all active:scale-[0.98]"
                >
                  Discard
                </button>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Exhuming portfolio data...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="group bg-white rounded-[2.5rem] shadow-lg shadow-slate-200/50 overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-blue-200/40 transition-all duration-500 hover:-translate-y-2">
                <div className="md:flex h-full">
                  <div className="md:w-2/5 relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-white/30">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="md:w-3/5 p-8 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1 pr-4">
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight group-hover:text-blue-600 transition-colors">{project.title}</h3>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(project)}
                          className="p-2.5 bg-slate-50 text-slate-400 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all duration-300"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="p-2.5 bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6 line-clamp-3 italic">"{project.description}"</p>

                    <div className="mb-6">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Technology Stack</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 4).map((tech, index) => (
                          <span
                            key={index}
                            className="text-[10px] font-bold bg-blue-50 text-blue-600 px-3 py-1 rounded-full border border-blue-100 shadow-sm"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="text-[10px] font-black text-slate-400 px-2 py-1">+{project.technologies.length - 4}</span>
                        )}
                      </div>
                    </div>

                    <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex space-x-4">
                        {project.github_url && (
                          <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                          </a>
                        )}
                        {project.live_url && (
                          <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 transition-colors font-black text-[10px] uppercase tracking-widest flex items-center">
                            Live Preview
                            <svg className="w-3 h-3 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                          </a>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Public Portfolio</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
