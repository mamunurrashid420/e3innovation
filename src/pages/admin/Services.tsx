import { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { api } from '../../services/api';
import { Service } from '../../types';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import FormInput from '../../components/FormInput';
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
      features: service.features.join('\n'),
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
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Services</h1>
            <p className="text-slate-600 mt-2">Manage your service offerings</p>
          </div>
          {!isCreating && !editingId && (
            <button
              onClick={handleCreate}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Service</span>
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
              {isCreating ? 'Create New Service' : 'Edit Service'}
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
                label="Icon (Lucide icon name)"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                required
                placeholder="e.g., Code, Smartphone, Globe"
              />
              <FormInput
                label="Features (one per line)"
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                required
                textarea
                rows={5}
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
            <div className="text-slate-600">Loading services...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
                    <p className="text-slate-600 mt-2">{service.description}</p>
                    <div className="mt-4">
                      <p className="text-sm font-medium text-slate-700 mb-2">Features:</p>
                      <ul className="list-disc list-inside space-y-1">
                        {service.features.map((feature, index) => (
                          <li key={index} className="text-slate-600 text-sm">{feature}</li>
                        ))}
                      </ul>
                    </div>
                    <p className="text-sm text-slate-500 mt-4">Icon: {service.icon}</p>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(service)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
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
