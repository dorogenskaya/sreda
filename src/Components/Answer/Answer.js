import React from 'react';
import './Answer.css';

const answer = {
    name: 'MarginOtto Pizzeria',
    description:"fdfssdffs",
    videoSrc: 'https://s3.amazonaws.com/codecademy-content/programs/react/ravenous/pizza.jpg',
    creator: 'Lena',
    rating: 4,
    coinCount: 90
};

class Answer extends React.Component {
    render() {
        return (
            <div className="Answer">
                    <div className="Answer__info">
                        <h2>{answer.name}</h2>
                        <div className="Questions-tag">
                            <ul className="App-theme__types">
                                <li className="App-theme__types__items"><a href="">1</a></li>
                                <li className="App-theme__types__items"><a href="">3</a></li>
                            </ul>
                        </div>
                        <p>{answer.description}</p>
                        <video src={answer.videoSrc}></video>
                    </div>
                    <div className="Answer__meta">
                        <h4>{answer.creator}</h4>
                        <img src="" alt=""/>
                        <span>{`${answer.coinCount} coins`}</span>
                    </div>
                    <div className="Answer__actions"></div>
                    <div className="Answer__divider"></div>

            </div>
        );
    }
}

export default Answer;