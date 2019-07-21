import React from 'react';
import './RatingTable.css';
import classNames from "classnames";
import firebase from "../../model/firebase";


const UserRow = (props) => {
    const {user} = props;

    let rowClass = classNames('table-row',{
        'row-highlight': user.key < 10,
        'row-me': user.name === firebase.auth().currentUser.displayName
    });

    return (
        <div className={rowClass}>
            <div className="rowClass">{user.key}</div>
            <div className="rowClass">{user.picture}</div>
            <div className="rowClass">{user.name}</div>
            <div className="rowClass item__right">{user.coins}</div>
        </div>
    );
};

export default UserRow;