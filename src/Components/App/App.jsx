import React, {Component} from 'react';
import { Spin } from 'antd';
import Main from "../Main/Main";
import NavBar from "../NavBar/NavBar";
import firebase, {database} from "../../model/firebase";
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            loading: true,
        };
    }

    componentWillMount() {
        if (!this.state.user) {
            this.authListener = firebase.auth().onAuthStateChanged((userLogged) => {
                if (userLogged) {
                    database.ref('users/' + userLogged.uid).on('value', snapshot => {
                        let user = snapshot.val();
                        return this.setState({user, loading: false,});
                    });
                } else {
                    return this.setState({loading: false});
                }
            });
        }
    }
    componentWillUnmount(){
        this.authListener();
    }
    render() {
        const {user, loading} = this.state;
        if (loading === true) {
            return (
                <div style={{textAlign: "center", position: "absolute", top: "25%", left: "50%"}}>
                    <h2>Loading...</h2>
                    <Spin size="large"/>
                </div>
            )
        }

        return (
            <div className="App">
                <NavBar user={user}/>
                <Main user={user}/>
            </div>
        );
    }
}

export default App;