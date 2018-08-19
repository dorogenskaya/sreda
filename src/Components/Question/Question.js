import React from 'react';
import './Question.css';

class Question extends React.Component {
    render() {
        return (
            <div>
            <li className="Question"><a href="">{this.props.question.name}</a></li>
            </div>
        );
    }
}

export default Question;