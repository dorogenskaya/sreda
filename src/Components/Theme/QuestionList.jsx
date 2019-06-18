import React from 'react';
import { Link } from 'react-router-dom';
import Question from './Question';
import PropTypes from 'prop-types';

class QuestionList extends React.Component {
    render() {
        const { handleReset, questions, handleClick, selectedQuestion, themeActive } = this.props;
        return (
            <ol className="QuestionList">
                <Link
                    onClick={() => handleReset()}
                    to={`/themes/${themeActive}`}
                >All
                </Link>
                {questions.map(({id,name}) => (
                    <Question
                        key={id}
                        handleClick={handleClick}
                        id={id}
                        name={name}
                        selectedQuestion={selectedQuestion}
                        themeActive={themeActive}
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
    selectedQuestion:PropTypes.string.isRequired,
};

export default QuestionList;