import React from 'react';
import './QuestionList.css';

import Question from '../Question/Question';

class QuestionList extends React.Component {

    render() {
        return (
            <ol className="QuestionList">
                {
                    this.props.questions.map(
                        question => {return <Question question = {question}/>}
                    )
                }
            </ol>
        );
    }
}

export default QuestionList;