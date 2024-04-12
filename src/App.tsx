import React, {Component} from 'react';
import './App.css';
import './pages/Page.css';
import Sidebar from "./sidebar/Sidebar";
import TopBar from "./header/TopBar";
import LoginPage from "./pages/LoginPage";
import ScheduleAppointmentPage from "./pages/ScheduleAppointmentPage";
import ViewAppointmentsPage from "./pages/ViewAppointmentsPage";
import ViewCalendarPage from "./pages/ViewCalendarPage";

export default class App extends Component<AppProperties,AppProperties> {

    constructor(props: AppProperties) {
        super(props);
        this.state = {...props};
    }

    setSelectedPage = (page: PageId) => {
        console.log(this);
        this.setState({...this.state, selectedPage: page});
    }

    render() {
        console.log(this.state);
        return (
            <div id="app_root">
                <Sidebar pages={[
                    {name: "Schedule Appointments", pageId: "schedule_appointments"},
                    {name: "View Appointments", pageId: "view_appointments"},
                    {name: "View Calendar", pageId: "view_calendar"}
                ]} onSelectPage={this.setSelectedPage}/>
                <div id="content">
                    <TopBar/>
                    <div id="page_root">
                        <LoginPage visible={this.state.selectedPage === "login"}/>
                        <ScheduleAppointmentPage visible={this.state.selectedPage === "schedule_appointments"}/>
                        <ViewAppointmentsPage visible={this.state.selectedPage === "view_appointments"}/>
                        <ViewCalendarPage visible={this.state.selectedPage === "view_calendar"}/>
                    </div>
                </div>
            </div>
        );
    }
}

export type PageId = "login" | "schedule_appointments" | "view_appointments" | "view_calendar";
interface AppProperties {
    selectedPage: PageId
}