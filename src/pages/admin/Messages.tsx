import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Mail, Calendar, User } from 'lucide-react';

export default function AdminMessages() {
  const [messages] = useState<any[]>([]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Contact Messages</h1>
          <p className="text-slate-600 mt-2">View messages from your contact form</p>
        </div>

        {messages.length === 0 ? (
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
                      <p className="text-sm text-slate-600">{message.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-slate-500 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{new Date(message.createdAt).toLocaleDateString()}</span>
                  </div>
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
