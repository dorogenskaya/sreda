import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import './Main.css';
import Home from '../Home/Home';
import Theme from '../Theme/Theme';
import Program from '../Program/Program';

class Main extends Component {
    render() {
        return (
            <main className="main">
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/theme' component={Theme}/>
                    <Route path='/programm' component={Program}/>
                </Switch>
            </main>
        )
    }
}
export default Main;