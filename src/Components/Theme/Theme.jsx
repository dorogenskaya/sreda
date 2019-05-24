import React, {Component} from 'react';
import AnswerList from "./AnswerList";
import ThemeHeader from "./ThemeHeader";
import QuestionList from "./QuestionList";
import Pagination from "../Pagination/pagination";
import {paginate} from '../../util/paginate';

import {getAnswers, getUsername} from '../../services/fakeAnswerService';
import {getQuestions} from '../../services/fakeQuestionService';

import  _ from 'lodash';
import './Theme.css';
import {database} from '../../model/firebase';

let username = getUsername();

function getAnswersDynamic(themeKey) {
    database.ref('themes/' + themeKey).once('value', snapshot => {
        let data = snapshot.val();

        console.log(data);

        //return array of answers from theme.answersList
        //key, title, tags(array of keys of questions), description, with check  - creator, coinCount,  likerList, liked

        //return theme.description and theme.themeName, subjectList

        //return questionList

        // const answer = {
        //     key: themeKey,
        //     themeName: data.themeName,
        //     questionsList: data.questionsList,
        //
        //     createDate: data.createDate,
        //     tags:[3,2],
        //     description:"куцкупцапавпа",
        //     creator: 'Lena',
        //     id: 14,
        //     coinCount: 10,
        //     likerList:['Lena Dorogenskaya', 'Jkz Gtnhjdf'],
        //     liked: true
        // };

        // let questionsList = themeActive.questionsList.map((item, i) => {
        //     return {id: i, name: item.question}
        // });
    });
}


class Theme extends Component {
    constructor(props) {
        super(props);

        this.state = {
            answers: [],
            questions:[],
            currentPage: 1,
            pageSize: 2,
            selectedQuestion: 0,
            sortState: 'createDate',
            themeActive: '-LfViy9MwyKAAk1QCyJO'
    };
        this.handleQuestionClick = this.handleQuestionClick.bind(this);
    }

    componentDidMount() {
        const questions = [...getQuestions()];
        this.setState({ answers: getAnswers(), questions });
        getAnswersDynamic(this.state.themeActive);
        console.log(this.state.themeActive);
    }

    handleSort = (sortState) => {
        if (sortState === this.state.sortState) return null;
        this.setState({ sortState });
    };

    handlePageClick = (currentPage) =>{
        this.setState({ currentPage });
    };

    handleQuestionClick = (selectedQuestion) => {
        this.setState({ selectedQuestion, currentPage: 1 })
    };

    handleQuestionsReset = () => {
        this.setState({selectedQuestion: 0 });
    };


    render() {
        const {answers, selectedQuestion, currentPage, pageSize, questions, sortState} = this.state;

        const filteredAnswers = selectedQuestion
            ? answers.filter(({tags}) => tags.includes(selectedQuestion))
            : answers;

        const sorted = _.orderBy(filteredAnswers, [sortState], ['desc']);
        const answersPage = paginate(sorted, currentPage, pageSize);
        const themeId = this.props.match.params.id;

        return (
            <div className="Theme">
                <div className="Theme-content">
                    <ThemeHeader
                        showDrawer={this.handleShowDrawer}
                        themeId={themeId}
                    />

                    <AnswerList
                        answers={answersPage}
                        handleClick={this.handleQuestionClick}
                        username={username}
                        handleSort={this.handleSort}
                        sortState={sortState}
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