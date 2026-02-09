import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  LayoutDashboard,
  Briefcase,
  FolderKanban,
  Users,
  MessageSquare,
  Image,
  LogOut,
  Menu,
  X,
  Settings as SettingsIcon
} from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

const menuItems = [
  { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/admin/sliders', icon: Image, label: 'Sliders' },
  { path: '/admin/services', icon: Briefcase, label: 'Services' },
  { path: '/admin/projects', icon: FolderKanban, label: 'Projects' },
  { path: '/admin/team', icon: Users, label: 'Team' },
  { path: '/admin/messages', icon: MessageSquare, label: 'Messages' },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, user } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-3 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-all active:scale-95"
        >
          {sidebarOpen ? <X className="w-6 h-6 text-slate-600" /> : <Menu className="w-6 h-6 text-slate-600" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950 text-white w-72 transform transition-transform duration-500 ease-in-out z-40 shadow-2xl flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0`}
      >
        <div className="p-8 shrink-0">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">E3 Innovation</h1>
          </div>
          <p className="text-slate-400 text-xs font-medium uppercase tracking-wider ml-1">Admin Control Center</p>
        </div>

        <div className="px-6 mb-6 shrink-0">
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
            <p className="text-slate-400 text-xs mb-1">Signed in as</p>
            <p className="text-sm font-semibold truncate text-blue-400">{user?.email}</p>
          </div>
        </div>

        <nav className="px-4 space-y-1.5 flex-1 overflow-y-auto custom-scrollbar">
          <div className="px-4 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Navigation</div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${isActive
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-900/40 translate-x-1'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
              >
                <div className={`p-1.5 rounded-lg transition-colors ${isActive ? 'bg-white/20' : 'bg-slate-800 group-hover:bg-slate-700'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="font-medium text-sm">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto border-t border-white/5 bg-slate-950/20">
          <div className="px-4 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Management</div>
          <div className="space-y-1.5">
            <Link
              to="/admin/settings"
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${location.pathname === '/admin/settings'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-900/40 translate-x-1'
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
            >
              <div className={`p-1.5 rounded-lg transition-colors ${location.pathname === '/admin/settings' ? 'bg-white/20' : 'bg-slate-800 group-hover:bg-slate-700'}`}>
                <SettingsIcon className="w-4 h-4" />
              </div>
              <span className="font-medium text-sm">Settings</span>
              {location.pathname === '/admin/settings' && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              )}
            </Link>

            <button
              onClick={handleSignOut}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 group border border-transparent hover:border-red-500/20 active:scale-[0.98]"
            >
              <div className="p-1.5 rounded-lg bg-slate-800 group-hover:bg-red-500/20 transition-colors">
                <LogOut className="w-4 h-4" />
              </div>
              <span className="font-medium text-sm">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-72 min-h-screen flex flex-col pt-16 lg:pt-0">
        <header className="hidden lg:flex items-center justify-between px-8 h-20 bg-white/50 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30">
          <div>
            <h2 className="text-lg font-bold text-slate-800 capitalize">
              {location.pathname.split('/').pop()?.replace('-', ' ') || 'Dashboard'}
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex flex-col items-end mr-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Status</span>
              <span className="text-xs font-bold text-green-500 flex items-center capitalize">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse" />
                System Online
              </span>
            </div>
          </div>
        </header>
        <main className="p-8 flex-1">
          <div className="animate-fade-in max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-30 lg:hidden transition-all duration-500"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
