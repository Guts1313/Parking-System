import {Component} from "react";

export default class EmployeeEntry extends Component<EmployeeEntryState, EmployeeEntryState> {

    constructor(props: Readonly<EmployeeEntryState> | EmployeeEntryState) {
        super(props);
        this.state = {...props};
    }
    render() {
        const bgColor = this.state.highlightColor == undefined ? undefined : this.state.highlightColor+"22";
        return <div style={{backgroundColor: bgColor, borderRadius: this.state.highlightColor ? "10px" : "", border: this.state.highlightColor ? "1px solid" : undefined, borderColor: this.state.highlightColor}} className={"p-2 left-0 right-0 flex flex-row gap-2 items-center relative" + (this.state.onclick ? " cursor-pointer hover:bg-gray-600" : "")} onClick={()=>{
            if (this.state.onclick) this.state.onclick();
        }}>
            <img
                src="/images/avatar.jpg"
                alt="profile image"
                className="h-10 w-10 rounded-full object-cover"
            />
            <div className="flex flex-col">
                <div className="text-lg font-normal">{this.state.name}</div>
                <div className="text-sm font-light text-gray-400">{this.state.email}</div>
            </div>
        </div>;
    }
}

interface EmployeeEntryState {
    name: string,
    email: string,
    highlightColor: string | undefined,
    onclick: (()=>void) | undefined
}