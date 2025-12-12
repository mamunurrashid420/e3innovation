import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { api } from '../../services/api';
import FormInput from '../../components/FormInput';
import Alert from '../../components/Alert';
import { Image, Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';

export default function AdminSliders() {
  const [sliders, setSliders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSlider, setEditingSlider] = useState<any>(null);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    image: '',
    button_text: '',
    button_link: '',
    order_index: 0,
    is_active: true,
  });

  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    try {
      const data = await api.sliders.getAll();
      setSliders(data || []);
    } catch (error) {
      console.error('Failed to fetch sliders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseInt(value) || 0 : value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      is_active: e.target.checked,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingSlider) {
        await api.sliders.update(editingSlider.id, formData);
        setAlert({ type: 'success', message: 'Slider updated successfully!' });
      } else {
        await api.sliders.create(formData);
        setAlert({ type: 'success', message: 'Slider created successfully!' });
      }

      setFormData({
        title: '',
        subtitle: '',
        image: '',
        button_text: '',
        button_link: '',
        order_index: 0,
        is_active: true,
      });
      setEditingSlider(null);
      setShowForm(false);
      fetchSliders();
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to save slider. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (slider: any) => {
    setEditingSlider(slider);
    setFormData({
      title: slider.title,
      subtitle: slider.subtitle,
      image: slider.image,
      button_text: slider.button_text || '',
      button_link: slider.button_link || '',
      order_index: slider.order_index || 0,
      is_active: slider.is_active,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this slider?')) return;

    try {
      await api.sliders.delete(id);
      setAlert({ type: 'success', message: 'Slider deleted successfully!' });
      fetchSliders();
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to delete slider. Please try again.' });
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingSlider(null);
    setFormData({
      title: '',
      subtitle: '',
      image: '',
      button_text: '',
      button_link: '',
      order_index: 0,
      is_active: true,
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Manage Sliders</h1>
            <p className="text-slate-600 mt-2">Create and manage homepage slider content</p>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Slider</span>
            </button>
          )}
        </div>

        {showForm && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              {editingSlider ? 'Edit Slider' : 'Add New Slider'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormInput
                label="Title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter slider title"
                required
              />

              <FormInput
                label="Subtitle"
                name="subtitle"
                type="textarea"
                value={formData.subtitle}
                onChange={handleChange}
                placeholder="Enter slider subtitle/description"
                required
                rows={3}
              />

              <FormInput
                label="Background Image URL"
                name="image"
                type="text"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://images.pexels.com/..."
                required
              />

              <FormInput
                label="Button Text (Optional)"
                name="button_text"
                type="text"
                value={formData.button_text}
                onChange={handleChange}
                placeholder="Get Started"
              />

              <FormInput
                label="Button Link (Optional)"
                name="button_link"
                type="text"
                value={formData.button_link}
                onChange={handleChange}
                placeholder="/contact"
              />

              <FormInput
                label="Display Order"
                name="order_index"
                type="number"
                value={formData.order_index.toString()}
                onChange={handleChange}
                placeholder="0"
                required
              />

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_active"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="is_active" className="text-sm font-medium text-slate-700">
                  Active (visible on website)
                </label>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Saving...' : editingSlider ? 'Update Slider' : 'Create Slider'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {loading && !showForm ? (
          <div className="text-center py-12">
            <div className="text-slate-600">Loading sliders...</div>
          </div>
        ) : sliders.length === 0 && !showForm ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Image className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No sliders yet</h3>
            <p className="text-slate-600 mb-6">
              Create your first slider to display on the homepage
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add First Slider</span>
            </button>
          </div>
        ) : !showForm ? (
          <div className="grid grid-cols-1 gap-6">
            {sliders.map((slider) => (
              <div key={slider.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <img
                      src={slider.image}
                      alt={slider.title}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{slider.title}</h3>
                        <p className="text-slate-600">{slider.subtitle}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {slider.is_active ? (
                          <span className="flex items-center text-green-600 text-sm">
                            <Eye className="w-4 h-4 mr-1" />
                            Active
                          </span>
                        ) : (
                          <span className="flex items-center text-slate-400 text-sm">
                            <EyeOff className="w-4 h-4 mr-1" />
                            Inactive
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="text-sm text-slate-500">Order: {slider.order_index}</span>
                      {slider.button_text && (
                        <span className="text-sm text-slate-500">Button: {slider.button_text}</span>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(slider)}
                        className="flex items-center space-x-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(slider.id)}
                        className="flex items-center space-x-1 px-3 py-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </AdminLayout>
  );
}
