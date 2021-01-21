import React from "react";
import {connect} from "react-redux";
import {Button, ButtonGroup, FormGroup} from "reactstrap";
import {Link} from "react-router-dom";

class WorkPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {occupations: [], isLoading: true};
    }
    componentDidMount() {
        /*fetch('user/' + this.props.user)
            .then(response => response.json())
            .then(data => this.setState({role: data}))
            .catch(err => {console.error('Error:', err)});*/
        fetch('api/colonistlogin/' + this.props.user + '/occupations')
            .then(response => response.json())
            .then(data => this.setState({occupations: data, isLoading: false}))
            .catch(err => {console.error('Error:', err)});

    }

    render() {
        const {occupations, isLoading} = this.state;

        if (isLoading) {
            return(
                <div>
                    <p>Loading...</p>
                </div>
            ) ;
        }

        const occupationList = occupations.map(occupation => {
            if (occupation.timeStarts === "null") {
                return <div key={occupation.occupationId}>
                    <p>Работа: {occupation.name}</p>
                    <p>Время начала: {occupation.timeStarts}</p>
                    <p>Время окончания: {occupation.timeEnds}</p>
                    <p>Описание: {occupation.description}</p>
                    <p><Link to={'/report/' + occupation.occupationId}><Button >Отправить отчетность.</Button></Link></p>
                </div>
            }
            else {
                return <div key={occupation.occupationId}>
                    <p>Работа: {occupation.name}</p>
                    <p>Время: Конкретное расписание отсутствует</p>
                    <p>Описание: {occupation.description}</p>
                    <p><Link to={'/report/' + occupation.occupationId}><Button >Отправить отчетность.</Button></Link></p>
                </div>
            }
            });
        return(
            <div className="main-wrapper">
                <div className="Wrapper2">
                    <div className="main">
                        {occupationList}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.appState.user,
    }
};

export default connect(mapStateToProps)(WorkPage);
