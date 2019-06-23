import React from 'react';
import Toggle from './Toggle';
import CoinCount from './CoinCount';

class AnswerActions extends React.Component{
    render () {
        return (
            <div className="Answer__actions" >
                <Toggle
                    className="Answer__action"
                    handleToggle={this.props.handleLike}
                    toggled={this.props.answer.liked}
                    iconOn = "like"
                    iconOff= "like"
                />
                <CoinCount
                    className="Answer__action"
                    likerList={this.props.answer.likerList}
                />
                <Toggle
                    className="Answer__action"
                    handleToggle={this.props.handleFavorite}
                    toggled= {this.props.answer.favorite}
                    iconOn = "star"
                    iconOff= "star"
                />
            </div>
        );
    }
}

export default AnswerActions;