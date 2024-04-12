import {Component} from "react";
import PageProperties from "./PageProperties";

export default class ViewCalendarPage extends Component<PageProperties,PageProperties> {
    constructor(props: PageProperties) {
        super(props);
        this.state = {...props};
    }
    componentWillReceiveProps(nextProps: Readonly<PageProperties>, nextContext: any) {
        this.setState({...nextProps});
    }
    render() {
        return <div className={this.state.visible ? "" : "hidden"}>
            View Calendar Page
        </div>;
    }
}