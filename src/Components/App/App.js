import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import AnswerList from "../AnswerList/AnswerList";
import QuestionList from "../QuestionList/QuestionList";

const answer = {
    name: 'MarginOtto Pizzeria',
    description:"fdfssdffs",
    videoSrc: 'https://s3.amazonaws.com/codecademy-content/programs/react/ravenous/pizza.jpg',
    creator: 'Lena',
    rating: 4,
    coinCount: 90,
};

let answerS = [answer,answer,answer,answer,answer,answer];

const question = {
    name: 'MarginOtto Pizzeria',
};

let questionS = [question, question, question, question, question, question];


class App extends Component {

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
                        <AnswerList answers={answerS}/>
                    </div>
                </div>

                {/*right column*/}
                <div className="App-questions">
                    <div className="App-content__wrapper">
                        <h2>Вопросы по
                            теме</h2>
                        <QuestionList questions={questionS}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
