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
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Contact Messages</h1>
          <p className="text-slate-600 mt-2">View messages from your contact form</p>
        </div>

{loading ? (
          <div className="text-center py-12">
            <div className="text-slate-600">Loading messages...</div>
          </div>
        ) : messages.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Mail className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No messages yet</h3>
            <p className="text-slate-600">
              Messages submitted through your contact form will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{message.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-slate-600 mt-1">
                        <span>{message.email}</span>
                        <span className="flex items-center">
                          <Phone className="w-3 h-3 mr-1" />
                          {message.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center text-slate-500 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{new Date(message.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="mb-3">
                  <p className="text-sm font-medium text-slate-700">Subject:</p>
                  <p className="text-slate-900">{message.subject}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-slate-700">{message.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
