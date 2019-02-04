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
        let answerClone = this.state.answer;
        answerClone.liked = !answer.liked;
        const index = answer.likerList.indexOf(this.props.username);
        answer.liked ? answer.likerList.push(this.props.username) : answer.likerList.splice(index,1);
        this.setState({ answer });
        console.log(this.state.answer.likerList);
    };

    render() {
        const handleClick = this.props.handleClick;
        const key = this.props.key;
        const arrayQuestion = this.props.questionId;
        console.log(arrayQuestion);

        return (
            <div className="Answer" key={key} >
                    <div className="Answer__info">
                        <h2>{this.props.name}</h2>
                        <ul className="Answer__tags">
                            Questions:
                            {arrayQuestion.map(tag =>
                                <AnswerTag
                                    key={tag}
                                    onClick={() => handleClick(tag)}
                                    value={tag}/>
                            )}
                        </ul>
                        {/*Component description with video image etc,*/}
                        <p>{this.props.answer.description}</p>
                        <video src={this.props.answer.videoSrc}></video>

                    </div>
                    <div className="Answer__profile">
                        {/*Component creator*/}
                        <img src="" alt=""/>
                        <h4>{this.props.answer.creator}</h4>
                    </div>

                    <AnswerActions
                        handleLike={() => this.handleLike(this.state.answer)}
                        answer={this.props.answer}
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
