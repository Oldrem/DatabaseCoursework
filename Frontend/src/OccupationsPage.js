import React, { Component } from 'react';
import {connect} from "react-redux";
import NavigationBar from './NavigationBar';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

class OccupationsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {occupations: [], isLoading: true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});
        fetch('api/occupations')
            .then(response => response.json())
            .then(data => this.setState({occupations: data, isLoading: false}))
            .then(() => this.generateShortDescripiptions());
    }

    generateShortDescripiptions()
    {
        const maxDecriptionLength = 40;
        let occupations = this.state.occupations;
        occupations.forEach(element => {
            element.descriptionShort = element.description.substring(0, maxDecriptionLength);
            if (element.description.length > maxDecriptionLength)
                element.descriptionShort += "...";
        });
        this.setState({occupations: occupations, isLoading: false});
    }

    async remove(id) {
        await fetch(`/api/occupation/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedOccupations = [...this.state.occupations].filter(i => i.occupationId !== id);
            this.setState({occupations: updatedOccupations});
        });
    }

    render() {
        const {occupations, isLoading} = this.state;

        if (isLoading) {
            return(
                <div>
                    <p>Loading...</p>
                </div>
            );
        }

        const occupationList = occupations.map(occupation => {
            return <tr key={occupation.occupationId}>
                <td style={{whiteSpace: 'nowrap'}}>{occupation.name}</td>
                <td style={{whiteSpace: 'nowrap'}} title={occupation.description}>{occupation.descriptionShort}</td>
                <td style={{whiteSpace: 'nowrap'}}>{occupation.timeStarts}</td>
                <td style={{whiteSpace: 'nowrap'}}>{occupation.timeEnds}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/occupation/" + occupation.occupationId}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(occupation.occupationId)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/occupations/new">Опять работа?</Button>
                    </div>
                    <h3>Go find a job you sausage roll looking twat:</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="15%">Name</th>
                            <th width="15%">Description</th>
                            <th width="15%">Start time</th>
                            <th width="15%">End time</th>
                            <th width="10%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            {occupationList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}


export default OccupationsPage;
