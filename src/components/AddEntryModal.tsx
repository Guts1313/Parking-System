import React, { useState } from 'react';
import { Entry } from '../types/types';
import { XIcon, PlusIcon } from '@heroicons/react/outline';
import EmployeePicker from "./EmployeePicker.tsx";
import Api from "../api/Api.ts";

export const AddEntryModal: React.FC<{ isOpen: boolean, onClose: () => void, onSave: (entry: Entry) => void }> = ({ isOpen, onClose, onSave }) => {
  const [newEntry, setNewEntry] = useState<Entry>({
    employeeName: '',
    employeeEmail: '',
    employeeId: -1,
    image: '/images/avatar.jpg',
    date: '',
    time: '',
    guestName: '',
    guestEmail: '',
    carPlateNumber: '',
    description: '',
    id: -1
  });

  const handleChange = (field: keyof Entry, value: string) => {
    setNewEntry({ ...newEntry, [field]: value });
  };

  const handleSave = () => {
    onSave(newEntry);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  const filter = (key: keyof Entry) => {
    return key !== "id" && key !== "image" && key !== "employeeEmail" && key !== "employeeId";
  }
  const employees = Api.instance.getCachedEmployees();
  const getEditingType = <T extends keyof Entry, >(key: T) => {
    // Hide these
    if (key === "id" || key === "image") return undefined;
    if (key === "employeeId" || key === "employeeEmail") return undefined;
    if (key === "employeeName") {
      return <div key={key} className="col-span-2">
        <label className="block text-sm font-medium mb-1">
          Employee
        </label>
        <EmployeePicker employees={employees} multiple={false} selected={newEntry.employeeId == -1 ? [] : [employees.find(e=>e.id == newEntry.employeeId)!]} onUpdate={(selected)=>{
          const e = selected[0];
          setNewEntry({...newEntry, employeeId: e.id, employeeName: e.name, employeeEmail: e.email});
        }}/>
      </div>;
    }
    return <div key={key} className="col-span-1">
      <label className="block text-sm font-medium mb-1">
        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:
      </label>
      <input
          type={key === 'date' ? 'date' : 'text'}
          className="form-input mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
          value={newEntry[key as keyof Entry]}
          onChange={(e) => handleChange(key as keyof Entry, e.target.value)}
          placeholder={`Enter ${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}`}
      />
    </div>
  };

  return (
      <div className="fixed inset-0 z-50 bg-gray-700 bg-opacity-50 flex justify-center items-center" onClick={onClose}>
        <div className="fixed z-60 bg-gray-800 rounded-lg shadow-xl w-1/3 mx-4 animate-scaleUp overflow-hidden"
             onClick={(e) => e.stopPropagation()}>
          {/* modal header */}
          <div className="flex justify-between items-center bg-gray-900 p-4">
            <h2 className="text-xl font-bold text-white">Create Appointment</h2>
            <button onClick={onClose} className="hover:text-gray-300">
              <XIcon className="h-6 w-6 text-white"/>
            </button>
          </div>

          {/* modal content: form fields */}
          <div className="p-6 text-white grid grid-cols-1 md:grid-cols-2 gap-4">
          {(Object.keys(newEntry) as (keyof Entry)[])
              .filter(key=>filter(key))
              .map(key => {
                return getEditingType(key);
              })}
        </div>

        {/* modal footer */}
        <div className="flex justify-end items-center p-4 bg-gray-900">
          <button onClick={handleSave} className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out">
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Appointment
          </button>
        </div>
      </div>
    </div>
  );
};
