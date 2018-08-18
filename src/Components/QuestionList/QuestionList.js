import React from 'react';
import './QuestionList.css';

import Question from '../Question/Question';

class QuestionList extends React.Component {
    render() {
        return (
            <ol className="QuestionList">
                <Question />
                <Question />
                <Question />
            </ol>

        );
    }
}

export default QuestionList;