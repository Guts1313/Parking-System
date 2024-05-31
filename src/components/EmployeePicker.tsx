import Employee from "../api/Employee.ts";
import {Component} from "react";
import EmployeeEntry from "./EmployeeEntry.tsx";
import {ArrowDownIcon, ArrowUpIcon} from "@heroicons/react/outline";

export default class EmployeePicker extends Component<EmployeePickerProps, EmployeePickerState> {

    constructor(props: Readonly<EmployeePickerProps> | EmployeePickerProps) {
        super(props);
        this.state = {...props, open: false};
    }

    setOpen(value: boolean) {
        this.setState({...this.state, open: value});
    }
    toggleSelect(employee: Employee) {
        let selected: Employee[];
        if (!this.state.multiple) {
            selected = [employee];

        } else {
            selected = [...this.state.selected];
            const index = selected.findIndex(e=>e.id == employee.id);
            if (index > -1) {
                selected.splice(index, 1);
            } else {
                selected.push(employee);
            }
        }
        this.setState({...this.state, selected: selected});
        this.state.onUpdate(selected);
    }
    render() {
        return <div className="relative flex flex-row items-center">
            {
                !this.state.open
                ? <ArrowDownIcon className="h-10 w-10 p-3" onClick={()=>{this.setOpen(true)}}/>
                : <ArrowUpIcon   className="h-10 w-10 p-3" onClick={()=>{this.setOpen(false)}}/>
            }

            <div style={{width: "100%", minHeight: "50px"}} className="top-0 flex flex-row p-1 gap-1 flex-wrap overflow-auto">
                {this.state.selected.length == 0 ? <div className="flex items-center justify-center">No Employee{this.state.multiple ? "s" : ""} Selected</div> : undefined}
                {this.state.selected.map((e, index)=>
                    <EmployeeEntry
                        key={"picked-" + e.id + "-" + index}
                        name={e.name}
                        email={e.email}
                        highlightColor={colors[index%colors.length]}
                        onclick={this.state.multiple ? ()=>this.toggleSelect(e) : undefined}/>)}
            </div>
            <div style={{width: "100%", height: "200px", top: "100%", visibility: this.state.open ? "visible" : "collapse"}} className="z-10 absolute overflow-auto bg-gray-900">
                {(this.state.multiple
                    ? this.state.employees.filter(e=>this.state.selected.indexOf(e) == -1)
                    : this.state.employees).map((e)=>
                    <EmployeeEntry
                        key={"available-" + e.id}
                        name={e.name}
                        email={e.email}
                        highlightColor={undefined}
                        onclick={()=>this.toggleSelect(e)}/>)}
            </div>
        </div>;
    }
}

interface EmployeePickerProps {
    employees: Employee[]
    multiple: boolean,
    selected: Employee[],
    onUpdate: (selected: Employee[])=>void
}
interface EmployeePickerState {
    employees: Employee[],
    multiple: boolean,
    selected: Employee[],
    onUpdate: (selected: Employee[])=>void,
    open: boolean
}

export const colors = ["#4e7ee6","#e64e4e","#e6d94e","#3ddb4d",
                               "#b13bd9","#4ee6e6","#e64e9d"];