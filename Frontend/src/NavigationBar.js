import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

class NavigationBar extends Component {

    constructor(props)
    {
        super(props)
        let navigationButtons = 
        [
            {link: "/", name: "Homepage", roleVisibility: ["USER"]},
            {link: "/work", name: "My work", roleVisibility: ["MANAGER"]},
            {link: "/review", name: "Review reports", roleVisibility: ["USER"]},
            {link: "/colonists", name: "Colonists", roleVisibility: ["USER"]},
            {link: "/animals", name: "Animals", roleVisibility: ["USER"]},
            {link: "/rooms", name: "Rooms", roleVisibility: ["USER"]},
            {link: "/occupations", name: "Occupations", roleVisibility: ["USER"]},
            {link: "/resources", name: "Our resources", roleVisibility: ["USER"]},
            {link: "/colonies", name: "Other colonies", roleVisibility: ["USER"]}
        ];
        this.state = {navigationButtons: navigationButtons};
    }

    isUserOfRole(role)
    {
        return role.includes("USER"); //TODO check for role 
    }

    render() {

        const buttonsMetainfo = this.state.navigationButtons;

        const buttons = buttonsMetainfo.map( buttonInfo => {
            let selectedClass = window.location.pathname === buttonInfo.link ? "Selected" : "";
            if (this.isUserOfRole(buttonInfo.roleVisibility))
                return (
                    <Link to={buttonInfo.link}><Button className={selectedClass}>{buttonInfo.name}</Button></Link>
                );
        })

        return (
            <div className="NavigationBar">
                    {buttons}
            </div>
        );
    }
}

export default NavigationBar;
