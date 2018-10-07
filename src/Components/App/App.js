import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import AnswerList from "../AnswerList/AnswerList";
import QuestionList from "../QuestionList/QuestionList";

const answerS = [
    {name: 'Pizzeria',
    description:"fdfsfdfsfdsfdsfdsfdssdffs",
    videoSrc: 'https://s3.amazonaws.com/codecademy-content/programs/react/ravenous/pizza.jpg',
    creator: 'Lena',
    rating: 4,
    coinCount: 0,
    id: 12,
    tags:['1']},

    {name: 'Otto Pizzeria',
    description:"fdfssdffs",
    videoSrc: 'https://s3.amazonaws.com/codecademy-content/programs/react/ravenous/pizza.jpg',
    creator: 'Lena',
    rating: 4,
    id: 13,
    coinCount: 1380,
    tags:['2']},

    {name: 'MarginOtto Pizzeria',
    description:"куцкупцапавпа",
    videoSrc: 'https://s3.amazonaws.com/codecademy-content/programs/react/ravenous/pizza.jpg',
    creator: 'Lena',
    rating: 4,
    id: 14,
    coinCount: 10,
    tags:['3','2']}
];
const questionAll = {
    name: 'all', id: '0'
};
const questionS = [
    {name: 'Mafdf', id: '1'},
    {name: 'Margidfda', id: '2'},
    {name: 'to Pizzeria', id: '3'},
];

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            answers: answerS,
            questionActive: questionAll
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = (questionId) => {
        this.setState({
            answers: answerS.filter(({tags}) => tags.includes(questionId)),
            questionActive: questionId
        })
    };

    render() {
        return (
            <div className="App">

                {/*header*/}
                <header className="App-menu">
                    <img src={logo} className="App-logo" alt="logo"/>
                </header>

                {/*left column*/}
                <div className="App-content">
                    <div className="App-content__wrapper">
                        <div className="App-content__header">
                            <h1 className="App-theme">Theme name</h1>
                            <ul className="App-theme__types">
                                <li className="App-theme__types__items"><a href="">Subject name</a></li>
                                <li className="App-theme__types__items"><a href="">Level name</a></li>
                            </ul>
                        </div>
                        <AnswerList
                            answers={this.state.answers}
                            handleClick={this.handleClick}/>
                    </div>
                </div>

                {/*right column*/}
                <div className="App-questions">
                    <div className="App-content__wrapper">
                        <h2>Вопросы по
                            теме</h2>
                        <div>{questionAll.name}</div>
                        <QuestionList handleClick={this.handleClick} questions={questionS} questionActive={this.state.questionActive}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
