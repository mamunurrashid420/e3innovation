import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { api } from '../../services/api';
import FileUpload from '../../components/FileUpload';
import FormInput from '../../components/FormInput';
import Alert from '../../components/Alert';
import { Image, Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';

export default function AdminSliders() {
  const [sliders, setSliders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSlider, setEditingSlider] = useState<any>(null);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [formData, setFormData] = useState<any>({
    title: '',
    subtitle: '',
    image: '',
    imageFile: null,
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
      const data = await api.sliders.adminGetAll();
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

    // Validate image is selected for new slider
    if (!editingSlider && !formData.image) {
      setAlert({ type: 'error', message: 'Please upload an image for the slider.' });
      return;
    }

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
        imageFile: null,
        button_text: '',
        button_link: '',
        order_index: 0,
        is_active: true,
      });
      setEditingSlider(null);
      setShowForm(false);
      fetchSliders();
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || error?.message || 'Failed to save slider. Please try again.';
      setAlert({ type: 'error', message: errorMessage });
      console.error('Slider save error:', error);
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
      imageFile: null,
      button_text: '',
      button_link: '',
      order_index: 0,
      is_active: true,
    });
  };



  return (
    <AdminLayout>
      <div className="space-y-8 pb-12">
        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Manage Sliders</h1>
            <p className="text-slate-500 mt-1 font-medium italic">Curate your homepage story and visual identity</p>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="group relative flex items-center space-x-2 px-6 py-3 bg-slate-900 text-white rounded-2xl hover:bg-blue-600 transition-all duration-300 shadow-lg shadow-slate-900/20 active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Plus className="w-5 h-5 relative z-10" />
              <span className="relative z-10 font-bold tracking-wide uppercase text-xs">Add New Slider</span>
            </button>
          )}
        </div>

        {showForm && (
          <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-2xl shadow-slate-200/50 p-8 border border-white max-w-4xl mx-auto overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8">
              <div className="w-32 h-32 bg-blue-100/50 rounded-full blur-3xl -mr-16 -mt-16" />
            </div>

            <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center">
              <div className="w-2 h-8 bg-blue-600 rounded-full mr-4" />
              {editingSlider ? 'Refine Slider content' : 'Create New Experience'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <FormInput
                    label="Headline Title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Innovation at Scale"
                    required
                  />

                  <FormInput
                    label="Compelling Subtitle"
                    name="subtitle"
                    type="textarea"
                    value={formData.subtitle}
                    onChange={handleChange}
                    placeholder="Describe the value proposition..."
                    required
                    rows={4}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormInput
                      label="Button Label"
                      name="button_text"
                      type="text"
                      value={formData.button_text}
                      onChange={handleChange}
                      placeholder="Get Started"
                    />
                    <FormInput
                      label="Redirect URL"
                      name="button_link"
                      type="text"
                      value={formData.button_link}
                      onChange={handleChange}
                      placeholder="/contact"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">Visual Backdrop</label>
                    <FileUpload
                      label="Upload High-Res Media"
                      onUploadSuccess={(_fileUrl, filePath) => {
                        setFormData({ ...formData, image: filePath });
                        setAlert({ type: 'success', message: 'Visual asset updated!' });
                      }}
                      onUploadError={(error) => {
                        setAlert({ type: 'error', message: `Asset failed: ${error}` });
                      }}
                      folder="sliders"
                      maxSize={5}
                    />

                    {(formData.image || editingSlider) && (
                      <div className="mt-4 group relative overflow-hidden rounded-[1.5rem] border-2 border-slate-100 aspect-video shadow-inner">
                        <img
                          src={formData.image.startsWith('http') ? formData.image : `${import.meta.env.VITE_API_BASE_URL?.replace('/api', '')}/${formData.image}`}
                          alt="Backdrop Preview"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-4 left-4 text-white text-[10px] font-mono font-bold bg-black/40 backdrop-blur-md px-2 py-1 rounded">
                          PREVIEW MODE
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-slate-800 tracking-tight">Active Visibility</p>
                      <p className="text-xs text-slate-500 font-medium">Toggle display status</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.is_active}
                        onChange={handleCheckboxChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <FormInput
                    label="Sequence Index"
                    name="order_index"
                    type="number"
                    value={formData.order_index.toString()}
                    onChange={handleChange}
                    placeholder="0"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4 pt-4 border-t border-slate-100">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-black uppercase text-xs tracking-[0.15em] hover:shadow-xl hover:shadow-blue-500/20 transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  {loading ? 'Processing...' : editingSlider ? 'Update Experience' : 'Deploy Slider'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold uppercase text-xs tracking-[0.15em] hover:bg-slate-200 transition-all active:scale-[0.98]"
                >
                  Discard
                </button>
              </div>
            </form>
          </div>
        )}

        {loading && !showForm ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Synchronizing assets...</p>
          </div>
        ) : sliders.length === 0 && !showForm ? (
          <div className="bg-white rounded-[2.5rem] shadow-xl p-16 text-center border border-slate-100 max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <Image className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">The Stage is Empty</h3>
            <p className="text-slate-500 mb-10 font-medium leading-relaxed">
              Your homepage needs a compelling story. Start by adding your first high-impact slider experience.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center space-x-3 px-8 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase text-xs tracking-[0.15em] hover:shadow-2xl hover:shadow-blue-500/30 transition-all active:scale-95"
            >
              <Plus className="w-5 h-5" />
              <span>Create First Slider</span>
            </button>
          </div>
        ) : !showForm ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sliders.map((slider) => (
              <div key={slider.id} className="group bg-white rounded-[2rem] shadow-lg shadow-slate-200/50 overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-blue-200/40 transition-all duration-500 hover:-translate-y-2">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={slider.image}
                    alt={slider.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

                  <div className="absolute top-4 right-4">
                    {slider.is_active ? (
                      <span className="flex items-center px-3 py-1.5 bg-green-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-green-900/40">
                        <Eye className="w-3 h-3 mr-1.5" />
                        Live
                      </span>
                    ) : (
                      <span className="flex items-center px-3 py-1.5 bg-slate-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                        <EyeOff className="w-3 h-3 mr-1.5" />
                        Hidden
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex justify-between items-end">
                      <div className="max-w-[70%]">
                        <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-1 block">Slider #{slider.order_index}</span>
                        <h3 className="text-xl font-black text-white leading-tight tracking-tight line-clamp-2">{slider.title}</h3>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(slider)}
                          className="p-3 bg-white/10 backdrop-blur-md text-white rounded-xl hover:bg-white hover:text-slate-900 transition-all duration-300 group/btn active:scale-90"
                          title="Edit Experience"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(slider.id)}
                          className="p-3 bg-red-500/20 backdrop-blur-md text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300 group/btn active:scale-90"
                          title="Erase Memory"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-slate-600 text-sm font-medium leading-relaxed line-clamp-2 italic">
                    "{slider.subtitle}"
                  </p>
                  <div className="mt-6 flex items-center justify-between py-4 border-t border-slate-50">
                    <div className="flex space-x-4">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Button Text</span>
                        <span className="text-xs font-bold text-slate-800">{slider.button_text || 'None'}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Route</span>
                        <span className="text-xs font-bold text-slate-800">{slider.button_link || 'Internal'}</span>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center font-black text-slate-300 text-xs shadow-inner">
                      {slider.order_index}
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
