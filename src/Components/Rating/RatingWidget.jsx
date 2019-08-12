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
            activeTab: 'неделя',
            userList: this.props || [],
            currentPage: 1,
            pageSize: 15,
            subject: this.props.subject
        };
    }
    componentDidMount () {
        // const {userList} = this.props || [];
        // this.setState({userList});
    }
    //
    // getUsers = (activeTab) => {
    // };
    //
    // setDataUsers = (userList) => {
    //     this.setState({userList})
    // };


    handleTab = (activeTab) => {
        console.log(activeTab);
        // this.getUsers(activeTab);
    };

    handlePageClick = (currentPage) =>{
        this.setState({ currentPage });
    };

    render() {
        const {userList, activeTab,  currentPage, pageSize} = this.state;

        const sorted =
            _.orderBy(userList, ['coins'], ['desc'])
            .map((user, index) => {return {picture: user.picture, name: user.name, coins: user.coins, key: index+1};
        });
        console.log('sorted');
        const paginated = paginate(sorted, currentPage, pageSize);
        console.log('paginated');

        return (
            <React.Fragment>
                <h1>subjectName</h1>
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
                    total={userList ? userList.length :0}
                    pageSize={pageSize}
                    current={currentPage}
                    hideOnSinglePage={true}
                />

            </React.Fragment>
        );
    }
}

export default RatingWidget;