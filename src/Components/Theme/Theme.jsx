import React, {Component} from 'react';
import './Theme.css';
import AnswerList from "../AnswerList/AnswerList";
import QuestionList from "../QuestionList/QuestionList";
import Pagination from "../Pagination/pagination";
import {paginate} from '../../util/paginate';
import {getAnswers, getUsername} from '../../services/fakeAnswerService';
import {getQuestions} from '../../services/fakeQuestionService';

let username = getUsername();

class Theme extends Component {
    constructor(props) {
        super(props);

        this.state = {
            answers: [],
            questions:[],
            currentPage: 1,
            pageSize: 2,
            selectedQuestion: 0,
    };
        this.handleQuestionClick = this.handleQuestionClick.bind(this);
    }

    componentDidMount() {
        const questions = [...getQuestions()];
        this.setState({ answers: getAnswers(), questions });
    }

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
        const {answers, selectedQuestion, currentPage, pageSize, questions} = this.state;


        const filteredAnswers = selectedQuestion
            ? answers.filter(({tags}) => tags.includes(selectedQuestion))
            : answers;

        const answersPage = paginate(filteredAnswers, currentPage, pageSize);

        return (
            <div className="Theme">
                <div className="Theme-content">
                    <div className="Theme-content__header">
                        <h1 className="Theme-theme">Theme name</h1>
                        <ul className="Theme-theme__types">
                            <li className="Theme-theme__types__items"><a href="">Subject name</a></li>
                            <li className="Theme-theme__types__items"><a href="">Level name</a></li>
                        </ul>
                    </div>

                    <AnswerList
                        answers={answersPage}
                        handleClick={this.handleQuestionClick}
                        username={username}
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