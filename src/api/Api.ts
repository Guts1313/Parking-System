import Appointment from "./Appointment.ts";

export default class Api {
    public static instance: Api;
    private readonly endpoint: string;

    constructor(endpoint: string) {
        Api.instance = this;
        this.endpoint = endpoint;
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
        })).then(r=>r.json() as Promise<Appointment[]>);
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

    public editAppointment(data: Appointment): Promise<void> {
        return fetch(this.endpoint + "/api/appointments/" + data.id, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        }).then(r=> r.text())
            .then(_=>{});
    }

    public deleteAppointment(id: number): Promise<boolean> {
        return fetch(this.endpoint + "/api/appointments/" + id, {
            method: "DELETE"
        }).then(r=>{
            if (r.status == 404) return Promise.resolve(false);
            else return r.json().then(_=>true);
        });
    }
}