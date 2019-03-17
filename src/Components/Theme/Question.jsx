import React from 'react';
import './Question.css';
import { Link } from 'react-router-dom';
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
                <Link to={`/theme/question${id}`} className={questionClass}
                             onClick={() => handleClick(id)}>{name}
            </Link>
            </li>
        );
    }
}

Question.propTypes = {
    id:PropTypes.number.isRequired,
    name:PropTypes.string.isRequired,
    handleClick:PropTypes.func.isRequired
};

export default Question;