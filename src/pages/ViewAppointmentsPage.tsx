import React, {Component} from "react";
import PageProperties from "./PageProperties";
import AppointmentEntry from "./AppointmentEntry";
import AppointmentData from "../api/AppointmentData";
import "./ViewAppointmentsPage.css";

export default class ViewAppointmentsPage extends Component<PageProperties,ViewAppointmentsProperties> {
    constructor(props: PageProperties) {
        super(props);
        this.state = {
            visible: props.visible,
            appointments: []
        };
    }
    componentDidMount() {
        // Request list of appointments
        let appointments: AppointmentData[] = [
            {id: "app1", name: "Appointment"},
            {id: "app2", name: "Appointment 2"},
            {id: "app3", name: "Another One"},
            {id: "app4", name: "Testing"},
            {id: "app5", name: "Hello"},
            {id: "app6", name: "World"}
        ];
        this.setState({...this.state, appointments: appointments});
    }

    componentWillReceiveProps(nextProps: Readonly<PageProperties>, nextContext: any) {
        this.setState({...nextProps});
    }
    render() {
        let apps: React.JSX.Element[] = [];
        for (let appointment of this.state.appointments) {
            apps.push(<AppointmentEntry id={appointment.id} name={appointment.name} />);
        }
        return <div className={this.state.visible ? "" : "hidden"}>
            <div className="schedule_appointment_root">
                <h3>All Appointments</h3>
                {apps}
            </div>
        </div>;
    }
}
interface ViewAppointmentsProperties extends PageProperties {
    appointments: AppointmentData[]
}