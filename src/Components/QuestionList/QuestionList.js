import React from 'react';
import './QuestionList.css';
import Question from '../Question/Question';
import PropTypes from 'prop-types';

class QuestionList extends React.Component {
    render() {

        return (
            <ol className="QuestionList">
                {
                    this.props.questions.map(({id,name}) => (
                        <Question key={id} handleClick={this.props.handleClick} id={id} name={name} questionActive={this.props.questionActive}/>
                        )
                    )
                }
            </ol>
        );
    }
}

QuestionList.propTypes = {
    questions:PropTypes.array.isRequired,
    handleClick:PropTypes.func.isRequired,
    questionActive:PropTypes.number.isRequired,
};

export default QuestionList;