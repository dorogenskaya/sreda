import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './Main.css';
import Home from '../Home/Home';
import Theme from '../Theme/Theme';
import Program from '../Program/Program';
import NotFound from '../NotFound/NotFound';

class Main extends Component {
    render() {
        return (
            <main className="main">
                <Switch>
                    <Route path="/themes/:id" component={Theme}></Route>
                    <Route path='/theme' component={Theme}/>
                    <Route path='/program' component={Program}/>
                    <Route path="/not-found" component={NotFound}/>
                    <Route path='/' exact component={Home}/>
                    <Redirect to="/not-found"/>
                </Switch>
            </main>
        )
    }
}
export default Main;