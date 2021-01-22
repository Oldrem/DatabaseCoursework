import React, { Component } from 'react';
import {connect} from "react-redux";
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';

class ColoniesPage extends Component {

    constructor(props) {
        super(props);
        this.state = {colonies: [], isLoading: true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});
        fetch('api/colonies')
            .then(response => response.json())
            .then(data => this.setState({colonies: data, isLoading: false}));
    }

    async remove(id) {
        await fetch(`/api/colony/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedColonies = [...this.state.colonies].filter(i => i.colonyId !== id);
            this.setState({colonies: updatedColonies});
        });
    }

    render() {
        const {colonies, isLoading} = this.state;

        if (isLoading) {
            return <LoadingScreen/>;
        }

        const colonistList = colonies.map(colony => {
            return <tr key={colony.colonyId}>
                <td style={{whiteSpace: 'nowrap'}}>{colony.name}</td>
                <td style={{whiteSpace: 'nowrap'}}>{colony.leaderName}</td>
                <td style={{whiteSpace: 'nowrap'}}>{colony.leaderLastName}</td>
                <td style={{whiteSpace: 'nowrap'}}>{colony.population}</td>
                <td style={{whiteSpace: 'nowrap'}}>WIP</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/colony/" + colony.colonyId}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(colony.colonyId)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/colonists/new">A new challenger?</Button>
                    </div>
                    <h3>Full list of a lower class:</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="15%">Name</th>
                            <th width="15%">Leader's first name</th>
                            <th width="15%">Leader's last name</th>
                            <th width="15%">Population</th>
                            <th width="15%">Our relationship</th>
                            <th width="10%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            {colonistList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}


export default ColoniesPage;
