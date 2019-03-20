import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';

const NavBar = () => {
    return (
        <header className="header">
            <nav className="header-nav">
                <ul className="nav-list">
                    <li className="nav-list-item">
                        <Link className="logo" to="/">
                            <img src={logo} className="App-logo" alt="logo"/>
                        </Link>
                    </li>

                    <li className="nav-list-item">
                        <Link className="nav-list-item-link" to="/program">Program Page</Link>
                    </li>
                    <li className="nav-list-item">
                        <Link className="nav-list-item-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-list-item">
                        <Link className="nav-list-item-link" to="/register">Register</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default NavBar;
