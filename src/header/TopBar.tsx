import {Component} from "react";
import "./TopBar.css";

export default class TopBar extends Component {
    render() {
        return <div id="topbar">
            <div id="topbar_profile_picture">
                <img src="/logo512.png" alt="Profile Picture"/>
            </div>
        </div>;
    }
}