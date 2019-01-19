import React from 'react';
import './Like.css';
import Icon from '../Icon/Icon';
import CoinCount from '../CoinCount/CoinCount';
// import PropTypes from 'prop-types';


export default class Like extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <button type="button" className="btn no-outline btn-secondary" onClick={this.props.toggleLike}>
                        {this.props.liked && <Icon />}
                        &nbsp;
                        <span className="align-middle">Like</span>
                    </button>
                    <CoinCount coinCount={this.props.coinCount}/>
                </div>
            </div>
        )
    }
}
