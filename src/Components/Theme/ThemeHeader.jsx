import React from 'react';
import './Theme.css';
import { Button, Icon } from 'antd';
import { Link } from 'react-router-dom';

function ThemeHeader(props) {
    const {user, themeId, themeName, themeDescription, subject} = props;
    return (
        <div className="Theme-content__header">
            <h1 className="Theme-theme">{themeName}</h1>
            <ul className="Theme-theme__types">
                <li className="Theme-theme__types__items">
                    <Link to={`/program/${subject.id}`}>{subject.subjectName}</Link>
                </li>
            </ul>
            {user && (
                <React.Fragment>
                    <Button type="primary">
                        <Icon type="plus" />
                        <Link
                            to={{
                                pathname: `/themes/${themeId}/create-answer`,
                                state: { subject: subject }
                            }}
                            style={{color: "#FFF"}}>Добавить ответ</Link>
                    </Button>
                </React.Fragment>
            )}

        </div>
    );
}

export default ThemeHeader;