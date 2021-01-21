import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

class AnimalsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {animals: [], isLoading: true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});
        fetch('api/animals')
            .then(response => response.json())
            .then(data => this.setState({animals: data, isLoading: false}));
    }

    async remove(id) {
        await fetch(`/api/animal/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedColonists = [...this.state.animals].filter(i => i.animalId !== id);
            this.setState({animals: updatedColonists});
        });
    }

    render() {
        const {animals, isLoading} = this.state;

        if (isLoading) {
            return(
                <div>
                    <p>Loading...</p>
                </div>
            ) ;
        }

        console.log(animals);

        const animalList = animals.map(animal => {
            return <tr key={animal.animalId}>
                <td style={{whiteSpace: 'nowrap'}}>{animal.name}</td>
                <td style={{whiteSpace: 'nowrap'}}>{animal.animalTypeId}</td>
                <td style={{whiteSpace: 'nowrap'}}>{animal.responsibleColonistId}</td>
                <td style={{whiteSpace: 'nowrap'}}>{animal.trainingProgress}%</td>
                <td style={{whiteSpace: 'nowrap'}}>{animal.lastResourceCollection}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/colonist/" + animal.animalId}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(animal.animalId)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/colonists/new">Add an animal?</Button>
                    </div>
                    <h3>All the good boys and girls:</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="15%">Name</th>
                            <th width="15%">(TEMP) Animal type</th>
                            <th width="15%">(TEMP) Responsible</th>
                            <th width="15%">Training progress</th>
                            <th width="15%">Last resource collection</th>
                            <th width="10%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            {animalList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}


export default AnimalsPage;
