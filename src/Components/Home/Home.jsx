import React, {Component} from 'react';
import './Home.css';
import SearchComponent from '../Search/Search';

class Home extends Component {
    render() {
        return (
            <div className="Home">
                <SearchComponent/>
                <h1>Home Page Content</h1>
            </div>
        );
    }
}

export default Home;