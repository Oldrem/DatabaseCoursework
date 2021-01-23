import React, { Component } from 'react';
import {connect} from "react-redux";
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';

class Colonists extends Component {

    constructor(props) {
        super(props);
        this.state = {colonists: [], isLoading: true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});
        fetch('api/colonists')
            .then(response => response.json())
            .then(data => this.setState({colonists: data, isLoading: false}));
    }

    async remove(id) {
        await fetch(`/api/colonist/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedColonists = [...this.state.colonists].filter(i => i.colonistId !== id);
            this.setState({colonists: updatedColonists});
        });
    }

    render() {
        const {colonists, isLoading} = this.state;

        if (isLoading) {
            return <LoadingScreen/>;
        }

        const colonistList = colonists.map(colonist => {
            return <tr key={colonist.colonistId}>
                <td style={{whiteSpace: 'nowrap'}}>{colonist.firstName}</td>
                <td style={{whiteSpace: 'nowrap'}}>{colonist.lastName}</td>
                <td style={{whiteSpace: 'nowrap'}}>{colonist.nickname}</td>
                <td style={{whiteSpace: 'nowrap'}}>{colonist.birthDate}</td>
                <td style={{whiteSpace: 'nowrap'}}>{colonist.colonyJoinDate}</td>
                <td>
                    <ButtonGroup>
                        <Button to={"/colonist/" + colonist.colonistId}>Edit</Button>
                        <Button onClick={() => this.remove(colonist.colonistId)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/colonists/new">Add Colonist?</Button>
                    </div>
                    <h3>Really cool guys:</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="15%">Name</th>
                            <th width="15%">Last Name</th>
                            <th width="15%">Nickname</th>
                            <th width="15%">Birth Date</th>
                            <th width="15%">Colony Join Date</th>
                            <th className="Shrink">Actions</th>
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


export default Colonists;
