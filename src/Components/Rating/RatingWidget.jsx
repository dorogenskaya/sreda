import React, {Component} from 'react';
import RatingTable from "./RatingTable";
import Tab from "../common/Tab";
import Pagination from "../common/pagination";

import  _ from 'lodash';
import {paginate} from "../../util/paginate";

class RatingWidget extends Component {
    constructor (props) {
        super(props);
        this.state = {
            activeTab:'неделя',
            userList:[],
            currentPage: 1,
            pageSize: 15
        };
    }
    componentDidMount () {
        this.getUsers(this.state.activeTab);
    }

    getUsers = (activeTab) => {
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
            {picture: "user.picture",
                name: "Lena Dorogenskaya",
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
        this.setDataUsers(userList);
    };

    setDataUsers = (userList) => {
        this.setState({userList: userList})
    };

    handleTab = (activeTab) => {
        console.log(activeTab);
        this.getUsers(activeTab);
    };

    handlePageClick = (currentPage) =>{
        this.setState({ currentPage });
    };

    render() {
        const {userList, activeTab,  currentPage, pageSize} = this.state;
        const sorted =
            _.orderBy(userList, ['coins'], ['desc'])
            .map((user, index) => {
            return {picture: user.picture, name: user.name, coins: user.coins, key: index+1};
        });

        const paginated = paginate(sorted, currentPage, pageSize);

        return (
            <React.Fragment>
                <Tab
                    items = {['неделя', 'всё время']}
                    handleClick={this.handleTab}
                    activeTab={activeTab}
                    classCss={'tab_h2'}
                />
                <RatingTable
                    userList={paginated}
                />

                <Pagination
                    onChange={this.handlePageClick}
                    total={userList.length}
                    pageSize={pageSize}
                    current={currentPage}
                    hideOnSinglePage={true}
                />

            </React.Fragment>
        );
    }
}

export default RatingWidget;