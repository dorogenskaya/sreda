import React from 'react';

export default class CoinCount extends React.Component {
    render() {
        const {likerList} =  this.props;
        return (
            <div className="">
                <span>{`${likerList.length}coins`}</span>
                <ul>
                    {likerList.map(nameUser => <li key ={nameUser}>{nameUser}</li>)}
                </ul>
            </div>
        )
    }
}