import React from 'react';
import './Question.css';

const question = {
    name: 'MarginOtto Pizzeria',
};

class Question extends React.Component {
    render() {
        return (
            <div>
            <li className="Question"><a href="">{question.name}</a></li>
            </div>
        );
    }
}

export default Question;