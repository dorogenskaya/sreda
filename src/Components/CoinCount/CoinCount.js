import React from 'react';
import './CoinCount.css';
// import PropTypes from 'prop-types';

export default class CoinCount extends React.Component {
    render() {
        const {likerList} =  this.props;
        return (
            <div>
                <span>{`${likerList.length}coins`}</span>
                <ul>
                    {likerList.map(nameUser => <li key ={nameUser}>{nameUser}</li>)}
                </ul>
            </div>
        )
    }
}