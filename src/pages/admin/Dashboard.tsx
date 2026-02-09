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
      gradient: 'from-blue-600 to-indigo-700',
      shadow: 'shadow-blue-200',
      link: '/admin/services',
    },
    {
      title: 'Projects',
      value: stats.projects,
      icon: FolderKanban,
      gradient: 'from-emerald-500 to-teal-600',
      shadow: 'shadow-emerald-200',
      link: '/admin/projects',
    },
    {
      title: 'Team Members',
      value: stats.team,
      icon: Users,
      gradient: 'from-orange-400 to-rose-500',
      shadow: 'shadow-orange-200',
      link: '/admin/team',
    },
    {
      title: 'Messages',
      value: stats.messages,
      icon: MessageSquare,
      gradient: 'from-purple-600 to-fuchsia-700',
      shadow: 'shadow-purple-200',
      link: '/admin/messages',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Admin Dashboard</h1>
            <p className="text-slate-500 mt-1">Manage and monitor your website's performance at a glance.</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100 flex items-center space-x-2 text-sm font-medium text-slate-600">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span>System Active</span>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-slate-500 mt-4 font-medium italic">Synchronizing dashboard data...</p>
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
                    className={`relative group overflow-hidden bg-gradient-to-br ${card.gradient} rounded-2xl p-6 shadow-lg ${card.shadow} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
                  >
                    {/* Decorative element */}
                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>

                    <div className="relative flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-white/80 text-sm font-semibold uppercase tracking-wider">{card.title}</p>
                        <p className="text-4xl font-bold text-white tabular-nums">{card.value}</p>
                      </div>
                      <div className="bg-white/20 p-3 rounded-xl backdrop-blur-md group-hover:rotate-6 transition-transform">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    <div className="relative mt-8 flex items-center justify-between text-white/90 text-sm">
                      <div className="flex items-center space-x-1.5 font-medium">
                        <TrendingUp className="w-4 h-4" />
                        <span>Live Preview</span>
                      </div>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity font-bold">Explore →</span>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className="px-6 py-5 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                    <h2 className="text-xl font-bold text-slate-800">Operational Hub</h2>
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase">Quick Actions</span>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Link
                        to="/admin/services"
                        className="flex flex-col items-center justify-center p-6 rounded-2xl bg-blue-50 border border-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white transition-all group"
                      >
                        <Briefcase className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
                        <span className="font-bold text-sm">Update Services</span>
                      </Link>
                      <Link
                        to="/admin/projects"
                        className="flex flex-col items-center justify-center p-6 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-all group"
                      >
                        <FolderKanban className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
                        <span className="font-bold text-sm">Project Gallery</span>
                      </Link>
                      <Link
                        to="/admin/team"
                        className="flex flex-col items-center justify-center p-6 rounded-2xl bg-orange-50 border border-orange-100 text-orange-700 hover:bg-orange-600 hover:text-white transition-all group"
                      >
                        <Users className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
                        <span className="font-bold text-sm">Team Roster</span>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-slate-800">Content Performance</h3>
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: 'Website SEO Score', value: 92, color: 'bg-green-500' },
                      { label: 'Mobile Optimization', value: 88, color: 'bg-blue-500' },
                      { label: 'Content Freshness', value: 75, color: 'bg-orange-500' }
                    ].map((item, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600 font-medium">{item.label}</span>
                          <span className="font-bold text-slate-800">{item.value}%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.value}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden h-fit">
                <div className="px-6 py-5 border-b border-slate-50 bg-slate-50/50">
                  <h2 className="text-xl font-bold text-slate-800">Ecosystem Vitality</h2>
                </div>
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <span className="text-slate-600 font-medium">Total Services</span>
                    </div>
                    <span className="font-bold text-slate-900 text-lg">{stats.services}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                        <FolderKanban className="w-5 h-5" />
                      </div>
                      <span className="text-slate-600 font-medium">Active Projects</span>
                    </div>
                    <span className="font-bold text-slate-900 text-lg">{stats.projects}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                        <Users className="w-5 h-5" />
                      </div>
                      <span className="text-slate-600 font-medium">Team Force</span>
                    </div>
                    <span className="font-bold text-slate-900 text-lg">{stats.team}</span>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100">
                    <div className="p-4 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl text-white">
                      <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-1">Architecture</p>
                      <p className="text-sm font-medium">E3 Innovation v2.0</p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-white/60">License: Premium</span>
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="w-6 h-6 rounded-full border-2 border-slate-800 bg-slate-700 flex items-center justify-center text-[8px] font-bold">DEV</div>
                          ))}
                        </div>
                      </div>
                    </div>
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
