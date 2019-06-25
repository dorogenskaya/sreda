import React from 'react';
import Button from 'antd/lib/button';

export default function Toggle (props) {
    const {toggled, handleToggle, iconOn, iconOff} = props;
    return (
        <Button
            type={toggled ? "default"  : "primary"}
            onClick={handleToggle}
            icon={toggled? iconOn : iconOff}>
        </Button>
    )
}