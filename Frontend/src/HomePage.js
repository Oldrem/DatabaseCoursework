import React from "react";
import {connect} from "react-redux";
import NavigationBar from "./NavigationBar";

class HomePage extends React.Component{
    constructor(props){
        super(props);
        if(this.props.user==="null") this.props.history.push("/login");
    }
    render() {
        return(
        <div className="main-wrapper">
            <NavigationBar/>
            <div className="Wrapper2">
            <div className="main">
                <p className="login-name">Вы вошли как {this.props.user}</p>
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
