import React from 'react';
import './Theme.css';
import { Button, Icon } from 'antd';
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
            </ul>
            <Button type="primary"  onClick={props.showDrawer}>
                <Icon type="plus" />
                <Link to={`/themes/${props.themeId}/create-answer`} style={{color: "#FFF"}}>Добавить ответ</Link>
            </Button>
        </div>
    );
};

export default ThemeHeader;
