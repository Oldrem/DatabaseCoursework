import React, { Component } from 'react';
import {connect} from "react-redux";
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';

class ResourcesPage extends Component {

    constructor(props) {
        super(props);
        this.state = {resources: [], resourceTypes: [], isLoading: true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});
        fetch('/api/resourceCount')
            .then(response => response.json())
            .then(data => this.setState({resources: data, isLoading: false}));
    }

    // TODO Won't work. Needs adjustments, probably to add/remove resources
    async remove(id) {
        await fetch(`/api/storedResource/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedresources = [...this.state.resources].filter(i => i.resourceId !== id);
            this.setState({resources: updatedresources});
        });
    }

    render() {
        const {resources, isLoading} = this.state;

        if (isLoading) {
            return <LoadingScreen/>;
        }

        const resourceList = resources.map(resource => {
            let roomCount = resource.roomIds.length;
            return <tr key={resource.resource.resourceId}>
                <td>{resource.resource.name}</td>
                <td>{resource.amount}</td>
                <td>{roomCount} rooms...</td>
                <td>
                    <ButtonGroup>
                        <Button to={"/resource/" + resource.resourceId}>Edit</Button>
                        <Button onClick={() => this.remove(resource.resourceId)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/resources/new">Add resource?</Button>
                    </div>
                    <h3>Behold! Our stuff:</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>In rooms</th>
                            <th className="Shrink">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            {resourceList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}


export default ResourcesPage;
