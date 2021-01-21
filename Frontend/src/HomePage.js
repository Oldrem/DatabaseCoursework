import React from "react";
import {connect} from "react-redux";

class HomePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {role: []};
    }
    componentDidMount() {
        fetch('user/' + this.props.user)
            .then(response => response.json())
            .then(data => this.setState({role: data}));
    }

    render() {
        return(
        <div className="main-wrapper">
            <div className="Wrapper2">
            <div className="main">
                <p className="login-name">Вы вошли как {this.props.user}</p>
                <p className="login-name">Роль: {this.state.role}</p>
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
    }
};

export default connect(mapStateToProps)(HomePage);
