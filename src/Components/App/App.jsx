import React, {Component} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Main from "../Main/Main";
import NavBar from "../NavBar/NavBar";

class App extends Component {
    render() {
        return (
            <div className="App">
                <NavBar/>
                <Main/>
            </div>
        );
    }
}

export default App;
