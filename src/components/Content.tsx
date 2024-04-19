import { useState } from 'react';
import { EntryModal } from './EntryModal';
import { Entry } from '../types/types';

interface ContentProps {
  title: string;
}

const formatDate = () => {
  const date = new Date();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = months[date.getMonth()];
  const day = date.getDate();
  return `${month}, ${day}`;
};

export function Content(props: ContentProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const [entries, setEntries] = useState<Entry[]>([
    {
      employeeName: 'Danila',
      employeeEmail: 'danila@example.com',
      image: '/images/2.jpg',
      date: 'Apr 20, 2024',
      time: '08:00',
      guestName: 'Angel',
      guestEmail: 'angel@example.com',
      carPlateNumber: 'XYZ123',
      description: 'Discussing project details.'
    },    
    {
      employeeName: 'Nazim',
      employeeEmail: 'nazim@example.com',
      image: '/images/3.jpg',
      date: 'Apr 21, 2024',
      time: '09:25',
      guestName: 'Claudiu',
      guestEmail: 'cbadea32@gmail.com',
      carPlateNumber: 'PH01KYS',
      description: 'Discuss plans with client.'
    },
    {
      employeeName: 'András',
      employeeEmail: 'andras@example.com',
      image: '/images/4.jpg',
      date: 'Apr 24, 2024',
      time: '12:25',
      guestName: 'Claudiu',
      guestEmail: 'cbadea32@gmail.com',
      carPlateNumber: 'PH01KYS',
      description: 'Dicuss project implementation.'
    },
    {
      employeeName: 'Angel',
      employeeEmail: 'angel@example.com',
      image: '/images/5.jpg',
      date: 'May 02, 2024',
      time: '16:00',
      guestName: 'Danila',
      guestEmail: 'danila@example.com',
      carPlateNumber: 'XYZ345',
      description: 'Furher discuss project implementation.'
    },
    {
      employeeName: 'Claudiu',
      employeeEmail: 'cbadea32@gmail.com',
      image: '/images/1.jpg',
      date: 'Somewhere in 2024',
      time: '00:00',
      guestName: 'KPN',
      guestEmail: 'KPN@fuckingbitches.com',
      carPlateNumber: 'MUIE123',
      description: 'Will I have fiber?'
    },
    {
      employeeName: 'KPN',
      employeeEmail: 'kpn@fuckingbitches.com',
      image: '/images/avatar.jpg',
      date: 'Somewhere in 2024',
      time: '00:00',
      guestName: 'Claudiu',
      guestEmail: 'cbadea32@gmail.com',
      carPlateNumber: 'PH01KYS',
      description: 'Nah gipsy get shit on.'
    },
  ]);

  const openModal = (entry: Entry) => {
    setSelectedEntry(entry);
    setModalOpen(true);
  };

  const handleSave = (entry: Entry) => {
    if (selectedEntry) {
      const updatedEntries = entries.map(e => e === selectedEntry ? entry : e);
      setEntries(updatedEntries);
    } else {
      setEntries([...entries, entry]);
    }
    setModalOpen(false);
  };

  const handleDelete = (entryToDelete: Entry) => {
    const filteredEntries = entries.filter(entry => entry !== entryToDelete);
    setEntries(filteredEntries);
  };


  return (
    <div className="flex flex-wrap">
      <div className="mt-8 w-full lg:mt-0 lg:pl-4">
        <div className="rounded-3xl bg-gray-800 px-6 pt-6">
          <div className="mb-8 flex items-center justify-between text-white">
            <p className="text-2xl font-bold">{props.title}</p>
            <p>{formatDate()}</p>
          </div>
          {entries.length > 0 ? (
          <div>
            {entries.map((entry, index) => (
              <div key={index} className="flex w-full border-t border-gray-700 p-4 hover:bg-gray-700 cursor-pointer" onClick={() => openModal(entry)}>
              <img
                src={entry.image}
                alt="profile image"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="w-full pl-4">
                <div className="flex w-full items-center justify-between">
                  <div className="font-medium text-white">{entry.employeeName}</div>
                  <div className="flex h-7 w-7 items-center justify-center">
                    <button onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(entry);
                    }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white hover:text-red-500"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </button>
                  </div>
                </div>
                <p className="my-2 text-sm text-gray-400">Meeting with {entry.guestName}.</p>
                <p className="my-2 text-sm text-gray-400">{entry.description}</p>
                <p className="text-right text-sm text-gray-400">
                  {entry.date.replace(/,\s+\d{4}/, '')}, {entry.time}
                </p>

              </div>
            </div>
            
            ))}
           </div>
          ) : (
            <div className="text-white text-center py-6">No appointments to display</div>
          )}
        </div>
      </div>
      <EntryModal isOpen={isModalOpen} entry={selectedEntry} onClose={() => setModalOpen(false)} onSave={handleSave} />
    </div>
  );
}