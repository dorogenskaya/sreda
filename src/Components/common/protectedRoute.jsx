import React from 'react';
import {Route, Redirect } from 'react-router-dom';

// pic info about auth user from separate service
export const ProtectedAuthRoute = ({user, component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render = {props => {
                if (!user)  return <Redirect to='/login'/>;
                return <Component {...props}/> ;
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