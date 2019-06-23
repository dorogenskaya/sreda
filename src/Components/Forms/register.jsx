import React from 'react';
import {Form, Input, Button,} from 'antd';
import firebase, {googleProvider} from "../../model/firebase";

class Register extends Form {
    state ={
        user: null,
        token: null,
        errors: {}
    };

    handleSubmit = () => {
        firebase.auth().signInWithPopup(googleProvider).then(function(result) {
            var token = result.credential.accessToken;
            var user = result.user;

            this.setState({token, user});
            window.location = '/';

        }).catch(function(error) {
            this.setState({error});
        });
    };

    render() {
        return (
            <div style={{margin: '32px'}}>
                <h1> Register </h1>
                <Form >
                    <Form.Item>
                        <Button
                            onClick={this.handleSubmit}
                            type="primary"
                            htmlType="submit"
                        >Register with Google
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default Register;