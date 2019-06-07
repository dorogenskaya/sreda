import React, {Component} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Main from "../Main/Main";
import NavBar from "../NavBar/NavBar";
import firebase from "../../model/firebase";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
    }

    componentDidMount() {
        this.authListener = firebase.auth().onAuthStateChanged((userRaw) =>{
            if (userRaw) {
                const user = {
                    username: userRaw.displayName,
                    isAdmin: true
                }
                this.setState({user})
                console.log(user);

            } else {
                console.log('there is no any user');
            }
        } )
    }

    // componentWillUnmount(){
    //     this.authListener();
    // }

    render() {
        return (
            <div className="App">
                <NavBar user={this.state.user}/>
                <Main user={this.state.user}/>
            </div>
        );
    }
}

export default App;