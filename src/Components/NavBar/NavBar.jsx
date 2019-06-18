import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';

const NavBar = ({user}) => {
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

                    {!user && (
                        <React.Fragment>
                            <h2>Гостевой вход</h2>
                            <li className="nav-list-item">
                                <Link className="nav-list-item-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-list-item">
                                <Link className="nav-list-item-link" to="/register">Register</Link>
                            </li>
                        </React.Fragment>
                    )}
                    {user && (
                        <React.Fragment>
                            <li className="nav-list-item">
                                <Link className="nav-list-item-link" to="/profile">{user.name}</Link>
                            </li>
                            <li className="nav-list-item">
                                <Link className="nav-list-item-link" to="/logout">Logout</Link>
                            </li>
                            {user.role === 0 && (
                                <React.Fragment>
                                <li className="nav-list-item">
                                    <Link className="nav-list-item-link" to="/admin">Admin Panel</Link>
                                </li>
                                </React.Fragment>
                            )}
                        </React.Fragment>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default NavBar;