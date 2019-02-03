import React from 'react';
import './AnswerActions.css';
import Like from '../Like/Like';
import CoinCount from '../CoinCount/CoinCount';

// import PropTypes from 'prop-types';

class AnswerActions extends React.Component{
    render () {
        return (
            <div className="Answer__actions">
                <Like
                    handleLike={this.props.handleLike}
                />
                <CoinCount
                />
                <button>add to favorites</button>
            </div>
        );
    }
}

export default AnswerActions;
