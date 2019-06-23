import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import AnswerTag from './AnswerTag';
import AnswerActions from './AnswerActions';
import {database} from "../../model/firebase";
import './Answer.css';

class Answer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            answer: this.props.answer,
        }
    }

    handleLike = answer => {
        let {answer: answerClone}  = this.state;
        const {user, history, themeActive} = this.props;

        if(user){
            const index = answer.likerList.indexOf(user.name);
            answerClone.liked = !answer.liked;
            if (answer.liked) {
                answer.likerList.push(user.name);

                database.ref().child(`/answers/${themeActive}/${answer.id}/`).update({likerList: answer.likerList });
                database.ref().child(`/users/${user.uid}/answerLikes`).once("value", snapshot => {
                    const answerLikes = snapshot.val() ? snapshot.val() : [];
                    answerLikes.push(answer.id);
                    database.ref().child(`/users/${user.uid}/`).update({answerLikes:answerLikes});
                });

            } else {
                answer.likerList.splice(index,1);
                database.ref().child(`/answers/${themeActive}/${answer.id}/`).update({likerList: answer.likerList });
                database.ref().child(`/users/${user.uid}/answerLikes`).once("value", snapshot => {
                    let answerLikes = snapshot.val();
                    answerLikes.splice(answerLikes.indexOf(answer.id),1);
                    database.ref().child(`/users/${user.uid}/`).update({answerLikes:answerLikes});
                });
            }
            return this.setState({ answer });
        }
        return history.push('/login');
    };

    render() {
        const {handleClick, questionId, name, answer, questions} = this.props;

        return (
            <div className="Answer">
                    <div className="Answer__info">
                        <h2>{name}</h2>
                        <ul className="Answer__tags">
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
                        <p className="intro">{answer.description}</p>

                    </div>
                    <div className="Answer__profile">
                        <Link to={{pathname: `/profile/${answer.creator.creatorId}`}}>
                            <img src={answer.creator.creatorPicture} alt="" style={{width: 32}}/>
                            <h4>{answer.creator.creatorName}</h4>
                        </Link>

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