import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import {connect} from "react-redux";

class AnimalsEdit extends Component {

    emptyItem = {
        animalId: '',
        animalTypeId: 1,
        name: '',
        trainingProgress: '',
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        let animalId = this.props.match.params.animalId;
        console.log(animalId);
        if (this.props.match.params.animalId !== 'new') {
            const animal = await (await fetch('/api/animal/' + this.props.match.params.animalId)).json();
            this.setState({item: animal});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
        console.log(item);
        await fetch('/api/animal' + (item.animalId ? '/' + item.animalId : ''),{
            method: (item.animalId) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/animals');
    }

    render() {
        const {item} = this.state;
        return <div>
            <Container>
                <h2>Edit Personal Information</h2>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name">Animal name:</Label>
                        <Input type="text" name="name" id="animalName" value={item.name || ''}
                               onChange={this.handleChange} autoComplete="First name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="trainingProgress">Training progress:</Label>
                        <input type="text" pattern="[0-9]*" maxLength="3" name="trainingProgress" id="lastName" value={item.trainingProgress || ''}
                               onChange={this.handleChange} autoComplete="Training progress"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.appState.user,
    }
};

export default connect(mapStateToProps)(AnimalsEdit);
