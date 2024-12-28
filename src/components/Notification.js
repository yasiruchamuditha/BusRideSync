//src/components/Notification.js
import React from 'react';

const Notification = ({ message, type, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className={`p-4 rounded-md shadow-lg ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
        <div className="flex justify-between items-center">
          <span>{message}</span>
          <button onClick={onClose} className="ml-4">
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;