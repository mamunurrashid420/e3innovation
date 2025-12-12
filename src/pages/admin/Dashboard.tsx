import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { api } from '../../services/api';
import { Briefcase, FolderKanban, Users, MessageSquare, TrendingUp } from 'lucide-react';

interface Stats {
  services: number;
  projects: number;
  team: number;
  messages: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    services: 0,
    projects: 0,
    team: 0,
    messages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [services, projects, team] = await Promise.all([
          api.services.getAll(),
          api.projects.getAll(),
          api.team.getAll(),
        ]);

        setStats({
          services: services.length,
          projects: projects.length,
          team: team.length,
          messages: 0,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Services',
      value: stats.services,
      icon: Briefcase,
      color: 'bg-blue-500',
      link: '/admin/services',
    },
    {
      title: 'Projects',
      value: stats.projects,
      icon: FolderKanban,
      color: 'bg-green-500',
      link: '/admin/projects',
    },
    {
      title: 'Team Members',
      value: stats.team,
      icon: Users,
      color: 'bg-orange-500',
      link: '/admin/team',
    },
    {
      title: 'Messages',
      value: stats.messages,
      icon: MessageSquare,
      color: 'bg-red-500',
      link: '/admin/messages',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-2">Welcome back! Here's your overview</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-slate-600">Loading statistics...</div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statCards.map((card) => {
                const Icon = card.icon;
                return (
                  <Link
                    key={card.title}
                    to={card.link}
                    className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-600 text-sm font-medium">{card.title}</p>
                        <p className="text-3xl font-bold text-slate-900 mt-2">{card.value}</p>
                      </div>
                      <div className={`${card.color} p-3 rounded-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex items-center text-green-600 text-sm mt-4">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span>View all</span>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <Link
                    to="/admin/services"
                    className="block p-4 rounded-lg border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Briefcase className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-slate-900">Manage Services</span>
                    </div>
                  </Link>
                  <Link
                    to="/admin/projects"
                    className="block p-4 rounded-lg border-2 border-slate-200 hover:border-green-500 hover:bg-green-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <FolderKanban className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-slate-900">Manage Projects</span>
                    </div>
                  </Link>
                  <Link
                    to="/admin/team"
                    className="block p-4 rounded-lg border-2 border-slate-200 hover:border-orange-500 hover:bg-orange-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-orange-600" />
                      <span className="font-medium text-slate-900">Manage Team</span>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">System Info</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-slate-200">
                    <span className="text-slate-600">Total Content Items</span>
                    <span className="font-bold text-slate-900">
                      {stats.services + stats.projects + stats.team}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-200">
                    <span className="text-slate-600">Active Services</span>
                    <span className="font-bold text-slate-900">{stats.services}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-slate-600">Team Size</span>
                    <span className="font-bold text-slate-900">{stats.team}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
