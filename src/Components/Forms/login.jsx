import React, {Component} from 'react';
import {Button,Form} from 'antd';
import firebase, {googleProvider} from '../../model/firebase';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            error: {}
        };

    }

    handleSubmit = () => {
        let self = this;
        console.log(this, 'this');
        firebase.auth().signInWithPopup(googleProvider).then((result)=> {
            var token = result.credential.accessToken;
            var user = result.user;

            console.log(token, user, self);
            this.setState({token, user});
            window.location = '/';

        }).catch((error)=> {
            error ? this.setState({error}) : {};
            console.log(error);
        });
    };

    render() {
        const {error} = this.state;
        return (
            <div style={{margin: '32px'}}>
                {error && (
                    <React.Fragment>
                        <h2> {error.code}</h2>
                        <h2> {error.message}</h2>
                    </React.Fragment>
                )}
                <h1> Login </h1>
                <Form >
                    <Form.Item>
                        <Button
                            onClick={this.handleSubmit}
                            type="primary"
                            htmlType="submit"
                        >Login with Google
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        );
    }
}

export default Login;