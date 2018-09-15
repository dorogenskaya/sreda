import React from 'react';
import './Question.css';
import PropTypes from 'prop-types';

class Question extends React.Component {


    render() {
        const id = this.props.id;
        const name = this.props.name;
        const handleClick = this.props.handleClick;
        return (
            <li  onClick={() => handleClick(id)} className="Question" ><a href="">{name}</a></li>
        );
    }
}

Question.propTypes = {
    id:PropTypes.string.isRequired,
    name:PropTypes.string.isRequired,
    handleClick:PropTypes.func.isRequired
};
export default Question;