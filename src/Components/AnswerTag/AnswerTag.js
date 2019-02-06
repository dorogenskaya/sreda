import React from 'react';
import './AnswerTag.css';
import PropTypes from 'prop-types';

export default class AnswerTag extends React.Component{
    render(){
        return (
            <li className="Answer__tag"
                key={this.props.key}
                onClick={this.props.onClick}>
                <span href="">{this.props.value}</span>
            </li>

        )
    }
}

AnswerTag.propTypes = {
    key:PropTypes.number.isRequired,
    onClick:PropTypes.func.isRequired,
    value:PropTypes.string.isRequired,
};

