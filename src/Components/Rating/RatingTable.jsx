import React, {Component} from 'react';
import UserRow from "./UserRow";
import './RatingTable.css';

class RatingTable extends Component {
    render() {
        const {userList} = this.props;
        return (
            <React.Fragment>
                <div className="table-header">
                    <span className="item">место</span>
                    <span className="item">анскулер</span>
                    <span className="item item__right">монеты</span>
                </div>
                {userList.map((user)=>
                    <UserRow key={user.key} user={user}/>
                )}
            </React.Fragment>
        );
    }
}

export default RatingTable;