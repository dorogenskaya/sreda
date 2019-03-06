import React from 'react';
import './Answer.css';
import PropTypes from 'prop-types';
import AnswerTag from '../AnswerTag/AnswerTag';
import AnswerActions from '../AnswerActions/AnswerActions';

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
        const {handleClick , key, questionId, name, answer } = this.props;

        return (
            <div className="Answer" key={key} >
                    <div className="Answer__info">
                        <h2>{name}</h2>
                        <ul className="Answer__tags">
                            Questions:
                            {questionId.map(tag =>
                                <AnswerTag
                                    key={tag}
                                    onClick={() => handleClick(tag)}
                                    value={tag}/>
                            )}
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
    key:PropTypes.number.isRequired
};

export default Answer;
