import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import id_card from "./images/id-card.png"

class NavigationBar extends Component {

    constructor(props)
    {
        super(props)
    }

    isUserOfRole(role)
    {
        return role.includes("USER"); //TODO check for role 
    }

    render() {

        const buttonsMetainfo = this.props.pages;

        const buttons = buttonsMetainfo.map( buttonInfo => {
            let selectedClass = window.location.pathname === buttonInfo.path ? "Selected" : "";
            if (this.isUserOfRole(buttonInfo.roleAccess))
                return ( 
                    <Link to={buttonInfo.path} key={buttonInfo.path}>
                        <Button className={selectedClass}>{buttonInfo.name}</Button>
                    </Link>
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
