import React, { Component } from 'react';
import {connect} from "react-redux";
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

class ResourcesPage extends Component {

    constructor(props) {
        super(props);
        this.state = {resources: [], resourceTypes: [], isLoading: true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});
        fetch('api/storedResources')
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
            return(
                <div>
                    <p>Loading...</p>
                </div>
            ) ;
        }

        const resourceList = resources.map(resource => {
            return <tr key={resource.resourceId}>
                <td style={{whiteSpace: 'nowrap'}}>{resource.storedResourceId.resourceId}</td>
                <td style={{whiteSpace: 'nowrap'}}>{resource.storedResourceId.roomId}</td>
                <td style={{whiteSpace: 'nowrap'}}>{resource.amount}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/resource/" + resource.resourceId}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(resource.resourceId)}>Delete</Button>
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
                            <th width="15%">Name</th>
                            <th width="15%">In room</th>
                            <th width="15%">Amount</th>
                            <th width="10%">Actions</th>
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
