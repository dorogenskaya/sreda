import React from 'react';
import './QuestionList.css';
import { Link } from 'react-router-dom';
import Question from '../Question/Question';
import PropTypes from 'prop-types';

class QuestionList extends React.Component {
    render() {
        const { handleReset, questions, handleClick, selectedQuestion } = this.props;
        return (
            <ol className="QuestionList">
                <Link to="/theme" onClick={() => handleReset()}>All
                </Link>

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
    selectedQuestion:PropTypes.number.isRequired,
};

export default QuestionList;