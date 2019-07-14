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
            answerClone.liked = !answer.liked;
            if (answer.liked) {
                answer.likerList.push(user.name);

                database.ref().child(`/answers/${themeActive}/${answer.id}/`).update({likerList: answer.likerList });
                database.ref().child(`/users/${user.uid}/answersLiked`).once("value", snapshot => {
                    const answersLiked = snapshot.val() ? snapshot.val() : [];
                    answersLiked.push(answer.id);
                    database.ref().child(`/users/${user.uid}/`).update({answersLiked:answersLiked});
                });

            } else {
                answer.likerList.splice(answer.likerList.indexOf(user.name),1);
                database.ref().child(`/answers/${themeActive}/${answer.id}/`).update({likerList: answer.likerList });
                database.ref().child(`/users/${user.uid}/answersLiked`).once("value", snapshot => {
                    let answersLiked = snapshot.val();
                    answersLiked.splice(answersLiked.indexOf(answer.id),1);
                    database.ref().child(`/users/${user.uid}/`).update({answersLiked:answersLiked});
                });
            }
            return this.setState({ answer });
        }
        return history.push('/login');
    };

    handleFavorite = (answer) => {
        let {answer: answerClone}  = this.state;
        const {user, history} = this.props;

        if(user){
            answerClone.favorite = !answer.favorite;
            if (answer.favorite) {
                database
                    .ref()
                    .child(`/users/${user.uid}/answersFavorite`)
                    .once("value", snapshot => {
                        const answersFavorite = snapshot.val() ? snapshot.val() : [];
                        answersFavorite.push(answer.id);
                        database
                            .ref()
                            .child(`/users/${user.uid}/`)
                            .update({answersFavorite:answersFavorite});
                });
            } else {
                database.ref().child(`/users/${user.uid}/answersFavorite`).once("value", snapshot => {
                    const answersFavorite = snapshot.val();
                    answersFavorite.splice(answersFavorite.indexOf(answer.id),1);
                    database.ref().child(`/users/${user.uid}/`).update({answersFavorite:answersFavorite});
                });
            }
            return this.setState({ answer });
        }
        return history.push('/login');
    };

    handleDelete = (answer) => {
        const {user, themeActive} = this.props;
        database
            .ref()
            .child(`/answers/${themeActive}/${answer.id}`)
            .remove()
            .then(() => {
                database.ref().child(`/users/${user.uid}/answersList`).once("value", snapshot => {
                    const answersList = snapshot.val();
                    answersList.splice(answersList.indexOf(answer.id),1);
                    database.ref().child(`/users/${user.uid}/`).update({answersList:answersList});
                }
                )
            });
    }

    render() {
        const {handleClick, questionId, name, answer, questions, user} = this.props;
        const {pathname} = this.props.history.location;
        console.log(answer);
        return (
            <div className="Answer">
                <div className="Answer__info">
                    {pathname.includes('profile') && (
                        <Link to={{pathname: `/themes/${answer.themeId}`}}>
                            <h4>{answer.themeName}</h4>
                        </Link>

                    )}
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
                    user={user}
                    handleFavorite={() => this.handleFavorite(this.state.answer)}
                    handleDelete={() => this.handleDelete(this.state.answer)}
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