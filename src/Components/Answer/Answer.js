import React from 'react';
import './Answer.css';
import PropTypes from 'prop-types';
import AnswerTag from '../AnswerTag/AnswerTag';

class Answer extends React.Component {
    render() {
        const handleClick = this.props.handleClick;
        const id = this.props.key;

        return (
            <div className="Answer" key={id} >
                    <div className="Answer__info">
                        <h2>{this.props.name}</h2>
                        <div className="Questions-tag">
                            <ul className="App-theme__types">
                                {/*component for question tag*/}
                                {this.props.questionId.map(element =>
                                    <AnswerTag key={element} onClick={() => handleClick(element)} value={element}/>
                                )}
                            </ul>
                        </div>
                        <p>{this.props.answer.description}</p>
                        <video src={this.props.answer.videoSrc}></video>
                    </div>
                    <div className="Answer__meta">
                        <h4>{this.props.answer.creator}</h4>
                        <img src="" alt=""/>
                        <span>{`${this.props.answer.coinCount} coins`}</span>
                    </div>
                    <div className="Answer__actions"></div>
                    <div className="Answer__divider"></div>

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
