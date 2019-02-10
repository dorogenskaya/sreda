import React, {Component} from 'react';
import './Theme.css';
import AnswerList from "../AnswerList/AnswerList";
import QuestionList from "../QuestionList/QuestionList";
import Pagination from "../Pagination/pagination";
import {paginate} from '../../util/paginate';
import {getAnswers, getUsername, getQuestions} from '../../services/fakeAnswerService';

let answers = getAnswers();
let username = getUsername();
let questions = getQuestions();

class Theme extends Component {
    constructor(props) {
        super(props);

        this.state = {
            answers: answers,
            currentPage: 1,
            pageSize: 2
    };
        this.handleQuestionClick = this.handleQuestionClick.bind(this);
    }

    handlePageClick = (selectedPage) =>{
        this.setState({ currentPage: selectedPage });
    };

    handleQuestionClick = (questionId) => {
        this.setState({
            answers: answers.filter(({tags}) => tags.includes(questionId)),
            questionActive: questionId
        })
    };

    render() {
        const {answers, questionActive, currentPage, pageSize} = this.state;
        const {length: count} = answers;
        const answersPage = paginate(answers, currentPage, pageSize);


        return (
            <div className="Theme">
                {/*left column*/}
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
                        handleClick={this.handleClick}
                        username={username}
                    />

                    <Pagination
                        onChange={this.handlePageClick}
                        total={count}
                        pageSize={pageSize}
                        current={currentPage}
                    />

                    {/*<Pagination*/}
                        {/*countItems={count}*/}
                        {/*currentPage={currentPage}*/}
                        {/*pageSize={pageSize}*/}
                        {/*onPage={this.handlePageClick}*/}
                    {/*/>*/}
                </div>

                {/*right column*/}
                <div className="Theme-questions">
                    <div className="Theme-content__wrapper">
                        <h2>Вопросы по
                            теме</h2>
                        <QuestionList
                            handleClick={this.handleQuestionClick}
                            questions={questions}
                            questionActive={questionActive}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Theme;

