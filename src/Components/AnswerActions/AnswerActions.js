import React from 'react';
import './AnswerActions.css';
import Like from '../Like/Like';

// import PropTypes from 'prop-types';

class AnswerActions extends React.Component{
    render () {
        return (
            <div className="Answer__actions">
                <Like
                    liked={this.props.liked}
                    toggleLike={this.props.toggleLike}
                    coinCount={this.props.coinCount}
                />
            </div>
        );
    }
}

export default AnswerActions;
