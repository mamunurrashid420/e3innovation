import { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { api } from '../../services/api';
import { Project } from '../../types';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import FormInput from '../../components/FormInput';
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
    githubUrl: '',
    liveUrl: '',
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
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
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
      githubUrl: '',
      liveUrl: '',
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
      githubUrl: '',
      liveUrl: '',
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
        githubUrl: formData.githubUrl || undefined,
        liveUrl: formData.liveUrl || undefined,
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
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to save project' });
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
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Projects</h1>
            <p className="text-slate-600 mt-2">Manage your portfolio projects</p>
          </div>
          {!isCreating && !editingId && (
            <button
              onClick={handleCreate}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Project</span>
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
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              {isCreating ? 'Create New Project' : 'Edit Project'}
            </h2>
            <div className="space-y-4">
              <FormInput
                label="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <FormInput
                label="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                textarea
                rows={3}
              />
              <FormInput
                label="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                placeholder="e.g., Web Development, Mobile App, AI/ML"
              />
              <FormInput
                label="Image URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                required
                placeholder="https://images.unsplash.com/..."
              />
              <FormInput
                label="Technologies (comma-separated)"
                value={formData.technologies}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                required
                placeholder="React, Node.js, MongoDB"
              />
              <FormInput
                label="Features (one per line)"
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                required
                textarea
                rows={5}
              />
              <FormInput
                label="GitHub URL (optional)"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                placeholder="https://github.com/..."
              />
              <FormInput
                label="Live URL (optional)"
                value={formData.liveUrl}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                placeholder="https://..."
              />
              <div className="flex space-x-3">
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <Save className="w-5 h-5" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors flex items-center space-x-2"
                >
                  <X className="w-5 h-5" />
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="text-slate-600">Loading projects...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold text-slate-900">{project.title}</h3>
                          <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                            {project.category}
                          </span>
                        </div>
                        <p className="text-slate-600 mb-4">{project.description}</p>
                        <div className="mb-4">
                          <p className="text-sm font-medium text-slate-700 mb-2">Technologies:</p>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, index) => (
                              <span
                                key={index}
                                className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="mb-4">
                          <p className="text-sm font-medium text-slate-700 mb-2">Features:</p>
                          <ul className="list-disc list-inside space-y-1">
                            {project.features.slice(0, 3).map((feature, index) => (
                              <li key={index} className="text-slate-600 text-sm">{feature}</li>
                            ))}
                          </ul>
                        </div>
                        {(project.githubUrl || project.liveUrl) && (
                          <div className="flex space-x-3 text-sm">
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                GitHub
                              </a>
                            )}
                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                Live Demo
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => handleEdit(project)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
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
