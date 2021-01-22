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
import ReviewPageContainer from "./Containers/ReviewPageContainer";


class App extends React.Component{

    constructor(props)
    {
        super(props)
        const pages = [
            {
                path: "/colonists",
                name: "Colony residents", showNavigationTab: true, 
                roleAccess: ["USER"],
                pageComponent: ColonistsContainer},
            {
                path: "/work",
                name: "My work", showNavigationTab: true, 
                roleAccess: ["USER"],
                pageComponent: WorkPageContainer},
            {
                path: "/report",
                name: "Report your work progress", showNavigationTab: false, 
                roleAccess: ["USER"],
                pageComponent: ReportPageContainer},
            {
                path: "/review",
                name: "Review work reports", showNavigationTab: true, 
                roleAccess: ["MANAGER"],
                pageComponent: ReviewPageContainer},
            {
                path: "/animals",
                name: "Animals", showNavigationTab: true, 
                roleAccess: ["USER"],
                pageComponent: AnimalsPageContainer},
            {
                path: "/rooms",
                name: "Rooms", showNavigationTab: true, 
                roleAccess: ["USER"],
                pageComponent: RoomsPageContainer},
            {
                path: "/occupations",
                name: "Occupations", showNavigationTab: true, 
                roleAccess: ["USER"],
                pageComponent: OccupationsPageContainer},
            {
                path: "/resources",
                name: "Our resources", showNavigationTab: true, 
                roleAccess: ["USER"],
                pageComponent: ResourcesPage},
            {
                path: "/colonies",
                name: "Other colonies", showNavigationTab: true, 
                roleAccess: ["USER"],
                pageComponent: ColoniesPageContainer},
            {
                path: "/edit",
                name: "Edit user details", showNavigationTab: false,  
                roleAccess: ["USER"],
                pageComponent: HomeEditContainer},
            {
                path: "/",
                name: "Userpage", showNavigationTab: true,  
                roleAccess: ["USER"],
                pageComponent: HomeContainer},
        ];
        this.state = {pages: pages, isLoading: true};
    }
    
    componentDidMount() {
        this.setState({isLoading: true});        
        fetch('user/' + this.props.user)
            .then(response => response.json())
            .then(data => this.props.dispatch({
                type: "APP_SET_ROLES",
                value: data}))
            .then(() => this.setState({isLoading: false}))
            .then(() => console.log(this.props.roles))
    }

    isUserOfRole(pageRoles)
    {
        let out = false;
        this.props.roles.forEach(userRole => {
            pageRoles.forEach(pageRole => {
                if (userRole === pageRole) out = true; // Fuck JS c:
            })
        });
        return out;
    }
    

    render() {
        let isLoggedIn = !(this.props.user==="null" || this.props.user===null);

        if (!isLoggedIn)
            return (
                <div className="App">                    
                    <div className="Page LoginPage">
                        <Header/>
                        <Switch>
                            <Route path="/register" component={RegisterContainer}/>
                            <Route component={LoginContainer}/>
                        </Switch>
                    </div>
                    <Footer/>
                </div>
            );
        
        
        if (this.state.isLoading)
            return (
                <div className="App">                    
                    <div className="Page">
                        Loading...
                    </div>
                    <Footer/>
                </div>
            );
        
        
        const pages = this.state.pages;

        const pageRouters = pages.map(page =>
        {
            if (this.isUserOfRole(page.roleAccess))
                return (                    
                    <Route key={page.path} path={page.path} component={page.pageComponent}/>
                )
            else console.log("Can't access " + page.name);
        })

        return (
            <div className="App">
                <NavigationBarContainer pages={pages}/>
                <div className="Page">
                    <Switch>
                        {pageRouters}
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
        roles: store.appState.roles
    }
};

export default connect(mapStateToProps)(App);
