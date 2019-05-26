import React, {Component} from 'react';
import AnswerList from "./AnswerList";
import ThemeHeader from "./ThemeHeader";
import QuestionList from "./QuestionList";
import Pagination from "../Pagination/pagination";
import {paginate} from '../../util/paginate';
import  _ from 'lodash';
import './Theme.css';
import {database} from "../../model/firebase";

const username = 'Lena Dorogenskaya';

class Theme extends Component {
    constructor(props) {
        super(props);

        this.state = {
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
                description: answer.questionsList,
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
        const {answers, selectedQuestion, currentPage, pageSize, questions, sortState, themeActive, themeName, themeDescription, subject } = this.state;
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
                        // showDrawer={this.handleShowDrawer}
                        themeId={themeActive}
                        themeName={themeName}
                        themeDescription={themeDescription}
                        subject={subject}
                    />

                    <AnswerList
                        answers={answersPage}
                        handleClick={this.handleQuestionClick}
                        username={username}
                        handleSort={this.handleSort}
                        sortState={sortState}
                        questions={questions}
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