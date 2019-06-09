import React, {Component} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Main from "../Main/Main";
import NavBar from "../NavBar/NavBar";
import firebase, {database} from "../../model/firebase";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
    }

    componentDidMount() {
        this.authListener = firebase.auth().onAuthStateChanged((userLogged) => {
            database.ref('users/' + userLogged.uid).on('value', snapshot => {
                let user = snapshot.val();
                if (user)
                    console.log(user);
                    this.setState({user})
            });
        });
    }

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