import React from 'react';
import './AnswerList.css';

import Answer from '../Answer/Answer';

class AnswerList extends React.Component {
    render() {
        return (
            <div className="AnswerList">
                {
                    // for each element of array answers (in APP), called answer
                    // return component Answer with props - answer
                    this.props.answers.map(answer => {
                        return <Answer answer={answer} />
                    })
                }
            </div>
        );
    }
}

export default AnswerList;