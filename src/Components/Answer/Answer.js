import React from 'react';
import './Answer.css';

class Answer extends React.Component {
    render() {
        return (
            <div className="Answer" key={this.props.tag} >
                    <div className="Answer__info">
                        <h2>{this.props.name}</h2>
                        <div className="Questions-tag">
                            <ul className="App-theme__types">
                                <li className="App-theme__types__items"><a href="">1</a></li>
                                <li className="App-theme__types__items"><a href="">3</a></li>
                            </ul>
                        </div>
                        <p>{this.props.answer.description}</p>
                        <video src={this.props.answer.videoSrc}></video>
                    </div>
                    <div className="Answer__meta">
                        <h4>{this.props.answer.creator}</h4>
                        <img src="" alt=""/>
                        <span>{`${this.props.answer.coinCount} coins`}</span>
                    </div>
                    <div className="Answer__actions"></div>
                    <div className="Answer__divider"></div>

            </div>
        );
    }
}

export default Answer;