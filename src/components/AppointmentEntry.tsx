import {Component} from "react";

export default class AppointmentEntry extends Component<AppointmentEntryState, AppointmentEntryState> {

    constructor(props: Readonly<AppointmentEntryState> | AppointmentEntryState) {
        super(props);
        this.state = props;
    }
    render() {
        let col = this.state.highlightColor;
        if (col.startsWith("#")) col = col.substring(1);
        if (col.length == 3) col = col[0] + col[0] + col[1] + col[1] + col[2] + col[2];
        const num = parseInt(col, 16);
        const r = (num & 0xFF0000) >> 16;
        const g = (num & 0x00FF00) >> 8;
        const b = (num & 0x0000FF) >> 0;

        const textColor = (r*0.299 + g*0.587 + b*0.114) > 210 ? "#000000" : "#ffffff";
        return <div
            style={{color: textColor, backgroundColor: this.state.highlightColor, border: "5px solid #00000022"}}
            className="p-2 relative flex flex-col cursor-pointer"
        onClick={()=>{
            if (this.state.onclick) this.state.onclick();
        }}>
            <div className="font-bold">{this.state.mainText}</div>
            <div className="text-xs font-normal">{this.state.subtext}</div>
        </div>;
    }
}

interface AppointmentEntryState {
    mainText: string,
    subtext: string,
    highlightColor: string,
    onclick: (()=>void) | undefined
}