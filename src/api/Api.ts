import Appointment from "./Appointment.ts";
import Employee from "./Employee.ts";

export default class Api {
    public static instance: Api;
    private readonly endpoint: string;
    private employees: Employee[];

    constructor(endpoint: string) {
        Api.instance = this;
        this.endpoint = endpoint;
        this.employees = [];
        this.getEmployees(0, 10000).then(emp=>{
            this.employees = emp;
        });
    }

    public getCachedEmployees(): Employee[] {
        return this.employees;
    }

    public getEmployees(page: number, pageSize: number): Promise<Employee[]> {
        return fetch(this.endpoint + "/api/employee/pages?" + new URLSearchParams({
            page: page+"",
            pageSize: pageSize+""
        })).then(r=>r.json() as Promise<{content: Employee[]}>)
            .then(e=>e.content);
    }

    public getAppointments(page: number, pageSize: number): Promise<Appointment[]> {
        return fetch(this.endpoint + "/api/appointments/pages?" + new URLSearchParams({
            page: page+"",
            pageSize: pageSize+""
        })).then(r=>r.json() as Promise<{content: Appointment[]}>)
            .then(r=>r.content);
    }

    public getAppointmentsByMonth(year: number, month: number): Promise<Appointment[]> {
        return fetch(this.endpoint + "/api/appointments/calendar_overview?" + new URLSearchParams({
            year: year+"",
            month: month+""
        })).then(r=>{
            if (r.status == 404) return Promise.resolve([]);
            else return r.json() as Promise<Appointment[]>;
        });
    }

    public getAppointment(id: number): Promise<Appointment|null> {
        return fetch(this.endpoint + "/api/appointments/" + id)
            .then(r=>{
                if (r.status == 404) return Promise.resolve(null);
                else return r.json() as Promise<Appointment>;
            });
    }

    /**
     * Creates an appointment with the specified data.
     * @param data the data to use
     * @return a Promise that will resolve with the appointment's ID
     */
    public createAppointment(data: Omit<Appointment,"id">): Promise<number> {
        return fetch(this.endpoint + "/api/appointments", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        }).then(r=> r.text())
          .then(str => parseInt(str));
    }

    public editAppointment(data: Appointment): Promise<string> {
        return fetch(this.endpoint + "/api/appointments/" + data.id, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        }).then(r=> r.text());
    }

    public deleteAppointment(id: number): Promise<boolean> {
        return fetch(this.endpoint + "/api/appointments/" + id, {
            method: "DELETE"
        }).then(r=>{
            if (r.status == 404) return Promise.resolve(false);
            else return r.text().then(_=>true);
        });
    }

    public search(query: string, page: number, pageSize: number): Promise<Appointment[]> {
        return fetch(this.endpoint + "/api/appointments/search?" + new URLSearchParams({
            searchString: query,
            page: page+"",
            pageSize: pageSize+""
        })).then(r=>r.json() as Promise<{content: Appointment[]}>)
            .then(r=>r.content);
    }
}