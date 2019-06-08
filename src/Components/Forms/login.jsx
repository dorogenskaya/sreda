import React, {Component} from 'react';
import {Button,Form} from 'antd';
import firebase, {database, googleProvider} from '../../model/firebase';

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
        firebase.auth().signInWithPopup(googleProvider).then((result)=> {
            let token = result.credential.accessToken;
            let user = result.user;
            console.log(result, user.uid );
            this.setState({user});

            // check if the user exist in DB if not => create user
            database.ref('users/' + user.uid).once('value', snapshot => {
                if (!snapshot.val()){
                    const userData = {
                        uid: user.uid,
                        createDate: Date.now(),
                        picture: user.photoURL,
                        name: user.displayName,
                        email: user.email,
                        role: 4
                    }
                    database.ref('users/').child(user.uid).set(userData);
                    console.log('there is no any account');
                    window.location = '/';
                } else {
                    console.log('existing account');
                    window.location = '/';
                    return null;
                }
            })
        }).catch((error)=> {
            error ? this.setState({error}) : {};
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