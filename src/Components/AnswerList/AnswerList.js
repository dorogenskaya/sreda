import React from 'react';
import './AnswerList.css';
import PropTypes from 'prop-types';
import Answer from '../Answer/Answer';

export default class AnswerList extends React.Component {

    render() {
        return (
            <div className="AnswerList">
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