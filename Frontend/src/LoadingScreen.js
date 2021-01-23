import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

class LoadingScreen extends Component {

    render() {
        return (
            <div className="LoadingScreen">
                Loading...
            </div>
        );
    }
}

export default LoadingScreen;
