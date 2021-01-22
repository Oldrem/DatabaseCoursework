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
import OccupationsPageContainer from './Containers/OccupationsPageContainer';
import ColoniesPageContainer from './Containers/ColoniesPageContainer';
import HomeEditContainer from "./Containers/HomeEditContainer";
import ResourcesPage from './ResourcesPage';
import WorkPageContainer from "./Containers/WorkPageContainer";
import ReportPageContainer from "./Containers/ReportPageContainer";


class App extends React.Component{

    render() {
        console.log("User:" + this.props.user);
        let isLoggedIn = !(this.props.user==="null" || this.props.user===null);
        console.log("Is logged in:" + isLoggedIn);

        if (!isLoggedIn)
            return (
                <div className="App">                    
                    <div className="Page">
                        <Header/>
                        <Switch>
                            <Route exact path="/register" component={RegisterContainer}/>
                            <Route component={LoginContainer}/>
                        </Switch>
                    </div>
                    <Footer/>
                </div>
            );
        else
            return (
                <div className="App">
                    <NavigationBarContainer/>
                    <div className="Page">
                        <Switch>
                            <Route exact path="/colonists" component={ColonistsContainer}/>
                            <Route exact path="/animals" component={AnimalsPageContainer}/>
                            <Route exact path="/rooms" component={RoomsPageContainer}/>
                            <Route exact path="/occupations" component={OccupationsPageContainer}/>
                            <Route exact path="/colonies" component={ColoniesPageContainer}/>
                            <Route exact path="/resources" component={ResourcesPage}/>
                            <Route path="/report/:occupationId" component={ReportPageContainer} />
                            <Route exact path="/work" component={WorkPageContainer}/>
                            <Route exact path="/edit" component={HomeEditContainer}/>
                            <Route exact path="/" component={HomeContainer}/>
                        </Switch>                        
                    </div>
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
    return(
        <div className="Footer">
            <div className="Left">ИСБД, Курсовая работа. Щербаков В.Ю., Осипов О., P33122.</div>
            <div className="Rigt">Copyright &copy;ItmoLabs all rights were broken</div>
        </div>)
};



const mapStateToProps = function(store) {
    return {
        user: store.appState.user,
    }
};

export default connect(mapStateToProps)(App);
