import React from 'react';

const UserProfile = (props) => {
    const {user} = props;

    this.getCoinCounts =(coinCounter) => {
        let coins = 0;
        for (let key in coinCounter) {
            coins += coinCounter[key].all;
        }
        return coins;
    };

    this.renderRole = (role) => {
        switch(role) {
            case 0:
                return "Admin";
            case 1:
                return "Meister";
            case 2:
                return "Mentor";
            case 3:
                return "Unschooler";
            case 4:
                return "Beginner";
            default:
                return "Guest";
        }
    };

    return (
        <div>
            <div>{this.getCoinCounts(user.coinCounter)} coins</div>
            <img src={user.picture}
                 alt=""
                 style={{width: 200}}
            />
            <div>{user.name}</div>
            <div>{this.renderRole(user.role)}</div>
            {user.role < 4 && (<div>Permissions</div>)}
            <h2>Rating</h2>
        </div>
    );
};

export default UserProfile;
