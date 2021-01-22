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
            return <tr key={animal.animal.animalId}>
                <td style={{whiteSpace: 'nowrap'}}>{animal.animal.name}</td>
                <td style={{whiteSpace: 'nowrap'}}>{animal.animalTypeName}</td>
                <td style={{whiteSpace: 'nowrap'}}>{animal.colonistNickname}</td>
                <td style={{whiteSpace: 'nowrap'}}>{animal.animal.trainingProgress}%</td>
                <td style={{whiteSpace: 'nowrap'}}>{animal.animal.lastResourceCollection}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/colonist/" + animal.animal.animalId}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(animal.animal.animalId)}>Delete</Button>
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
                    <Table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Animal type</th>
                            <th>Responsible</th>
                            <th>Training progress</th>
                            <th>Last resource collection</th>
                            <th className="Shrink">Actions</th>
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
