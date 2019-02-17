import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import Main from "../Main/Main";

class App extends Component {
    render() {
        return (
            <div className="App">
                {/*header*/}
                <header className="header">
                    <Link className="logo" to="/"><img src={logo} className="App-logo" alt="logo"/></Link>
                    <nav className="header-nav">
                        <ul className="nav-list">
                            <li className="nav-list-item"><Link className="nav-list-item-link" to="/">Home</Link></li>
                            <li className="nav-list-item"><Link className="nav-list-item-link" to="theme">Theme Page</Link></li>
                            <li className="nav-list-item"><Link className="nav-list-item-link" to="programm">Programm Page</Link></li>
                        </ul>
                    </nav>
                </header>
                <Main/>
            </div>
        );
    }
}

export default App;
