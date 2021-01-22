import React from "react";
import {connect} from "react-redux";
import {Button, FormGroup} from "reactstrap";
import {Link} from "react-router-dom";

class HomePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {role: [], colonistData: {}, isLoading: true};
    }
    componentDidMount() {

        fetch('api/colonist/' + this.props.user)
            .then(response => response.json())
            .then(data => this.setState({colonistData: data, isLoading: false}))
            .catch(err => {console.error('Error:', err)});

    }

    render() {
        JSON.stringify(this.state.colonistData)
        return(
        <div className="main-wrapper">
            <div className="Wrapper2">
            <div className="main">
                <p className="login-name">Вы вошли как {this.props.user}</p>
                <p className="login-name">Роль: {this.props.roles}</p> <br/>
                <p className="login-name">Имя: {this.state.colonistData.firstName}</p>
                <p className="login-name">Фамилия: {this.state.colonistData.lastName}</p>
                <p className="login-name">Прозвище: {this.state.colonistData.nickname}</p>
                <p className="login-name">Дата присоединения: {this.state.colonistData.colonyJoinDate}</p>
                <Button className="submit-button-main" tag={Link} to="/edit">Редактировать</Button>
                <button className="submit-button-main" onClick={this.exit}>Выйти</button><br/>
            </div>
            </div>
        </div>
        )
    }


    exit = ()=>{
        this.props.dispatch({type: "APP_LOGOUT", value: {history: this.props.history}});
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.appState.user,
        roles: store.appState.roles
    }
};

export default connect(mapStateToProps)(HomePage);
