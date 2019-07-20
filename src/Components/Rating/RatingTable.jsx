import React, {Component} from 'react';
import UserRow from "./UserRow";
import './RatingTable.css';


class RatingTable extends Component {
    render() {
        const {userList} = this.props;
        console.log(userList);

        return (
            <React.Fragment>
                { userList.map(user => <UserRow user={user}/>)}
            </React.Fragment>
        );
    }
}

export default RatingTable;