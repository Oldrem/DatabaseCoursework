import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

class RoomsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {rooms: [], isLoading: true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});
        fetch('api/rooms')
            .then(response => response.json())
            .then(data => this.setState({rooms: data, isLoading: false}));
    }

    async remove(id) {
        await fetch(`/api/room/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedRooms = [...this.state.rooms].filter(i => i.roomId !== id);
            this.setState({rooms: updatedRooms});
        });
    }

    render() {
        const {rooms, isLoading} = this.state;

        if (isLoading) {
            return(
                <div>
                    <p>Loading...</p>
                </div>
            ) ;
        }

        console.log(rooms);

        const roomList = rooms.map(room => {
            return <tr key={room.room.roomId}>
                <td style={{whiteSpace: 'nowrap'}}>{room.room.name}</td>
                <td style={{whiteSpace: 'nowrap'}}>{room.roomTypeName}</td>
                <td style={{whiteSpace: 'nowrap'}}>{room.room.area}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" to={"/colonist/" + room.room.roomId}>Edit</Button>
                        <Button size="sm" onClick={() => this.remove(room.room.roomId)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/colonists/new">Add a room?</Button>
                    </div>
                    <h3>ResidentSleepers and workplaces:</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="15%">Name</th>
                            <th width="15%">Room type</th>
                            <th width="15%">Area</th>
                            <th width="10%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            {roomList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}


export default RoomsPage;
