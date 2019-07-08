import React from 'react';

const Tab = (props) => {
    const {items, handleClick} = props;
    return (
        <ul className="tab_h2">
            {items.map(item =>
                (<li
                    key={item}
                    className="tab__item"
                    onClick={()=> handleClick(item)}>{item}
                </li>))}
        </ul>
    );
};

export default Tab;
