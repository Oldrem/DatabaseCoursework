import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

class NavigationBar extends Component {
    render() {
        return (
            <div className="NavigationBar">
                    <Link to="/"><Button>Homepage</Button></Link>
                    <Link to="/work"><Button>My work</Button></Link>
                    <Link to="/colonists"><Button>Colonists</Button></Link>
                    <Link to="/animals"><Button>Animals</Button></Link>
                    <Link to="/rooms"><Button>Rooms</Button></Link>
                    <Link to="/occupations"><Button>Occupations</Button></Link>
                    <Link to="/resources"><Button>Our resources</Button></Link>
                    <Link to="/colonies"><Button>Other colonies</Button></Link>
            </div>
        );
    }
}

export default NavigationBar;
