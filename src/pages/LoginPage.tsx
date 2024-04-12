import {Component} from "react";
import PageProperties from "./PageProperties";

export default class LoginPage extends Component<PageProperties,PageProperties> {
    constructor(props: PageProperties) {
        super(props);
        this.state = {...props};
    }
    componentWillReceiveProps(nextProps: Readonly<PageProperties>, nextContext: any) {
        this.setState({...nextProps});
    }

    render() {
        return <div className={this.state.visible ? "" : "hidden"}>
            Login Page
        </div>;
    }
}
