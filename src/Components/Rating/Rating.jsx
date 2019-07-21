import React, {Component} from 'react';
import RatingWidget from "./RatingWidget";
import {database} from "../../model/firebase";

class Rating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userLists: []
        };
    }
    componentDidMount () {
        // take userSubjectsKeys from coincounts new
        // left max 4 with the biggest number
        const userSubjectsKeys = [
            '-Lb9fI5xXlQWJfDilNru',
            '-LeGgXVgvvOlaonvEQCc'
        ];
        const userLists = [];
        const userList = [];

        for (let subject of userSubjectsKeys){
            database.ref('users').on("value", snapshot => {
                let users = snapshot.val();
                for (let key in users){
                    let user = users[key];
                    console.log(user, user.coinCounter );
                    if (user.coinCounter && user.coinCounter[subject])
                        userList.push({
                            name: user.name,
                            picture: user.picture,
                            uid: user.picture,
                            role: user.role,
                            coins: user.coinCounter[subject].new,
                            allCoins: user.coinCounter[subject].all
                        });

                };
            });
            userLists.push({subject:subject, userList:userList });
        }
        this.setState({userLists});
        console.log(userLists, userList);
    }


    render() {
        const {userLists} = this.state;
        return (
            <div className="Theme">
                <div className="Theme-content">
                    {userLists.map(object => {
                        console.log(object.userList);
                        return <RatingWidget
                            key={object.subject}
                            user={this.props.user}
                            subject={object.subject}
                            userList={object.userList}/>
                        })
                    }
                </div>

                <div className="Theme-questions">
                    <h1>Общий рейтинг</h1>
                    <RatingWidget/>
                </div>
            </div>
        );
    }
}

export default Rating;