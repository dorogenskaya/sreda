import React from 'react';
import './AnswerTag.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class AnswerTag extends React.Component{
    render(){
        const {onClick, value } = this.props;
        return (
            <li className="Answer__tag" key={value}>
                <Link to={`/theme/question${value}`} onClick={() => onClick(value)}>
                    {value}</Link>
            </li>
        )
    }
}

AnswerTag.propTypes = {
    onClick:PropTypes.func.isRequired,
    value:PropTypes.number.isRequired,
};
