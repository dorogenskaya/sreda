import React from 'react';
import './CoinCount.css';
// import PropTypes from 'prop-types';

export default class CoinCount extends React.Component {
    render() {
        const coinCount = this.props.coinCount;
        return (
            <div>
                <span>{`${coinCount} coins`}</span>
                <ul>
                    {this.props.likersList.map(nameUser => <li key ={nameUser}>{nameUser}</li>)}
                </ul>
            </div>
        )
    }
}