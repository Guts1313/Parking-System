import {Component} from "react";
import PageProperties from "./PageProperties";
import "./ScheduleAppointmentPage.css";

export default class ScheduleAppointmentPage extends Component<PageProperties,PageProperties> {
    constructor(props: PageProperties) {
        super(props);
        this.state = {...props};
    }
    componentWillReceiveProps(nextProps: Readonly<PageProperties>, nextContext: any) {
        this.setState({...nextProps});
    }
    render() {
        return <div className={this.state.visible ? "" : "hidden"}>
            <div className="schedule_appointment_root">
                <h3>Schedule Appointment</h3>
                <input type="datetime-local" placeholder="Date"/>
                <input type="text" placeholder="Employee"/>
                <input type="email" placeholder="Employee Email"/>
                <input type="text" placeholder="Guest"/>
                <input type="email" placeholder="Guest Email"/>
                <input type="text" placeholder="Car Plate Number"/>
                <input type="text" placeholder="Description"/>
                <input type="submit" placeholder="Submit"/>
            </div>
        </div>;
    }
}