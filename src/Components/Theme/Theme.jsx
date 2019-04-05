import React, {Component} from 'react';
import './Theme.css';
import AnswerList from "./AnswerList";
import ThemeHeader from "./ThemeHeader";
import QuestionList from "./QuestionList";
import Pagination from "../Pagination/pagination";
import CreateAnswer from "./createAnswer";
import {paginate} from '../../util/paginate';
import {getAnswers, getUsername} from '../../services/fakeAnswerService';
import {getQuestions} from '../../services/fakeQuestionService';
import  _ from 'lodash';

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
            sortState: 'createDate',
            visible: false
    };
        this.handleQuestionClick = this.handleQuestionClick.bind(this);
    }

    componentDidMount() {
        const questions = [...getQuestions()];
        this.setState({ answers: getAnswers(), questions });
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

    handleShowDrawer = () => {
        this.setState({
            visible: true,
        });
    }
    handleCloseDrawer = () => {
        this.setState({
            visible: false,
        });
    }

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
                    {props =>  <CreateAnswer
                        {...props}
                        visible={this.state.visible}
                        onClose={this.handleCloseDrawer}
                    />}

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