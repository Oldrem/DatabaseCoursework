import React from 'react';
import {connect} from "react-redux";
import { Switch, Route} from "react-router-dom";
import "./style.scss"
import LoginContainer from "./Containers/LoginContainer";
import HomeContainer from "./Containers/HomeContainer";
import RegisterContainer from "./Containers/RegisterContainer";
import ColonistsContainer from "./Containers/ColonistsContainer";
import NavigationBarContainer from './Containers/NavigationBarContainer';
import AnimalsPageContainer from './Containers/AnimalsPageContainer';
import RoomsPageContainer from './Containers/RoomsPageContainer';


class App extends React.Component{

    render() {
        console.log("User:" + this.props.user);
        let isLoggedIn = !(this.props.user==="null" || this.props.user===null);
        console.log("Is logged in:" + isLoggedIn);

        if (!isLoggedIn)
            return (
                <div className="App">
                    <Header/>
                    <Switch>
                        <Route exact path="/register" component={RegisterContainer}/>
                        <Route component={LoginContainer}/>
                    </Switch>
                    <Footer/>
                </div>
            );
        else
            return (
                <div className="App">
                    <Header/>
                    <NavigationBarContainer/>
                    <Switch>
                        <Route exact path="/colonists" component={ColonistsContainer}/>
                        <Route exact path="/animals" component={AnimalsPageContainer}/>
                        <Route exact path="/rooms" component={RoomsPageContainer}/>
                        <Route exact path="/" component={HomeContainer}/>
                    </Switch>
                    <Footer/>
                </div>
            );
    }
}


const Header = ()=>{
    return(<div className="header">ИСБД, Курсовая работа.
        <span className="variant"> Щербаков В.Ю., Осипов О., P33122.</span>
    </div>)
};

const Footer = ()=>{
    return(<div className="footer">Copyright &copy;ItmoLabs all rights were broken</div>)
};



const mapStateToProps = function(store) {
    return {
        user: store.appState.user,
    }
};

export default connect(mapStateToProps)(App);
