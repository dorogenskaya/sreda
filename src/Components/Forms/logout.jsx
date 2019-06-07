import React, {Component} from 'react';
import firebase from '../../model/firebase';

class Logout extends Component {
    componentDidMount(){
        firebase.auth().signOut().then();
        window.location = '/';
    }
    render() {
        return (
            null
        );
    }
}

export default Logout;