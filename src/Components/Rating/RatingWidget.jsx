import React, {Component} from 'react';
import RatingTable from "./RatingTable";
import Tab from "../common/Tab";
import Pagination from "../common/pagination";
import { Spin } from 'antd';

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
            subject: 'Loading subject rating',
            loading: true,
        };
    }
    componentDidMount () {
        if (!this.props.subject)
            return;
            return this.setState({subject: this.props.subject, loading: false});
    }

    handleTab = (activeTab) => {
        console.log(activeTab);
        // this.getUsers(activeTab);
    };

    handlePageClick = (currentPage) =>{
        this.setState({ currentPage });
    };

    render() {
        const {loading, userList, activeTab,  currentPage, pageSize, subject} = this.state;

        const sorted =
            _.orderBy(userList, ['coins'], ['desc'])
            .map((user, index) => {return {picture: user.picture, name: user.name, coins: user.coins, key: index+1};
        });
        const paginated = paginate(sorted, currentPage, pageSize);

        if(loading)
            return (
                <div style={{textAlign: "center", position: "absolute", top: "25%", left: "50%"}}>
                    <h2>Loading...</h2>
                    <Spin size="large"/>
                </div>
            )

            return (
                <React.Fragment>
                    <h1>{subject.subjectName}</h1>
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