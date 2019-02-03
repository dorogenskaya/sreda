import React from 'react';
import './Like.css';
import Icon from '../Icon/Icon';

export default class Like extends React.Component {
    render() {
        return (
            <div>
                <button
                    type="button"
                    className="btn no-outline btn-secondary"
                    onClick={this.props.handleLike}
                >
                <Icon />
                &nbsp;
                <span className="align-middle">Like</span>
                </button>
            </div>
        )
    }
}
