import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useToast } from '../../contexts/ToastContext';

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-10 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            flex items-center justify-between p-4 rounded-lg shadow-lg max-w-sm
            ${toast.type === 'success' ? 'bg-text text-white' : ''}
            ${toast.type === 'error' ? 'bg-redText text-white' : ''}
            ${toast.type === 'info' ? 'bg-green-500 text-white' : ''}
            animate-slide-in-right
          `}
        >
          <div className="flex items-center space-x-2">
            {toast.type === 'success' && <FontAwesomeIcon icon="check-circle" />}
            {toast.type === 'error' && <FontAwesomeIcon icon="times-circle" />}
            {toast.type === 'info' && <FontAwesomeIcon icon="info-circle" />}
            <span className="font-medium">{toast.message}</span>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-4 text-white hover:text-gray-200 focus:outline-none"
          >
            <FontAwesomeIcon icon="times" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
