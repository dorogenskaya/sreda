import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-menu">
                    <img src={logo} className="App-logo" alt="logo"/>
                </header>
                <div className="App-content">
                    <div className="App-content__wrapper">
                        <h1 className="App-theme">Theme name</h1>
                        <ul className="App-theme__types">
                            <li className="App-theme__types__items"><a href="">Subject name</a></li>
                            <li className="App-theme__types__items"><a href="">Level name</a></li>
                        </ul>
                        <div className="App-content__answers">
                            <div className="App-content__answer">fdfdf</div>
                            <div className="App-content__answer">fdfdf</div>
                            <div className="App-content__answer">fdfdf</div>

                        </div>
                    </div>

                </div>
                <div className="App-questions">ddd
                </div>
            </div>
        );
    }
}

export default App;
