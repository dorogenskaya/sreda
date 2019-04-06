import React, {Component} from 'react';
import {Drawer} from 'antd';


export default function CreateAnswer({match: {params: { id }}, history, location}) {
    return (
        <Drawer
            onClose={() => {
                history.push(location.pathname.replace(/create-answer.*$/i, ''));
            }}
            visible

        >
        <h1>test {id}</h1>
    </Drawer>
    );
}