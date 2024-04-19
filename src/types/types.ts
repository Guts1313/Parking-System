export interface Entry {
    employeeName: string;
    image: string;
    time: string;
    date: string;
    employeeEmail: string;
    guestName: string;
    guestEmail: string;
    carPlateNumber: string;
    description: string;
  }
  
  export interface EntryModalProps {
    isOpen: boolean;
    entry: Entry | null;
    onClose: () => void;
    onSave: (entry: Entry) => void;
  }
  