import React from 'react';

const Tab = (props) => {
    const {items, handleClick, classCss} = props;

    return (
        <ul className={classCss}>
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
