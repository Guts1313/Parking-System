import React, { useState, useEffect } from 'react';
import { Entry, EntryModalProps } from '../types/types';
import { XIcon, PencilIcon, SaveIcon, ArrowLeftIcon } from '@heroicons/react/outline';

export const EntryModal: React.FC<EntryModalProps> = ({ isOpen, entry, onClose, onSave }) => {
  const [editedEntry, setEditedEntry] = useState<Entry | null>(entry);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setEditedEntry(entry);
    setIsEditing(false);
  }, [entry]);

  if (!isOpen || !entry) {
    return null;
  }

  const handleSave = () => {
    if (editedEntry) {
      onSave(editedEntry);
      setIsEditing(false);
      onClose();
    }
  };

  const handleChange = (field: keyof Entry, value: string) => {
    if (editedEntry) {
      setEditedEntry({ ...editedEntry, [field]: value });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedEntry(entry);
  };

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-gray-800 rounded-lg shadow-xl w-1/3 mx-4 animate-scaleUp overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* header */}
        <div className="flex justify-between items-center bg-gray-900 p-4">
          <h2 className="text-xl font-bold text-white">{isEditing ? 'Edit Appointment' : 'Appointment Details'}</h2>
          <button onClick={onClose} className="hover:text-gray-300">
            <XIcon className="h-6 w-6 text-white" />
          </button>
        </div>

        {/* content */}
        <div className="p-6 text-white grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(editedEntry ?? {}).map(([key, value]) => {
            if (key === 'image') return null; // skip the image field
            return isEditing ? (
              <div key={key} className="col-span-1">
                <label className="block text-sm font-medium mb-1">
                  {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:
                </label>
                <input
                  type="text"
                  className="form-input mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
                  value={value}
                  onChange={(e) => handleChange(key as keyof Entry, e.target.value)}
                />
              </div>
            ) : (
              <div key={key} className="col-span-1 py-1">
                <div className="block text-sm font-medium mb-1">
                  {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:
                </div>
                <div className="text-sm text-gray-400">{value}</div>
              </div>
            )
          })}
        </div>
        {/* footer */}
        <div className="flex justify-end items-center p-4 bg-gray-900">
          {isEditing ? (
            <>
              <button onClick={handleCancel} className="flex items-center mr-4 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out">
                <ArrowLeftIcon className="h-5 w-5 mr-2" />Back
              </button>
              <button onClick={handleSave} className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out">
                <SaveIcon className="h-5 w-5 mr-2" />Save Changes
              </button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)} className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out">
              <PencilIcon className="h-5 w-5 mr-2" />Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
