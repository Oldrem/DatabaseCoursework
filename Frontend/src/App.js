import React from 'react';
import { Switch, Route} from "react-router-dom";
import "./style.scss"
import LoginContainer from "./Containers/LoginContainer";
import HomeContainer from "./Containers/HomeContainer";
import RegisterContainer from "./Containers/RegisterContainer";
import ColonistsContainer from "./Containers/ColonistsContainer";


class App extends React.Component{
    render() {
        return (
            <div className="App">
                <Header/>
                <Switch>
                    <Route exact path="/login" component={LoginContainer}/>
                    <Route exact path="/register" component={RegisterContainer}/>
                    <Route exact path="/colonists" component={ColonistsContainer}/>
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


export default App;
