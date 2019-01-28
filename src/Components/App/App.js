import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import AnswerList from "../AnswerList/AnswerList";
import QuestionList from "../QuestionList/QuestionList";

const username =
    {nameUser: 'myName'
    };

const answerS = [
    {name: 'Pizzeria',
    description:"fdfsfdfsfdsfdsfdsfdssdffs",
    videoSrc: 'https://s3.amazonaws.com/codecademy-content/programs/react/ravenous/pizza.jpg',
    creator: 'Lena',
    rating: 4,
    coinCount: 0,
    id: 12,
    tags:['1'],
    likersList:['Таня Иванова', 'Оля Петрова']
    },

    {name: 'Otto Pizzeria',
    description:"fdfssdffs",
    videoSrc: 'https://s3.amazonaws.com/codecademy-content/programs/react/ravenous/pizza.jpg',
    creator: 'Lena',
    rating: 4,
    id: 13,
    coinCount: 1380,
    tags:['2'],
    likersList:['Таня Иванова', 'Оля Петрова']
    },

    {name: 'MarginOtto Pizzeria',
    tags:['3','2'],
    description:"куцкупцапавпа",
    videoSrc: 'https://s3.amazonaws.com/codecademy-content/programs/react/ravenous/pizza.jpg',
    creator: 'Lena',
    rating: 4,
    id: 14,
    coinCount: 10,
    likersList:['Nfyz Bdfyjdf', 'Jkz Gtnhjdf']
    }
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
            questionActive: questionAll,
            liked: false,
            coinCount: 10,
            likersList: ['Nfyz Bdfyjdf', 'Jkz Gtnhjdf']
    }

        this.handleClick = this.handleClick.bind(this);
        this.toggleLike = this.toggleLike.bind(this);

    }

    handleClick = (questionId) => {
        this.setState({
            answers: answerS.filter(({tags}) => tags.includes(questionId)),
            questionActive: questionId
        })
    };

    toggleLike () {
        this.setState(previousState => ({
            liked: !previousState.liked,
            coinCount: this.state.coinCount + 1,
            likersList: this.state.likersList.push(username.nameUser)
        }))
    }


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
                            handleClick={this.handleClick}
                            liked={this.state.liked}
                            toggleLike={this.toggleLike}
                            coinCount={this.state.coinCount}
                            likersList={this.state.likersList}
                        />
                    </div>
                </div>

                {/*right column*/}
                <div className="App-questions">
                    <div className="App-content__wrapper">
                        <h2>Вопросы по
                            теме</h2>
                        <div>{questionAll.name}</div>
                        <QuestionList
                            handleClick={this.handleClick}
                            questions={questionS}
                            questionActive={this.state.questionActive}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
