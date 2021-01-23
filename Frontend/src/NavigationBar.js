import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import id_card from "./images/id-card.png"
import {connect} from "react-redux";

class NavigationBar extends Component {

    constructor(props)
    {
        super(props)
    }

    isUserOfRole(pageRoles)
    {
        let out = false;
        this.props.roles.forEach(userRole => {
            pageRoles.forEach(pageRole => {
                if (userRole === pageRole) out = true; // Fuck JS c:
            })
        });
        return out;
    }
    render() {

        const buttonsMetainfo = this.props.pages;

        const buttons = buttonsMetainfo.map( buttonInfo => {
            let selectedClass = window.location.pathname === buttonInfo.path ? "Selected" : "";
            if (buttonInfo.showNavigationTab && this.isUserOfRole(buttonInfo.roleAccess))
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


const mapStateToProps = function(store) {
    return {
        roles: store.appState.roles
    }
};

export default connect(mapStateToProps)(NavigationBar);
