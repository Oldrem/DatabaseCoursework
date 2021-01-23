import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import {connect} from "react-redux";

class ColoniesEdit extends Component {

    emptyItem = {
        colonyId: '',
        name: '',
        leaderName: '',
        leaderLastName: '',
        population: '',
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
        let colonyId = this.props.match.params.colonyId;
        console.log(colonyId);
        if (this.props.match.params.colonyId !== 'new') {
            const colony = await (await fetch('/api/colony/' + this.props.match.params.colonyId)).json();
            this.setState({item: colony});
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
        await fetch('/api/colony' + (item.colonyId ? '/' + item.colonyId : ''),{
            method: (item.colonyId) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/colonies');
    }

    render() {
        const {item} = this.state;
        return <div>
            <Container>
                <h2>Edit Personal Information</h2>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name">Colony name:</Label>
                        <Input type="text" name="name" id="colonyName" value={item.name || ''}
                               onChange={this.handleChange} autoComplete="First name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="leaderName">Leader's first name:</Label>
                        <Input type="text" name="leaderName" id="leaderName" value={item.leaderName || ''}
                               onChange={this.handleChange} autoComplete="Leader first name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="leaderLastName">Leader's last name:</Label>
                        <Input type="text" name="leaderLastName" id="leaderLastName" value={item.leaderLastName || ''}
                               onChange={this.handleChange} autoComplete="Leader last name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="population">Population:</Label>
                        <input type="text" pattern="[0-9]*" name="population" id="population" value={item.population || ''}
                               onChange={this.handleChange} autoComplete="Population"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/colonies">Cancel</Button>
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

export default connect(mapStateToProps)(ColoniesEdit);
