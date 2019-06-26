import React from 'react';
import {Route, Redirect } from 'react-router-dom';

export const ProtectedAuthRoute = ({user, component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render = {props => {
                if (!user)  return <Redirect to='/login'/>;
                return <Component {...props} user={user}/> ;
            }}/>
    );
};

export const ProtectedRoleRoute = ({user, component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render = {props => {
                if (user.role === 0)  return <Component {...props}/>;
                return <Redirect to='/forbidden'/> ;
            }}
        />
    );
};