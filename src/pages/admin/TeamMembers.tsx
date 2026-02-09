import { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { api } from '../../services/api';
import { TeamMember } from '../../types';
import { Facebook, Twitter, Linkedin, Plus, Edit, Trash2 } from 'lucide-react';
import FormInput from '../../components/FormInput';
import FileUpload from '../../components/FileUpload';
import Alert from '../../components/Alert';

export default function AdminTeamMembers() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    bio: '',
    image: '',
    facebook: '',
    linkedin: '',
    twitter: '',
    order_index: 0,
  });

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const data = await api.team.getAll();
      setTeam(data);
    } catch (error) {
      console.error('Failed to fetch team:', error);
      setAlert({ type: 'error', message: 'Failed to load team members' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditingId(member.id);
    setFormData({
      name: member.name,
      role: member.role,
      bio: member.bio || '',
      image: member.image || '',
      facebook: member.facebook || '',
      linkedin: member.linkedin || '',
      twitter: member.twitter || '',
      order_index: member.order_index || 0,
    });
    setIsCreating(false);
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setFormData({
      name: '',
      role: '',
      bio: '',
      image: '',
      facebook: '',
      linkedin: '',
      twitter: '',
      order_index: team.length + 1,
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsCreating(false);
  };

  const handleSave = async () => {
    try {
      const memberData = {
        ...formData,
        order_index: Number(formData.order_index),
      };

      if (isCreating) {
        await api.team.create(memberData);
        setAlert({ type: 'success', message: 'Team member added successfully' });
      } else if (editingId) {
        await api.team.update(editingId, memberData);
        setAlert({ type: 'success', message: 'Team member updated successfully' });
      }

      await fetchTeam();
      handleCancel();
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to save team member' });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to remove this team member?')) return;

    try {
      await api.team.delete(id);
      setAlert({ type: 'success', message: 'Team member removed successfully' });
      await fetchTeam();
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to remove team member' });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8 pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">The Team</h1>
            <p className="text-slate-500 mt-1 font-medium italic">Manage the brilliant minds driving innovation</p>
          </div>
          {!isCreating && !editingId && (
            <button
              onClick={handleCreate}
              className="group relative flex items-center space-x-2 px-6 py-3 bg-slate-900 text-white rounded-2xl hover:bg-blue-600 transition-all duration-300 shadow-lg shadow-slate-900/20 active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Plus className="w-5 h-5 relative z-10" />
              <span className="relative z-10 font-bold tracking-wide uppercase text-xs">Register Member</span>
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
              {isCreating ? 'Onboard New Member' : 'Refine Member Profile'}
            </h2>

            <div className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <FormInput
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                  <FormInput
                    label="Professional Role"
                    name="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    required
                    placeholder="e.g., Lead Systems Architect"
                  />
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-slate-700 uppercase tracking-widest ml-1">Avatar Identity</label>
                    <FileUpload
                      label="Upload Profile Portrait"
                      onUploadSuccess={(_fileUrl, filePath) => {
                        setFormData(prev => ({ ...prev, image: filePath }));
                        setAlert({ type: 'success', message: 'Visual identity updated!' });
                      }}
                      onUploadError={(error) => {
                        setAlert({ type: 'error', message: `Asset failed: ${error}` });
                      }}
                      folder="team"
                      maxSize={2}
                    />

                    {formData.image && (
                      <div className="mt-4 flex justify-center">
                        <div className="relative group">
                          <img
                            src={formData.image.startsWith('http') ? formData.image : `${import.meta.env.VITE_API_BASE_URL?.replace('/api', '')}/${formData.image}`}
                            alt="Avatar Preview"
                            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute inset-0 rounded-full bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormInput
                  label="Facebook (Optional)"
                  name="facebook"
                  value={formData.facebook}
                  onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                  placeholder="Profile URL"
                />
                <FormInput
                  label="LinkedIn (Optional)"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  placeholder="Profile URL"
                />
                <FormInput
                  label="Twitter (Optional)"
                  name="twitter"
                  value={formData.twitter}
                  onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                  placeholder="Profile URL"
                />
              </div>

              <FormInput
                label="Sequence Priority"
                name="order_index"
                type="number"
                value={formData.order_index.toString()}
                onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
                required
              />

              <div className="flex items-center space-x-4 pt-6 border-t border-slate-100">
                <button
                  onClick={handleSave}
                  className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-black uppercase text-xs tracking-[0.15em] hover:shadow-xl hover:shadow-blue-500/20 transition-all active:scale-[0.98]"
                >
                  {isCreating ? 'Finalize Onboarding' : 'Update Credentials'}
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
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Marshalling the team...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.id} className="group bg-white rounded-[2rem] shadow-lg shadow-slate-200/50 p-6 border border-slate-100 hover:shadow-2xl hover:shadow-blue-200/40 transition-all duration-500 hover:-translate-y-2 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-slate-50 to-blue-50/50 -z-0" />

                <div className="relative z-10 flex justify-center mb-6">
                  <div className="relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full" />
                  </div>
                </div>

                <div className="flex-1 text-center relative z-10">
                  <h3 className="text-lg font-black text-slate-900 mb-1 tracking-tight group-hover:text-blue-600 transition-colors">{member.name}</h3>
                  <p className="text-blue-600 text-[10px] font-black uppercase tracking-[0.15em] mb-4 p-1.5 bg-blue-50 rounded-lg inline-block mx-auto">{member.role}</p>

                  <div className="flex justify-center space-x-3 mt-2">
                    {member.facebook && (
                      <a href={member.facebook} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                        <Facebook className="w-4 h-4" />
                      </a>
                    )}
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {member.twitter && (
                      <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-50 rounded-lg transition-all">
                        <Twitter className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-50 flex items-center justify-center space-x-2 relative z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(member)}
                    className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                    title="Edit Profile"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-all"
                    title="Remove Member"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="absolute bottom-4 right-4 text-[10px] font-black text-slate-200">
                  #{member.order_index}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
