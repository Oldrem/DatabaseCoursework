import React, { Component } from 'react';
import HomePage from './HomePage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DataTable from './DataTable';

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact={true} component={HomePage}/>
                    <Route path='/colonists' exact={true} component={DataTable}/>
                </Switch>
            </Router>
        )
    }
}

export default App;
