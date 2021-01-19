import React, { Component } from 'react';
import HomePage from './HomePage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Colonists from './ColonistsPage';
import NavigationBar from './NavigationBar';

class App extends Component {
    render() {
        return (
            <div>                
                <NavigationBar/>
                <Router>
                    <Switch>
                        <Route path='/' exact={true} component={HomePage}/>
                        <Route path='/colonists' exact={true} component={Colonists}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default App;
