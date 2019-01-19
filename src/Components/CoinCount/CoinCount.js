import React from 'react';
import './CoinCount.css';
// import PropTypes from 'prop-types';

export default class CoinCount extends React.Component {
    render() {
        const coinCount = this.props.coinCount;
        return (
            <span>{`${coinCount} coins`}</span>
        )
    }
}