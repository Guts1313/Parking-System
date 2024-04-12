import React, {Component} from "react";
import "./Sidebar.css";
import {PageId} from "../App";

export default class Sidebar extends Component<SidebarProperties,SidebarProperties> {

    constructor(props: SidebarProperties) {
        super(props);
        this.state = {...props};
    }

    render() {
        let pages: React.JSX.Element[] = [];
        for (let page of this.state.pages) {
            pages.push(<div key={page.pageId} className="sidebar_button" onClick={()=>this.state.onSelectPage(page.pageId)}>
                {page.name}
            </div>);
        }
        return <div id="sidebar">
            <div id="sidebar_logo">
                Logo
            </div>
            <div id="sidebar_pages">
                {pages}
            </div>
        </div>;
    }
}
interface SidebarProperties {
    pages: PageEntry[]
    onSelectPage: (pageId: PageId)=>void;
}
interface PageEntry {
    name: string,
    pageId: PageId
}