import React from 'react';
import './Answer.css';
import PropTypes from 'prop-types';
import AnswerTag from '../AnswerTag/AnswerTag';
import AnswerActions from '../AnswerActions/AnswerActions';


class Answer extends React.Component {
    render() {
        const handleClick = this.props.handleClick;
        const id = this.props.key;

        return (
            <div className="Answer" key={id} >
                    <div className="Answer__info">
                        <h2>{this.props.name}</h2>
                        <ul className="Answer__tags">
                            Questions:
                            {this.props.questionId.map(element =>
                                <AnswerTag
                                    key={element}
                                    onClick={() => handleClick(element)}
                                    value={element}/>
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
                        coinCount = {this.props.coinCount}
                        liked={this.props.liked}
                        toggleLike={this.props.toggleLike}
                    />
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
