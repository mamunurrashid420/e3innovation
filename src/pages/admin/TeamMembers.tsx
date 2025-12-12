import { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { api } from '../../services/api';
import { TeamMember } from '../../types';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
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
    email: '',
    linkedin: '',
    twitter: '',
    github: '',
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
      bio: member.bio,
      image: member.image,
      email: member.email,
      linkedin: member.linkedin || '',
      twitter: member.twitter || '',
      github: member.github || '',
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
      email: '',
      linkedin: '',
      twitter: '',
      github: '',
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsCreating(false);
    setFormData({
      name: '',
      role: '',
      bio: '',
      image: '',
      email: '',
      linkedin: '',
      twitter: '',
      github: '',
    });
  };

  const handleSave = async () => {
    try {
      const memberData = {
        name: formData.name,
        role: formData.role,
        bio: formData.bio,
        image: formData.image,
        email: formData.email,
        linkedin: formData.linkedin || undefined,
        twitter: formData.twitter || undefined,
        github: formData.github || undefined,
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
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Team Members</h1>
            <p className="text-slate-600 mt-2">Manage your team roster</p>
          </div>
          {!isCreating && !editingId && (
            <button
              onClick={handleCreate}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Member</span>
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
              {isCreating ? 'Add New Team Member' : 'Edit Team Member'}
            </h2>
            <div className="space-y-4">
              <FormInput
                label="Name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <FormInput
                label="Role"
                name="role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
                placeholder="e.g., CEO & Founder, Lead Developer"
              />
              <FormInput
                label="Bio"
                name="bio"
                type="textarea"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                required
                rows={3}
              />

              {/* File Upload Component */}
              <FileUpload
                label="Team Member Photo"
                onUploadSuccess={(fileUrl, filePath) => {
                  setFormData({ ...formData, image: filePath });
                  setAlert({ type: 'success', message: 'Photo uploaded successfully!' });
                }}
                onUploadError={(error) => {
                  setAlert({ type: 'error', message: `Upload failed: ${error}` });
                }}
                folder="team"
                maxSize={2}
              />

              {formData.image && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-700">
                    <strong>Image Path:</strong> {formData.image}
                  </p>
                </div>
              )}

              <FormInput
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <FormInput
                label="LinkedIn URL (optional)"
                name="linkedin"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                placeholder="https://linkedin.com/in/..."
              />
              <FormInput
                label="Twitter URL (optional)"
                name="twitter"
                value={formData.twitter}
                onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                placeholder="https://twitter.com/..."
              />
              <FormInput
                label="GitHub URL (optional)"
                name="github"
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                placeholder="https://github.com/..."
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
            <div className="text-slate-600">Loading team members...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {team.map((member) => (
              <div key={member.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                      <p className="text-blue-600 font-medium">{member.role}</p>
                      <p className="text-slate-600 text-sm mt-2">{member.bio}</p>
                      <p className="text-slate-500 text-sm mt-2">{member.email}</p>
                      {(member.linkedin || member.twitter || member.github) && (
                        <div className="flex space-x-3 mt-3 text-sm">
                          {member.linkedin && (
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              LinkedIn
                            </a>
                          )}
                          {member.twitter && (
                            <a
                              href={member.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              Twitter
                            </a>
                          )}
                          {member.github && (
                            <a
                              href={member.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              GitHub
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-slate-200">
                    <button
                      onClick={() => handleEdit(member)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
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
