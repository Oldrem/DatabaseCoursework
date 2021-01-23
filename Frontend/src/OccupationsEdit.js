import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import {connect} from "react-redux";

class OccupationsEdit extends Component {

    emptyItem = {
        occupationId: '',
        name: '',
        description: '',
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
        let occupationId = this.props.match.params.occupationId;
        console.log(occupationId);
        if (this.props.match.params.occupationId !== 'new') {
            const occupation = await (await fetch('/api/occupation/' + occupationId)).json();
            this.setState({item: occupation});
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
        await fetch('/api/occupation' + (item.occupationId ? '/' + item.occupationId : ''),{
            method: (item.occupationId) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/occupations');
    }

    render() {
        const {item} = this.state;
        return <div>
            <Container>
                <h2>Edit Occupation Information</h2>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name">Occupation name:</Label>
                        <Input type="text" name="name" id="occupationName" value={item.name || ''}
                               onChange={this.handleChange} autoComplete="First name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Occupation description:</Label><br/>
                        <Input type="textarea" name="description" id="occupation-description" value={item.description || ''}
                               onChange={this.handleChange}/>
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

export default connect(mapStateToProps)(OccupationsEdit);
