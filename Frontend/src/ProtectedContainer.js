import React, { Component } from 'react';
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

class ProtectedContainer extends Component {

    isUserOfRole(buttonRoles)
    {
        let out = false;
        this.props.userRoles.forEach(userRole => {
            buttonRoles.forEach(buttonRole => {
                if (userRole === buttonRole) out = true; // Fuck JS c:
            })
        });
        return out;
    }

    render() {
        if (this.isUserOfRole(this.props.roles))
            return this.props.children;
        else return null;
    }
}


const mapStateToProps = function(store) {
    return {
        userRoles: store.appState.roles
    }
};

export default connect(mapStateToProps)(ProtectedContainer);
