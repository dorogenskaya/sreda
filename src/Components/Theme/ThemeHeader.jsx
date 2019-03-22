import React from 'react';
import './Theme.css';
import { Link } from 'react-router-dom';

function ThemeHeader(props) {
    return (
        <div className="Theme-content__header">
            <h1 className="Theme-theme">Theme name</h1>
            <ul className="Theme-theme__types">
                <li className="Theme-theme__types__items">
                    {/*query string of Program with filtered Subject*/}
                    <Link to={`/program/subject`}>Subject name</Link>
                </li>
                <li className="Theme-theme__types__items">
                    <Link to={`/themes/${props.themeId}/create-answer`}>Create answer</Link>
                </li>
            </ul>
        </div>
    );
};

export default ThemeHeader;