import React from 'react';
import './QuestionList.css';

import Question from '../Question/Question';

class QuestionList extends React.Component {

    render() {
        return (
            <ol className="QuestionList">
                {
                 //    this.props.questions.map(
                 //     question => {return <Question question = {question} />}
                 // )

                    this.props.questions.map(({id,name}) => (
                        <Question key={id} handleClick={this.props.handleClick} id={id} name={name}/>
                        )
                    )
                }
            </ol>
        );
    }
}

export default QuestionList;