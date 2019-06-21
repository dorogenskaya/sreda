import React from 'react';
import { Button, Icon } from 'antd';
import { Link } from 'react-router-dom';
import './Theme.css';
import '../common/common.css';

function ThemeHeader(props) {
    const {user, themeId, themeName, themeDescription, subject} = props;
    return (
        <div className="Theme-content__header">
            <h1 className="Theme-content__header__name">{themeName}</h1>
            <ul className="Theme-content__header__subjects">
                <li className="Theme-content__header__subject">
                    <Link to={`/program/${subject.id}`}>{subject.subjectName}</Link>
                </li>
            </ul>
            {user && (
                <React.Fragment>
                    <Link
                        to={{
                            pathname: `/themes/${themeId}/create-answer`,
                            state: { subject: subject }
                        }}
                        >
                        <Button type="primary"
                                // className="button  btn-black"
                                style={{ width: "100%", height: 42}}>
                            <Icon type="plus" />
                            <span >Добавить ответ</span>
                        </Button>
                    </Link>
                </React.Fragment>
            )}

        </div>
    );
}

export default ThemeHeader;