import React, { Component } from 'react';
import {connect} from "react-redux";
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';
import SuperTable from './SuperTable';

class Colonists extends Component {

    constructor(props) {
        super(props);
        this.state = {colonists: [], isLoading: true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});
        fetch('api/colonists')
            .then(response => response.json())
            .then(data => this.setState({colonists: data, isLoading: false}));
    }

    async remove(id) {
        await fetch(`/api/colonist/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedColonists = [...this.state.colonists].filter(i => i.colonistId !== id);
            this.setState({colonists: updatedColonists});
        });
    }

    render() {
        const {colonists, isLoading} = this.state;

        if (isLoading) {
            return <LoadingScreen/>;
        }

        const rows = colonists.map(colonist => {
            return [
                colonist.firstName,
                colonist.lastName,
                colonist.nickname,
                colonist.birthDate,
                colonist.colonyJoinDate,
                <ButtonGroup>
                            <Button to={"/colonist/" + colonist.colonistId}>Edit</Button>
                            <Button onClick={() => this.remove(colonist.colonistId)}>Delete</Button>
                </ButtonGroup>,
            ]
        });

        const labels = [
            {name: "First Name"},
            {name: "Last Name"},
            {name: "Nickname"},
            {name: "Birth Date"},
            {name: "Colony Join Date"},
            {name: "Actions", class: "Shrink"},
        ];

        const addButton = <Button to="/colonists/new">Add Colonist?</Button>;

        return (
            <SuperTable title="Really cool guys:" 
                        labels={labels} rows={rows} addButton={addButton} enableSearch/>
        );
    }
}


export default Colonists;
