import { CheckCircle, XCircle, X } from 'lucide-react';

interface AlertProps {
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
}

const Alert = ({ type, message, onClose }: AlertProps) => {
  return (
    <div
      className={`fixed top-20 right-4 z-50 max-w-md p-4 rounded-lg shadow-lg flex items-start space-x-3 ${
        type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
      }`}
    >
      {type === 'success' ? (
        <CheckCircle className="flex-shrink-0 text-green-600" size={24} />
      ) : (
        <XCircle className="flex-shrink-0 text-red-600" size={24} />
      )}
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className={`flex-shrink-0 ${
          type === 'success' ? 'text-green-600 hover:text-green-700' : 'text-red-600 hover:text-red-700'
        }`}
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default Alert;
