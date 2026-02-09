import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { api } from '../../services/api';
import { Mail, Calendar, User, Phone } from 'lucide-react';

export default function AdminMessages() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const data = await api.contact.getAll();
      setMessages(data);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8 pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Communication Hub</h1>
            <p className="text-slate-500 mt-1 font-medium italic">Monitor and respond to global inquiries</p>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
            <Mail className="w-4 h-4" />
            <span className="text-xs font-black uppercase tracking-widest">{messages.length} Incoming</span>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Synchronizing inbox...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-slate-200/50 p-20 text-center border border-white max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner border border-slate-100">
              <Mail className="w-12 h-12 text-slate-300" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Silence is Golden</h3>
            <p className="text-slate-500 font-medium leading-relaxed">
              Your inbox is currently at peace. New inquiries from the digital void will materialize here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {messages.map((message) => (
              <div key={message.id} className="group bg-white rounded-[2rem] shadow-lg shadow-slate-200/50 p-8 border border-slate-100 hover:shadow-2xl hover:shadow-blue-200/40 transition-all duration-500 flex flex-col md:flex-row gap-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-100 group-hover:bg-blue-600 transition-colors" />

                <div className="md:w-1/4">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-slate-900/20 group-hover:scale-110 transition-transform duration-500">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-black text-slate-900 tracking-tight">{message.name}</h3>
                      <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Inquirer</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center text-slate-400 hover:text-slate-900 transition-colors">
                      <Mail className="w-3.5 h-3.5 mr-2" />
                      <span className="text-xs font-bold truncate">{message.email}</span>
                    </div>
                    <div className="flex items-center text-slate-400 hover:text-slate-900 transition-colors">
                      <Phone className="w-3.5 h-3.5 mr-2" />
                      <span className="text-xs font-bold">{message.phone}</span>
                    </div>
                    <div className="flex items-center text-slate-400 pt-4 border-t border-slate-50">
                      <Calendar className="w-3.5 h-3.5 mr-2" />
                      <span className="text-[10px] font-black uppercase tracking-widest">{new Date(message.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="mb-4">
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Objective</span>
                    <h4 className="text-lg font-black text-slate-900 tracking-tight mt-1">{message.subject}</h4>
                  </div>
                  <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-100 relative group-hover:bg-blue-50/30 transition-colors">
                    <svg className="absolute top-4 right-4 w-8 h-8 text-slate-200 opacity-20" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                    <p className="text-slate-600 text-sm font-medium leading-[1.8] relative z-10">{message.message}</p>
                  </div>

                  <div className="mt-6 flex items-center justify-end space-x-4">
                    <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-red-600 transition-colors">Archive</button>
                    <button className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-slate-900/10">Initial Response</button>
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
