import React from 'react';
import './AnswerList.css';

import Answer from '../Answer/Answer';

class AnswerList extends React.Component {
    render() {
        return (
            <div className="AnswerList">
                <Answer />
                <Answer />
                <Answer />
            </div>
        );
    }
}

export default AnswerList;