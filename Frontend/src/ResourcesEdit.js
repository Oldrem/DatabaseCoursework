import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import {connect} from "react-redux";

class ResourcesEdit extends Component {

    emptyItem = {
        resourceId: '',
        resourceName: '',
        roomName: '',
        amount: ''
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
        let resourceId = this.props.match.params.resourceId;
        console.log(resourceId);
        if (this.props.match.params.resourceId !== 'new') {
            const resource = await (await fetch('/api/resource/' + this.props.match.params.resourceId)).json();
            this.setState({item: resource});
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

        let storedResourceId = {
            resourceId: '',
            roomId: ''
        };

        let storedResource = {
            storedResourceId,
            amount: ''
        };

        const resource = await (await fetch('/api/resourcename/' + item.resourceName)).json();
        const room = await (await fetch('/api/roomname/' + item.roomName)).json();
        console.log(resource);
        console.log(room);
        storedResource.storedResourceId.resourceId = resource.resourceId;
        storedResource.storedResourceId.roomId = room.roomId;
        storedResource.amount = item.amount;
        console.log(storedResource);
        await fetch('/api/storedResource' + (item.resourceId ? '/' + item.resourceId : ''),{
            method: (item.resourceId) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(storedResource),
        });
        this.props.history.push('/resources');
    }

    render() {
        const {item} = this.state;
        return <div>
            <Container>
                <h2>Resource:</h2>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="resourceName">Resource name:</Label>
                        <Input type="text" name="resourceName" id="resourceName" value={item.resourceName || ''}
                               onChange={this.handleChange} autoComplete="Resource name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="roomName">Room name:</Label>
                        <Input type="text" name="roomName" id="roomName" value={item.roomName || ''}
                               onChange={this.handleChange} autoComplete="Room name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="amount">Amount:</Label>
                        <input type="text" pattern="[0-9]*" name="amount" id="amount" value={item.amount || ''}
                               onChange={this.handleChange} autoComplete="Amount"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/resources">Cancel</Button>
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

export default connect(mapStateToProps)(ResourcesEdit);
