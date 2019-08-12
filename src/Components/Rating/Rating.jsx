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
            '-LfViy9MwyKAAk1QCyJO',
            '-Lb9fI5xXlQWJfDilNru',
            '-LeGgXVgvvOlaonvEQCc'
        ];
        const userLists = [];
        database
            .ref('users')
            .once("value", snapshot => {
                let users = snapshot.val();
                for (let subject of userSubjectsKeys){
                    console.log(subject, 'subject');
                    for (let key in users){
                        let user = users[key];
                        /*** @param {{coinCounter:string}} user*/
                        if(!user.coinCounter || !user.coinCounter[subject]){

                        } else {
                            const userList = [];
                            userList.push({
                                name: user.name,
                                picture: user.picture,
                                uid: user.picture,
                                role: user.role,
                                coins: user.coinCounter[subject].new,
                                allCoins: user.coinCounter[subject].all
                            });
                            userLists.push({subject:subject, userList:userList });
                        }
                    };

                }
            })
            .then(() => {this.setState({userLists})});
    }

    render() {
        const {userLists} = this.state;
        return (
            <div className="Theme">
                <div className="Theme-content">
                    {userLists.map(object =>
                         <RatingWidget
                            key={object.subject}
                            user={this.props.user}
                            subject={object.subject}
                            userList={object.userList}/>
                        )
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