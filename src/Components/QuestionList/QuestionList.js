import React from 'react';
import './QuestionList.css';
import Question from '../Question/Question';
import PropTypes from 'prop-types';

class QuestionList extends React.Component {
    render() {
        const {handleReset} = this.props;
        return (
            <ol className="QuestionList">
                <button
                    className="btn"
                    onClick={handleReset}>All
                </button>

                {this.props.questions.map(({id,name}) => (
                    <Question
                        key={id}
                        handleClick={this.props.handleClick}
                        id={id}
                        name={name}
                        selectedQuestion={this.props.selectedQuestion}
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