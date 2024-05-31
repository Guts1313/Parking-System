import {useState} from 'react';
import {EntryModal} from './EntryModal';
import {Entry} from '../types/types';
import Api from "../api/Api.ts";
import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/outline";
import Employee from '../api/Employee.ts';
import EmployeePicker from "./EmployeePicker.tsx";
import {Timetable} from "./Timetable.tsx";

interface ContentProps {
  title: string;
}

const formatDate = (date: Date) => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  return `${year} ${month}`;
};

function loadEntries(year: number, month: number): Promise<Entry[]> {
  return Api.instance.getAppointmentsByMonth(year, month).then(appointments=>{
    const entries: Entry[] = [];
    for (const appointment of appointments) {
      const time = new Date(appointment.datetime+"Z");
      entries.push({
        id: appointment.id,
        image: "/images/avatar.jpg",
        time: (time.getHours()+"").padStart(2,"0") + ":" + (time.getMinutes()+"").padStart(2, "0"),
        date: time.getFullYear() + " " + (time.getMonth()+1) + " " + time.getDate(),
        guestName: appointment.guest,
        guestEmail: appointment.guestEmail,
        employeeId: appointment.employeeId,
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
  // this is abuse
  (window as any)["refresh"] = ()=>showEntries();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedEntry, _] = useState<Entry | null>(null);
  const [loadedData, setLoadedData] = useState<boolean>(false);
  const [showingDay, setShowingDay] = useState<Date | undefined>(undefined);
  const [currentData, setCurrentData] = useState<{date: Date, entries: Entry[]}>({date: new Date(), entries: []});
  const [pickedEmployees, setPickedEmployees] = useState<Employee[]>([]);

  const pickedEmployeeIds = pickedEmployees.map(e=>e.id);
  const filtered = currentData.entries.filter(e=>pickedEmployeeIds.indexOf(e.employeeId) > -1);

  const targetMonth = new Date(currentData.date.getFullYear(), currentData.date.getMonth(), 1);
  const dateLocale = Intl?.DateTimeFormat()?.resolvedOptions()?.locale ?? navigator.language;
  const locale = new Intl.Locale(dateLocale);
  const firstDayLocale = (locale as any)["weekInfo"] ? ((locale as any)["weekInfo"] as any)["firstDay"] as number : 1;
  const firstDayMonth = targetMonth.getDay();

  const nextMonth = new Date(targetMonth.getFullYear(), targetMonth.getMonth() + 1, 1);
  nextMonth.setDate(nextMonth.getDate() - 1);
  const dayCount = nextMonth.getDate();

  function showEntries(date?: Date) {
    const actual = date ?? targetMonth;
    return loadEntries(actual.getFullYear(), actual.getMonth() + 1).then(e => setCurrentData({date: actual, entries: e}));
  }

  if (!loadedData) {
    loadEntries(targetMonth.getFullYear(), targetMonth.getMonth() + 1).then(e => {
      setLoadedData(true);
      setCurrentData({...currentData, entries: e});
    }, () => {
      console.log("Failed to request entries.")
    });
  }

  const handleSave = (entry: Entry) => {
    let promise: Promise<void>;
    if (selectedEntry) {
      promise = Api.instance.editAppointment({
        id: entry.id,
        guest: entry.guestName,
        guestEmail: entry.guestEmail,
        carPlateNumber: entry.carPlateNumber,
        description: entry.description,
        employeeEmail: entry.employeeEmail,
        datetime: new Date(entry.date + " " + entry.time).toISOString(),
        employee: entry.employeeName,
        employeeId: entry.employeeId
      }).then(() => {
        showEntries();
      });
      //const updatedEntries = entries.map(e => e === selectedEntry ? entry : e);
      //setEntries(updatedEntries);
    } else {
      //setEntries([...entries, entry]);
      // Entry was already added
      promise = Promise.resolve();
    }
    promise.then(() => setModalOpen(false));
  };

  const dayMapped: Entry[][] = [];
  for (let i = 0; i < dayCount; i++) {
    dayMapped[i] = [];
  }
  for (const entry of filtered) {
    const date = new Date(entry.date);
    const index = date.getDate() - 1;
    dayMapped[index].push(entry);
  }

  const offset = (7 - (firstDayMonth - firstDayLocale)) % 7;
  const dayNumbers: (number | undefined)[][] = [];
  for (let i = 0; i < 6; i++) {
    dayNumbers[i] = [undefined, undefined, undefined, undefined, undefined, undefined, undefined];
  }
  for (let day = 1; day <= dayCount; day++) {
    const wCurrent = (firstDayMonth + day - 1) % 7;
    const rColumn = (7 + wCurrent - firstDayLocale) % 7;
    const rRow = Math.floor((7 + day - offset - 1) / 7);
    dayNumbers[rRow][rColumn] = day;
  }
  const weekDayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const mappedWeekDayNames = [];
  for (let i = 0; i < weekDayNames.length; i++) {
    mappedWeekDayNames[i] = weekDayNames[(firstDayLocale + i) % 7];
  }

  let root;
  if (showingDay) {
    console.log("Render list ", dayMapped[showingDay.getDate()-1]);
    /*
    root = <ContentList key={JSON.stringify(dayMapped)} refreshHandler={()=>showEntries()}
                        exitHandler={()=>setShowingDay(undefined)}
                        date={showingDay}
                        entries={dayMapped[showingDay.getDate()-1]}/>;
    */
    root = <Timetable
        key={JSON.stringify(dayMapped)}
        startDate={new Date(new Date(showingDay).setDate(showingDay.getDate()-1))}
        endDate={new Date(new Date(showingDay).setDate(showingDay.getDate()+1))}
        employees={pickedEmployees}
        entries={filtered}
        exitHandler={()=>setShowingDay(undefined)}
        refreshHandler={()=>showEntries()}
        navigationHandler={async (offset)=>{
          const copy = new Date(showingDay);
          const date = new Date(copy.setDate(copy.getDate() + offset));
          await showEntries(date);
          setShowingDay(date);
        }}/>
  } else {
    root = <div className="flex flex-wrap">
      <div className="mt-8 w-full lg:mt-0 lg:pl-4">
        <div className="rounded-3xl bg-gray-800 p-6">
          <div className="mb-8 flex flex-col text-white select-none">
            <p className="text-2xl font-bold">Selected Employees</p>
            <EmployeePicker key={"picker-" + JSON.stringify(Api.instance.getCachedEmployees())}
                selected={pickedEmployees}
                employees={Api.instance.getCachedEmployees()}
                multiple={true}
                onUpdate={(e)=>{
                  setPickedEmployees(e);
            }}/>
          </div>
          <div className="mb-8 flex items-center justify-between text-white">
            <p className="text-2xl font-bold">{props.title}</p>
            <div className="flex flex-row">
              <ArrowLeftIcon className="cursor-pointer h-5 w-5 mr-2" onClick={() => {
                const copy = new Date(targetMonth);
                showEntries(new Date(copy.setMonth(copy.getMonth() - 1)));
              }}/>
              <p style={{width: "200px"}} className="flex justify-center items-center">{formatDate(targetMonth)}</p>
              <ArrowRightIcon className="cursor-pointer h-5 w-5 mr-2" onClick={() => {
                const copy = new Date(targetMonth);
                showEntries(new Date(copy.setMonth(copy.getMonth() + 1)));
              }}/>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden flex h-full flex-col gap-1 bg-gray-600">
            <div className="flex grow flex-row gap-1" style={{height: 50}}>
              {mappedWeekDayNames.map(day => <div key={"dayheader-" + day}
                                                  className="flex grow basis-0 justify-center items-center bg-gray-700 text-white">
                {day}
              </div>)}
            </div>
            {dayNumbers.map((week, weekIndex) => <div key={"week-" + weekIndex + ""}
                                                      className="flex shrink-0 grow flex-row gap-1"
                                                      style={{height: 100}}>
              {week.map((day, dayIndex) => <div key={"day-" + weekIndex + "-" + dayIndex + "-outer"}
                                                className="relative flex shrink-0 grow basis-0 justify-center items-center bg-gray-800 text-white">
                <div className="absolute left-2 top-2 text-gray-500">
                  {day ? day + "" : ""}
                </div>
                {day !== undefined && dayMapped[day - 1].length > 0 ?
                    <div key={"day-" + weekIndex + "-" + dayIndex + "-inner"}
                         className="cursor-pointer flex justify-center items-center"
                         onClick={() => {
                           const newDate = new Date(targetMonth);
                           newDate.setDate(newDate.getDate() + day - 1);
                           setShowingDay(newDate);
                         }}>
                      {dayMapped[day - 1].length} appointment{dayMapped[day - 1].length != 1 ? "s" : ""}
                    </div> : ""}
              </div>)}
            </div>)}
          </div>
        </div>
      </div>
      <EntryModal isOpen={isModalOpen} entry={selectedEntry} onClose={() => setModalOpen(false)}
                  onSave={handleSave}/>
    </div>;
  }

  return (
      root
  );
}