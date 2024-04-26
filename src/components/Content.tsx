import {useState} from 'react';
import { EntryModal } from './EntryModal';
import { Entry } from '../types/types';
import Api from "../api/Api.ts";

interface ContentProps {
  title: string;
}

const formatDate = (date: Date) => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = months[date.getMonth()];
  const day = date.getDate();
  return `${month}, ${day}`;
};

const pageSize = 10;
function loadEntries(page: number): Promise<Entry[]> {
  return Api.instance.getAppointments(page, pageSize).then(appointments=>{
    let entries: Entry[] = [];
    for (let appointment of appointments) {
      let time = new Date(appointment.datetime);
      entries.push({
        id: appointment.id,
        image: "/images/avatar.jpg",
        time: (time.getHours()+"").padStart(2,"0") + ":" + (time.getSeconds()+"").padStart(2, "0"),
        date: formatDate(time) + " " + time.getFullYear(),
        guestName: appointment.guest,
        guestEmail: appointment.guestEmail,
        employeeName: appointment.employee,
        employeeEmail: appointment.employeeEmail,
        carPlateNumber: appointment.carPlateNumber,
        description: appointment.description
      });
    }
    return entries;
  }, e=>Promise.reject(e));
}

export function Content(props: ContentProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loadedData, setLoadedData] = useState<boolean>(false);

  const openModal = (entry: Entry) => {
    setSelectedEntry(entry);
    setModalOpen(true);
  };
  if (!loadedData) {
    loadEntries(0).then(e=>{
      setLoadedData(true);
      setEntries(e);
    }, ()=>{console.log("Failed to request entries.")});
  }

  const handleSave = (entry: Entry) => {
    let promise: Promise<void>;
    if (selectedEntry) {
      promise = Api.instance.editAppointment({
        id: entry.id,
        guest: entry.guestName,
        guestEmail:  entry.guestEmail,
        carPlateNumber: entry.carPlateNumber,
        description: entry.description,
        employeeEmail: entry.employeeEmail,
        datetime: new Date(entry.date + " " + entry.time).toISOString(),
        employee: entry.employeeName
      }).then(()=>{
        loadEntries(0);
      });
      //const updatedEntries = entries.map(e => e === selectedEntry ? entry : e);
      //setEntries(updatedEntries);
    } else {
      //setEntries([...entries, entry]);
      // Entry was already added
      promise = Promise.resolve();
    }
    promise.then(()=>setModalOpen(false));
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
            <p>{formatDate(new Date())}</p>
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