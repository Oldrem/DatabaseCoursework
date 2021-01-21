import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

class NavigationBar extends Component {
    render() {
        return (
            <div>
                <Container fluid>
                    <Button color="link"><Link to="/">Home</Link></Button>
                    <Button color="link"><Link to="/colonists">Colonists</Link></Button>
                    <Button color="link"><Link to="/animals">Animals</Link></Button>
                    <Button color="link"><Link to="/rooms">Rooms</Link></Button>
                    <Button color="link"><Link to="/occupations">Occupations</Link></Button>
                    <Button color="link"><Link to="/colonies">Other colonies</Link></Button>
                </Container>
            </div>
        );
    }
}

export default NavigationBar;
