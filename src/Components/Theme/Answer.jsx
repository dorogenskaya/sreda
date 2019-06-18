import React from 'react';
import './Answer.css';
import PropTypes from 'prop-types';
import AnswerTag from './AnswerTag';
import AnswerActions from './AnswerActions';

class Answer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            answer: this.props.answer,
        }
    }

    handleLike = answer => {
        let {answer: answerClone}  = this.state;
        const {user, history} = this.props;
        if(user){
            console.log(user, 'user in answer');
            const index = answer.likerList.indexOf(user.name);
            answerClone.liked = !answer.liked;
            answer.liked ? answer.likerList.push(user.name) : answer.likerList.splice(index,1);
            return this.setState({ answer });
        }
        return history.push('/login');
    };

    render() {
        const {handleClick, questionId, name, answer, questions,user } = this.props;

        return (
            <div className="Answer">
                    <div className="Answer__info">
                        <h2>{name}</h2>
                        <ul className="Answer__tags">
                            {/*Вопросы:*/}
                            {questions
                                .filter((question) => questionId.includes(question.id ))
                                .map(tag =>
                                    <AnswerTag
                                        key={tag.id}
                                        onClick={() => handleClick(tag.id)}
                                        value={tag.name}
                                    />
                                )
                            }
                        </ul>
                        <p>{answer.description}</p>

                    </div>
                    {/*<div className="Answer__profile">*/}
                        {/*<img src="" alt=""/>*/}
                        {/*<h4>{answer.creator}</h4>*/}
                    {/*</div>*/}
                    <AnswerActions
                        handleLike={() => this.handleLike(this.state.answer)}
                        answer={answer}
                    />
                <div className="Answer__divider">
                </div>
            </div>
        );
    }
}

Answer.propTypes = {
    questionId: PropTypes.array.isRequired,
    name:PropTypes.string.isRequired,
    answer:PropTypes.object.isRequired,
};

export default Answer;