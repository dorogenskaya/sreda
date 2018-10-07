import React from 'react';
import './Question.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Question extends React.Component {

    render() {
        const id = this.props.id;
        const name = this.props.name;
        const handleClick = this.props.handleClick;
        const questionActive = this.props.questionActive;


        // const questionClass = classNames({
        //     questionActive === id ? 'tag-active' : 'tag-normal'});

        var questionClass = classNames('question',{
            'question-active': questionActive === id,
            'question-normal': questionActive !== id,

        });

        return (
            <li className={questionClass} onClick={() => handleClick(id)}
            >
                <a href=""
                className={questionClass}
            >{name}</a></li>
        );
    }
}

Question.propTypes = {
    id:PropTypes.string.isRequired,
    name:PropTypes.string.isRequired,
    handleClick:PropTypes.func.isRequired
};

export default Question;