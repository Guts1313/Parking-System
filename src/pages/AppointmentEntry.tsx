import {Component} from "react";
import AppointmentData from "../api/AppointmentData";

export default class AppointmentEntry extends Component<AppointmentData, AppointmentData> {

    constructor(props: AppointmentData) {
        super(props);
        this.state = {...props};
    }

    render() {
        return <div className="appointment_list_entry">
            {this.state.name}
        </div>;
    }
}