import React from 'react';
import './QuestionList.css';
import Question from '../Question/Question';
import PropTypes from 'prop-types';

class QuestionList extends React.Component {
    render() {
        const { handleReset, questions, handleClick, selectedQuestion } = this.props;
        return (
            <ol className="QuestionList">
                <button
                    className="btn"
                    onClick={handleReset}>All
                </button>

                {questions.map(({id,name}) => (
                    <Question
                        key={id}
                        handleClick={handleClick}
                        id={id}
                        name={name}
                        selectedQuestion={selectedQuestion}
                    />)
                    )
                }
            </ol>
        );
    }
}

QuestionList.propTypes = {
    questions:PropTypes.array.isRequired,
    handleClick:PropTypes.func.isRequired,
    selectedQuestion:PropTypes.object.isRequired,
};

export default QuestionList;