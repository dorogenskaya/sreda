import React, {Component} from 'react';
import Tab from "../common/Tab";
import RatingTable from "./RatingTable"

const userList = [
    {picture: "user.picture",
     name: "Лена Дорогенская",
     coins: 23
    },
    {picture: "user.picture",
        name: "Ваня Довгаленок",
        coins: 34
    },
    {picture: "user.picture",
        name: "Саша Матвеев",
        coins: 22
    },
];

class RatingWidget extends Component {
    constructor (props) {
        super(props);
        this.state = {
            activeTab:'неделя'
        }
    }

    handleTab = (activeTab) => {
        console.log(activeTab);
    };

    render() {
        console.log(userList);
        return (
            <React.Fragment>
                <Tab
                    items = {['неделя', 'всё время']}
                    handleClick={this.handleTab}
                    activeTab={this.state.activeTab}
                    classCss={'tab_h2'}
                />
                <RatingTable
                    userList={userList}
                />

            </React.Fragment>
        );
    }
}

export default RatingWidget;