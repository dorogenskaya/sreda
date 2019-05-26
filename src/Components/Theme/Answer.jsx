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
        const index = answer.likerList.indexOf(this.props.username);

        answerClone.liked = !answer.liked;
        answer.liked ? answer.likerList.push(this.props.username) : answer.likerList.splice(index,1);
        this.setState({ answer });
    };

    render() {
        const {handleClick, questionId, name, answer, questions } = this.props;
        return (
            <div className="Answer">
                    <div className="Answer__info">
                        <h2>{name}</h2>
                        <ul className="Answer__tags">
                            Questions:
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
                        <video src={answer.videoSrc}></video>

                    </div>
                    <div className="Answer__profile">
                        {/*Component creator*/}
                        <img src="" alt=""/>
                        <h4>{answer.creator}</h4>
                    </div>

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