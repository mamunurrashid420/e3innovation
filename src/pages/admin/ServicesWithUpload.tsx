import { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import FileUpload from '../../components/FileUpload';
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
    short_description: '',
    long_description: '',
    icon: '',
    image_path: '', // This will be set by file upload
    status: 'active' as 'active' | 'inactive',
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
      short_description: service.short_description,
      long_description: service.long_description,
      icon: service.icon,
      image_path: service.image || '',
      status: service.status as 'active' | 'inactive',
    });
    setIsCreating(false);
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setFormData({
      title: '',
      short_description: '',
      long_description: '',
      icon: '',
      image_path: '',
      status: 'active',
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsCreating(false);
    setFormData({
      title: '',
      short_description: '',
      long_description: '',
      icon: '',
      image_path: '',
      status: 'active',
    });
  };

  const handleUploadSuccess = (fileUrl: string, filePath: string) => {
    setFormData({ ...formData, image_path: filePath });
    setAlert({ type: 'success', message: 'Image uploaded successfully!' });
  };

  const handleUploadError = (error: string) => {
    setAlert({ type: 'error', message: `Upload failed: ${error}` });
  };

  const handleSave = async () => {
    if (!formData.title || !formData.short_description || !formData.long_description) {
      setAlert({ type: 'error', message: 'Please fill in all required fields' });
      return;
    }

    try {
      const serviceData = {
        title: formData.title,
        short_description: formData.short_description,
        long_description: formData.long_description,
        icon: formData.icon,
        image: formData.image_path, // Backend expects 'image' field
        status: formData.status,
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
                name="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />

              <FormInput
                label="Short Description"
                name="short_description"
                value={formData.short_description}
                onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                required
                type="textarea"
                rows={2}
              />

              <FormInput
                label="Long Description"
                name="long_description"
                value={formData.long_description}
                onChange={(e) => setFormData({ ...formData, long_description: e.target.value })}
                required
                type="textarea"
                rows={4}
              />

              <FormInput
                label="Icon (Font Awesome class or emoji)"
                name="icon"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="e.g., fas fa-code or 💻"
              />

              {/* File Upload Component */}
              <FileUpload
                label="Service Image"
                onUploadSuccess={handleUploadSuccess}
                onUploadError={handleUploadError}
                folder="services"
                maxSize={2}
              />

              {formData.image_path && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-700">
                    <strong>Image Path:</strong> {formData.image_path}
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

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
                    <p className="text-slate-600 mt-2">{service.short_description}</p>
                    <p className="text-slate-600 mt-2 text-sm">{service.long_description}</p>
                    {service.image && (
                      <div className="mt-4">
                        <img
                          src={`http://localhost:8000/storage/${service.image}`}
                          alt={service.title}
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                      </div>
                    )}
                    <p className="text-sm text-slate-500 mt-4">Icon: {service.icon}</p>
                    <p className="text-sm text-slate-500">Status: {service.status}</p>
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
