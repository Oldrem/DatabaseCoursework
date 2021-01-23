import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import {connect} from "react-redux";

class RoomsEdit extends Component {

    emptyItem = {
        roomId: '',
        roomTypeId: 1,
        name: '',
        area: '',
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
        let roomId = this.props.match.params.roomId;
        console.log(roomId);
        if (this.props.match.params.roomId !== 'new') {
            const room = await (await fetch('/api/room/' + roomId)).json();
            this.setState({item: room});
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
        await fetch('/api/room' + (item.roomId ? '/' + item.roomId : ''),{
            method: (item.roomId) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/rooms');
    }

    render() {
        const {item} = this.state;
        return <div>
            <Container>
                <h2>Edit Personal Information</h2>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name">Room name:</Label>
                        <Input type="text" name="name" id="roomName" value={item.name || ''}
                               onChange={this.handleChange} autoComplete="First name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="area">Room area:</Label>
                        <input type="text" pattern="[0-9]*" maxLength="3" name="area" id="lastName" value={item.area || ''}
                               onChange={this.handleChange} autoComplete="Area"/>
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

export default connect(mapStateToProps)(RoomsEdit);
