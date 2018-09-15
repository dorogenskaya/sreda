import React from 'react';
import './AnswerTag.css';
import PropTypes from 'prop-types';

export default class AnswerTag extends React.Component{
    render(){
        return (
            <li key={this.props.key}
                onClick={this.props.onClick}
                className="App-theme__types__items"
            >
                <a href="">{this.props.value}</a>
            </li>

        )
    }
}

AnswerTag.propTypes = {
    key:PropTypes.number.isRequired,
    onClick:PropTypes.func.isRequired,
    value:PropTypes.string.isRequired,
};

