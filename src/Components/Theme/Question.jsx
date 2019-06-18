import React from 'react';
import './Question.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import '../common/common.css';

class Question extends React.Component {
    render() {
        const { id, name, handleClick, selectedQuestion, themeActive } = this.props;
        let linkClass = classNames('question',{
            'link-active': selectedQuestion === id,
            'link-normal': selectedQuestion !== id,
        });

        return (
            <li className="question">
                <Link to={`/themes/${themeActive}/question${id}`}
                      className={linkClass}
                      onClick={() => handleClick(id)}>{name}
                </Link>
            </li>
        );
    }
}

Question.propTypes = {
    id:PropTypes.string.isRequired,
    name:PropTypes.string.isRequired,
    handleClick:PropTypes.func.isRequired
};

export default Question;