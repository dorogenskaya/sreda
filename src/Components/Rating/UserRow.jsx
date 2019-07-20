import React from 'react';
import './RatingTable.css';

const UserRow = (props) => {
    const {user} = props;
    return (
        <div className="table">
            <div className="item">1</div>
            <div className="item">{user.picture}</div>
            <div className="item">{user.name}</div>
            <div className="item">{user.coins}</div>
        </div>
    );
};

export default UserRow;