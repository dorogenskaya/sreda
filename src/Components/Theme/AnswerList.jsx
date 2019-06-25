import React from 'react';
import PropTypes from 'prop-types';
import Answer from './Answer';
import { Radio } from 'antd';

export default class AnswerList extends React.Component {

    sorting = sort => {
        let sortState = {...this.props.sortState};
        if (sortState === sort) {
            return null; }
        else {sortState = sort; }
        return this.props.handleSort(sortState);
    };

    render() {
        const {sortState, answers, handleClick, user, questions, history, themeActive} = this.props;
        return (
            <div className="AnswerList">
                {answers.length !== 0 && (
                    <React.Fragment>
                        <Radio.Group defaultValue={sortState} size="small">
                            <Radio.Button value="createDate" onClick={() => this.sorting('createDate')} >Последние</Radio.Button>
                            <Radio.Button value="likerList.length" onClick={() => this.sorting('likerList.length')}>Популярные</Radio.Button>
                        </Radio.Group>
                        {answers.map(answer => {
                            return <Answer
                                key={answer.id}
                                answer={answer}
                                questionId={answer.tags}
                                questions={questions}
                                name={answer.name}
                                handleClick={handleClick}
                                user={user}
                                history={history}
                                themeActive={themeActive}
                                />;
                            })
                        }
                    </React.Fragment>
                )}
            </div>
        );
    }
}

AnswerList.propTypes = {
    answers:PropTypes.array.isRequired,
};