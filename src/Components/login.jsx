import React from 'react';
import Form from './common/form';
import Joi from "joi-browser";

class Login extends Form {
    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password'),
    }

    doSubmit = () => {
        //call to server
        console.log('Submitted');
    }

    render() {
        return (
            <div style={{margin: '32px'}}>
                <h1> Login </h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('username', 'Username')}
                    {this.renderInput('password', 'Password', 'password')}
                    {this.renderButton('Login')}
                </form>
            </div>

        );
    }
}

export default Login;