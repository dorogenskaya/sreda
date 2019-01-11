import React from 'react';
import './AnswerList.css';
import PropTypes from 'prop-types';
import Answer from '../Answer/Answer';

class AnswerList extends React.Component {
    render() {
        return (
            <div className="AnswerList">
                {
                    // for each element of array answers (in APP), called answer
                    // return component Answer with props - answer
                    this.props.answers.map(answer => {
                        return <Answer
                            key={answer.id}
                            answer={answer}
                            questionId={answer.tags}
                            name={answer.name}
                            handleClick={this.props.handleClick}
                            liked={this.props.liked}
                            toggleLike={this.props.toggleLike}
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

export default AnswerList;