import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

class Home extends Component {
    render() {
        return (
            <div>
                <Container fluid>
                    <Button color="link"><Link to="/colonists">Colonists</Link></Button>
                </Container>
            </div>
        );
    }
}

export default Home;
