import { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { api } from '../../services/api';
import { Service } from '../../types';
import { Plus, Edit, Trash2 } from 'lucide-react';
import FormInput from '../../components/FormInput';
import FileUpload from '../../components/FileUpload';
import Alert from '../../components/Alert';

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '',
    features: '',
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await api.services.getAll();
      setServices(data);
    } catch (error) {
      console.error('Failed to fetch services:', error);
      setAlert({ type: 'error', message: 'Failed to load services' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service: Service) => {
    setEditingId(service.id);
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon,
      features: Array.isArray(service.features) ? service.features.join('\n') : '',
    });
    setIsCreating(false);
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setFormData({ title: '', description: '', icon: '', features: '' });
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsCreating(false);
    setFormData({ title: '', description: '', icon: '', features: '' });
  };

  const handleSave = async () => {
    try {
      const serviceData = {
        title: formData.title,
        description: formData.description,
        icon: formData.icon,
        features: formData.features.split('\n').filter(f => f.trim()),
      };

      if (isCreating) {
        await api.services.create(serviceData);
        setAlert({ type: 'success', message: 'Service created successfully' });
      } else if (editingId) {
        await api.services.update(editingId, serviceData);
        setAlert({ type: 'success', message: 'Service updated successfully' });
      }

      await fetchServices();
      handleCancel();
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to save service' });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      await api.services.delete(id);
      setAlert({ type: 'success', message: 'Service deleted successfully' });
      await fetchServices();
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to delete service' });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8 pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Services</h1>
            <p className="text-slate-500 mt-1 font-medium italic">Define and showcase your core expertise</p>
          </div>
          {!isCreating && !editingId && (
            <button
              onClick={handleCreate}
              className="group relative flex items-center space-x-2 px-6 py-3 bg-slate-900 text-white rounded-2xl hover:bg-blue-600 transition-all duration-300 shadow-lg shadow-slate-900/20 active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Plus className="w-5 h-5 relative z-10" />
              <span className="relative z-10 font-bold tracking-wide uppercase text-xs">Register New Service</span>
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
          <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-2xl shadow-slate-200/50 p-8 border border-white max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8">
              <div className="w-32 h-32 bg-blue-100/50 rounded-full blur-3xl -mr-16 -mt-16" />
            </div>

            <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center relative z-10">
              <div className="w-2 h-8 bg-blue-600 rounded-full mr-4" />
              {isCreating ? 'Launch New Service' : 'Refine Service Details'}
            </h2>

            <div className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <FormInput
                    label="Service Title"
                    name="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                  <FormInput
                    label="Service Description"
                    name="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    type="textarea"
                    rows={4}
                  />
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-slate-700 uppercase tracking-widest ml-1">Symbolic Identity</label>
                    <FileUpload
                      label="Upload Service Icon"
                      onUploadSuccess={(_fileUrl, filePath) => {
                        setFormData(prev => ({ ...prev, icon: filePath }));
                        setAlert({ type: 'success', message: 'Identity asset updated!' });
                      }}
                      onUploadError={(error) => {
                        setAlert({ type: 'error', message: `Asset failed: ${error}` });
                      }}
                      folder="services/icons"
                      maxSize={2}
                    />

                    {formData.icon && (
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center space-x-4 shadow-inner">
                        <div className="p-3 bg-white rounded-xl shadow-sm">
                          <img src={formData.icon.startsWith('http') ? formData.icon : `${import.meta.env.VITE_API_BASE_URL?.replace('/api', '')}/${formData.icon}`} alt="Icon Preview" className="w-12 h-12 object-contain" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Asset Reference</p>
                          <p className="text-xs text-slate-600 truncate font-mono">{formData.icon}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <FormInput
                label="Core Features (One point per line)"
                name="features"
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                required
                type="textarea"
                rows={5}
                placeholder="e.g.,\n24/7 Support\nCloud Integration\nAdvanced Analytics"
              />

              <div className="flex items-center space-x-4 pt-6 border-t border-slate-100">
                <button
                  onClick={handleSave}
                  className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-black uppercase text-xs tracking-[0.15em] hover:shadow-xl hover:shadow-blue-500/20 transition-all active:scale-[0.98]"
                >
                  {isCreating ? 'Deploy Service' : 'Preserve Changes'}
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
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Fetching expertise...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.isArray(services) && services.map((service) => (
              <div key={service.id} className="group bg-white rounded-[2rem] shadow-lg shadow-slate-200/50 p-8 border border-slate-100 hover:shadow-2xl hover:shadow-blue-200/40 transition-all duration-500 hover:-translate-y-2 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <div className="w-24 h-24 bg-blue-600 rounded-full -mr-12 -mt-12" />
                </div>

                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center shadow-inner border border-slate-100 group-hover:scale-110 transition-transform duration-500">
                    <img src={service.icon} alt={service.title} className="w-10 h-10 object-contain" />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(service)}
                      className="p-2.5 bg-slate-50 text-slate-400 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all duration-300"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="p-2.5 bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 relative z-10">
                  <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight group-hover:text-blue-600 transition-colors">{service.title}</h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed line-clamp-3 mb-6">{service.description}</p>

                  <div className="space-y-3">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Capabilities</p>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(service.features) && service.features.slice(0, 3).map((feature, index) => (
                        <span key={index} className="px-3 py-1 bg-slate-50 text-slate-600 text-[10px] font-bold rounded-full border border-slate-100">
                          {feature}
                        </span>
                      ))}
                      {Array.isArray(service.features) && service.features.length > 3 && (
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded-full border border-blue-100">
                          +{service.features.length - 3} More
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between relative z-10">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active</span>
                  </div>
                  <button
                    onClick={() => handleEdit(service)}
                    className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
