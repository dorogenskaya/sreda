import React from 'react';
import './CoinCount.css';
// import PropTypes from 'prop-types';

export default class CoinCount extends React.Component {
    render() {
        return (
            <div>
                <span>{`coins`}</span>
                <ul>
                    {/*{this.props.likerList.map(nameUser => <li key ={nameUser}>{nameUser}</li>)}*/}
                </ul>
            </div>
        )
    }
}