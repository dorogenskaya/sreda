import React from 'react';
import './Question.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Question extends React.Component {

    render() {
        const { id, name, handleClick, selectedQuestion } = this.props;
        let questionClass = classNames('question',{
            'question-active': selectedQuestion === id,
            'question-normal': selectedQuestion !== id,
        });

        return (
            <li>
                <span
                className={questionClass}
                onClick={() => handleClick(id)}>{name}
                </span>
            </li>
        );
    }
}

Question.propTypes = {
    id:PropTypes.string.isRequired,
    name:PropTypes.string.isRequired,
    handleClick:PropTypes.func.isRequired
};

export default Question;