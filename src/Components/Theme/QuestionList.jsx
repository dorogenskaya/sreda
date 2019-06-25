import React from 'react';
import { Link } from 'react-router-dom';
import Question from './Question';
import PropTypes from 'prop-types';
import './QuestionList.css';
import '../common/common.css';
import classNames from "classnames";

class QuestionList extends React.Component {
    render() {
        const { handleReset, questions, handleClick, selectedQuestion, themeActive } = this.props;

        let linkClass = classNames('link',{
            'link-active': !selectedQuestion,
            'link-normal': selectedQuestion
        });
        return (
            <div>
                <div className="question" style={{listStyleType: "none"}}>
                    <Link
                        className={linkClass}
                        onClick={() => handleReset()}
                        to={`/themes/${themeActive}`}
                    >Все вопросы
                    </Link>
                </div>
                <ol className="QuestionList">
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
            </div>
        );
    }
}

QuestionList.propTypes = {
    questions:PropTypes.array.isRequired,
    handleClick:PropTypes.func.isRequired,
    selectedQuestion:PropTypes.string.isRequired,
};

export default QuestionList;