import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './Main.css';
import Home from '../Home/Home';
import Theme from '../Theme/Theme';
import CreateAnswer from '../Theme/CreateAnswer';
import Program from '../Program/Program';
import NotFound from '../NotFound/NotFound';
import Register from "../register";
import Login from "../login";

class Main extends Component {

    render() {
        return (
            <main className="main">
                <Switch>
                    <Route path="/themes/:id" component={Theme}/>
                    <Route path='/theme' component={Theme}/>
                    <Route path='/program' component={Program}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                    <Route path="/not-found" component={NotFound}/>
                    <Route path='/' exact component={Home}/>
                    <Redirect to="/not-found"/>
                </Switch>
                <Route path="/themes/:id/create-answer" render={props => <CreateAnswer{...props} />}
                />
            </main>
        )
    }
}
export default Main;