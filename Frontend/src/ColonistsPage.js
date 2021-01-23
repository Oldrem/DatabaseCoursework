import React, { Component } from 'react';
import {connect} from "react-redux";
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';
import SuperTable from './SuperTable';
import ProtectedContainer from './ProtectedContainer';

class Colonists extends Component {

    constructor(props) {
        super(props);
        this.state = {colonists: [], isLoading: true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});
        fetch('/api/colonists')
            .then(response => response.json())
            .then(data => this.setState({colonists: data}))
            .then(() => fetch('api/relationship/' + this.props.colonist.colonistId)
                .then(response => response.json())
                .then(data => this.setState({relationships: data, isLoading: false}))
            );
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

        const relationships = this.state.relationships;
        const ownColonistID = this.props.colonist.colonistId;

        const rows = colonists.map(colonist => {
            let relLevel;
            if (colonist.colonistId === ownColonistID)
                relLevel = "It's you!"
            else
            {
                let rel = relationships.find(rel => rel.relationshipId.colonist2Id === colonist.colonistId);
                relLevel = rel ? rel.level : 0;
            }
            return [
                colonist.firstName,
                colonist.lastName,
                colonist.nickname,
                relLevel,
                colonist.birthDate,
                colonist.colonyJoinDate,
                <ProtectedContainer roles ={["MANAGER", "ADMIN"]}> 
                    <ButtonGroup>
                                <Button to={"/colonist/" + colonist.colonistId}>Edit</Button>
                                <Button onClick={() => this.remove(colonist.colonistId)}>Delete</Button> 
                    </ButtonGroup>
                </ProtectedContainer>,
            ]
        });

        const labels = [
            {name: "First Name"},
            {name: "Last Name"},
            {name: "Nickname"},
            {name: "Your opinion"},
            {name: "Birth Date"},
            {name: "Colony Join Date"},
            {name: "", class: "Shrink"},
        ];

        const addButton = <Button to="/colonists/new">Add Colonist?</Button>;

        return (
            <SuperTable title="Really cool guys:" 
                        labels={labels} rows={rows} addButton={addButton} enableSearch/>
        );
    }
}



const mapStateToProps = function(store) {
    return {
        colonist: store.appState.colonist
    }
};

export default connect(mapStateToProps)(Colonists);
