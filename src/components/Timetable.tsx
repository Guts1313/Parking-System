import {useState} from 'react';
import { EntryModal } from './EntryModal';
import { Entry } from '../types/types';
import Api from "../api/Api.ts";
import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/outline";
import Employee from "../api/Employee.ts";
import AppointmentEntry from "./AppointmentEntry.tsx";
import {colors} from "./EmployeePicker.tsx";

interface TimetableProps {
    startDate: Date,
    endDate: Date
    employees: Employee[],
    entries: Entry[],
    exitHandler: ()=>void,
    refreshHandler: ()=>void,
    navigationHandler: (offset: number)=>void
}

const formatDate = (date: Date) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();
    return `${year} ${month} ${day}`;
};

export function Timetable(props: TimetableProps) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
    const [entries, _] = useState<Entry[]>(props.entries);

    const openModal = (entry: Entry) => {
        setSelectedEntry(entry);
        setModalOpen(true);
    };

    const handleSave = (entry: Entry) => {
        let promise: Promise<void>;
        if (selectedEntry) {
            promise = Api.instance.editAppointment({
                id: entry.id,
                guest: entry.guestName,
                guestEmail:  entry.guestEmail,
                carPlateNumber: entry.carPlateNumber,
                description: entry.description,
                employeeId: entry.employeeId,
                employeeEmail: entry.employeeEmail,
                datetime: new Date(entry.date + " " + entry.time).toISOString(),
                employee: entry.employeeName
            }).then(()=>{
                props.refreshHandler();
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

    const dayCount = (props.endDate.valueOf() - props.startDate.valueOf())/(1000*60*60*24) + 1;

    const getDayIndex = (date: string) => {
        const value = new Date(date).valueOf();
        return (value-props.startDate.valueOf())/(1000*60*60*24);
    }
    const getMinutes = (time: string) => {
        const index = time.indexOf(":");
        const hour = parseInt(time.substring(0,index));
        const min = parseInt(time.substring(index+1));
        return hour * 60 + min;
    }

    /*
    // Reintroduce in modal
    const handleDelete = (entryToDelete: Entry) => {
        //const filteredEntries = entries.filter(entry => entry !== entryToDelete);
        //setEntries(filteredEntries);
        Api.instance.deleteAppointment(entryToDelete.id).then(()=>{
            props.refreshHandler();
        });
    };
    */

    const weekDayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const employeeIds = props.employees.map(e=>e.id);

    return (
        <div className="flex flex-wrap lg:pl-4 absolute top-0 left-0 right-0 bottom-0">
            <div className="mt-8 w-full lg:mt-0 lg:pl-4 flex">
                <div className="rounded-3xl bg-gray-800 px-6 pt-6 overflow-hidden relative grow flex flex-col">
                    <div className="mb-8 left-0 right-0 flex flex-col justify-center gap-2 text-white bg-gray-800 z-10">
                        <div className="flex flex-row justify-between">
                            <div className="flex flex-row">
                                <ArrowLeftIcon className="cursor-pointer h-9 w-9 mr-2" onClick={props.exitHandler}/>
                                <p className="text-2xl font-bold">Appointments
                                    between {formatDate(props.startDate)} and {formatDate(props.endDate)}</p>
                            </div>
                            <div className="flex flex-row">
                                <ArrowLeftIcon className="cursor-pointer h-5 w-5 mr-2" onClick={() => {
                                    props.navigationHandler(-1);
                                }}/>
                                <ArrowRightIcon className="cursor-pointer h-5 w-5 mr-2" onClick={() => {
                                    props.navigationHandler(1);
                                }}/>
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <div className="invisible">00:00</div>
                            <div className="flex flex-row grow">
                                {[..."0".repeat(dayCount)].map((_, i) => {
                                    const date = new Date(new Date(props.startDate).setDate(props.startDate.getDate() + i));
                                    return <div className="grow flex flex-col justify-center items-center">
                                        <div
                                            className="text-2xl flex flex-col justify-center items-center">{weekDayNames[date.getDay()]}</div>
                                            <div className="text-gray-400 flex flex-col justify-center items-center">{formatDate(date)}</div>
                                        </div>;
                                    }
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row bg-gray-800 overflow-auto">
                        <div className="block">
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map(h=>
                                <div style={{height: "100px"}} className="flex text-gray-100 justify-center items-center">{(h+"").padStart(2, "0")}:00</div>)}
                        </div>
                        <div style={{borderTop: "1px solid #ddd",borderBottom: "1px solid #888"}} className="block grow relative">
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map(h =>
                                (h % 2) == 0
                                    ? <div style={{
                                        height: "100px",
                                        borderTop: "1px solid #ddd",
                                        borderBottom: "1px solid #888"
                                    }}></div>
                                    : <div style={{
                                        height: "100px",
                                        borderTop: "1px solid #888",
                                        borderBottom: "1px solid #ddd"
                                    }}></div>
                            )}
                            {
                                [..."0".repeat(dayCount-1)].map((_,i)=>
                                    <div style={{
                                        position: "absolute",
                                        top: "0",
                                        bottom: "0",
                                        left: ((1+i)*100/dayCount) + "%",
                                        width: "1px",
                                        backgroundColor: "#ddd",
                                        zIndex: 1
                                    }}
                                    />
                                )
                            }
                            {entries.filter(e=>{
                                const current = new Date(e.date).valueOf();
                                return props.startDate.valueOf() <= current
                                    && current <= props.endDate.valueOf()
                            }).map((entry) => (

                                <div
                                    key={entry.id}
                                    style={{
                                        position: "absolute",
                                        left: (getDayIndex(entry.date)*100/dayCount) + "%",
                                        right: ((dayCount-0.99-getDayIndex(entry.date))*100/dayCount) + "%",
                                        top: (100 * getMinutes(entry.time) / (60)) + "px",
                                    }}>
                                    <AppointmentEntry
                                        mainText={entry.guestName}
                                        subtext={entry.description}
                                        highlightColor={colors[employeeIds.indexOf(entry.employeeId) % colors.length]}
                                        onclick={() => openModal(entry)}/>
                                </div>

                        ))}
                    </div>
                </div>
            </div>
        </div>
    <EntryModal isOpen={isModalOpen} entry={selectedEntry} onClose={() => setModalOpen(false)} onSave={handleSave}/>
</div>
)
    ;
}