import React, {Component} from 'react';
import AnswerList from "./AnswerList";
import ThemeHeader from "./ThemeHeader";
import QuestionList from "./QuestionList";
import Pagination from "../common/pagination";
import {paginate} from '../../util/paginate';
import  _ from 'lodash';
import './Theme.css';
import firebase, {database} from "../../model/firebase";



class Theme extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            answers: [],
            questions:[],
            currentPage: 1,
            pageSize: 2,
            selectedQuestion: '',
            sortState: 'createDate',

            themeActive: '-LfViy9MwyKAAk1QCyJO',
            themeDescription:'',
            themeName:'',
            subject:{}
    };
        this.handleQuestionClick = this.handleQuestionClick.bind(this);
    }

    componentDidMount() {
        // const {user}= this.props;

        let user = firebase.auth().currentUser;

        if (user != null) {
            user.providerData.forEach(function (profile) {
                console.log("Sign-in provider: " + profile.providerId);
                console.log("  Provider-specific UID: " + profile.uid);
                console.log("  Name: " + profile.displayName);
                console.log("  Email: " + profile.email);
                console.log("  Photo URL: " + profile.photoURL);
            });
        }
        this.setState({user});

        const themeId = this.state.themeActive;
        database.ref('answers/' + themeId).on('value', snapshot => {
            let data = snapshot.val();
            let answers = [];

            for (let key in data){
            const answer = data[key] ;
            answers.push({
                name: answer.title,
                tags: answer.questionsList,
                createDate: answer.createDate,
                description: answer.description,
                creator: answer.creator,
                id: key,
                coinCount: !answer.coinCount ? 0 : answer.coinCount,
                likerList: !answer.likerList ? [] : answer.likerList,
                liked: !answer.liked ? false : answer.liked
            });
        }
        this.setState({answers});
        });

        database.ref('themes/' + themeId).on('value', snapshot => {
            let theme = snapshot.val();
            let questions = [];

            for(let key in theme.questionsList){
                questions.push({
                    name: theme.questionsList[key].question,
                    id: key
                })
            }

            this.setState({
                questions,
                themeName:theme.themeName,
                themeDescription:theme.themeDescription,
                subject: theme.subject
            });
        });
    }

    handleSort = (sortState) => {
        if (sortState === this.state.sortState) return null;
        this.setState({ sortState });
    };

    handlePageClick = (currentPage) =>{
        this.setState({ currentPage });
    };

    handleQuestionClick = (selectedQuestion) => {
        console.log(selectedQuestion);
        this.setState({ selectedQuestion, currentPage: 1 })
    };

    handleQuestionsReset = () => {
        this.setState({selectedQuestion: 0 });
    };

    render() {
        const {answers, selectedQuestion, currentPage, pageSize, questions, sortState, themeActive, themeName, themeDescription, subject, user } = this.state;
        const filteredAnswers = selectedQuestion
            ? answers.filter(({tags}) => tags.includes(selectedQuestion))
            : answers;

        const sorted = _.orderBy(filteredAnswers, [sortState], ['desc']);
        const answersPage = paginate(sorted, currentPage, pageSize);
        // const themeId = this.props.match.params.id;

        return (
            <div className="Theme">
                <div className="Theme-content">
                    <ThemeHeader
                        user = {user}
                        themeId={themeActive}
                        themeName={themeName}
                        themeDescription={themeDescription}
                        subject={subject}
                    />

                    <AnswerList
                        answers={answersPage}
                        handleClick={this.handleQuestionClick}
                        // username={user.name}
                        handleSort={this.handleSort}
                        sortState={sortState}
                        questions={questions}
                        user = {user}
                    />

                    <Pagination
                        onChange={this.handlePageClick}
                        total={filteredAnswers.length}
                        pageSize={pageSize}
                        current={currentPage}
                        hideOnSinglePage={true}
                    />

                </div>

                <div className="Theme-questions">
                    <div className="Theme-content__wrapper">
                        <h2>Вопросы по
                            теме</h2>

                        <QuestionList
                            handleClick={this.handleQuestionClick}
                            questions={questions}
                            selectedQuestion={selectedQuestion}
                            handleReset={this.handleQuestionsReset}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Theme;