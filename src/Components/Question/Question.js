import React from 'react';
import './Question.css';

class Question extends React.Component {


    // const onSelect = props.onSelect;
    render() {
        const id = this.props.id;
        const name = this.props.name;
        const handleClick = this.props.handleClick;
        return (
            <li  onClick={() => handleClick(id)} className="Question" ><a href="">{name}</a></li>
        );
    }
}

export default Question;