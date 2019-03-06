import React from 'react';
import './AnswerList.css';
import PropTypes from 'prop-types';
import Answer from '../Answer/Answer';
import { Radio } from 'antd';

export default class AnswerList extends React.Component {

    sorting = sort => {
        let sortState = {...this.props.sortState};

        if (sortState === sort) {
            return null; }
        else {sortState = sort; console.log("Sort by createDate");}

        return this.props.handleSort(sortState);
    };

    render() {
        return (
            <div className="AnswerList">
                <Radio.Group defaultValue={this.props.sortState} buttonStyle="solid">
                    <Radio.Button value="createDate" onClick={() => this.sorting('createDate')} >Последние</Radio.Button>
                    <Radio.Button value="favorite" onClick={() => this.sorting('likerlist.length')}>Популярные</Radio.Button>
                </Radio.Group>

                {this.props.answers.map(answer => {
                    return <Answer
                        key={answer.id}
                        answer={answer}
                        questionId={answer.tags}
                        name={answer.name}
                        handleClick={this.props.handleClick}
                        username={this.props.username}
                        />;
                    })
                }
            </div>
        );
    }
}

AnswerList.propTypes = {
    answers:PropTypes.array.isRequired,
};