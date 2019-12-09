import React, {Component} from 'react';
import RatingWidget from "./RatingWidget";
import {database} from "../../model/firebase";

class Rating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userLists: [],
            userListsAll:[]
        };
    }

    componentDidMount () {
        let object = this.props.user.coinCounter;
        let arrayNew = [], arrayAll =[];
        for(let key in object){
            if(object[key].new){
                arrayNew.push({key: key, subjectName:object[key].subjectName});
            } else {
                arrayAll.push({key: key, subjectName:object[key].subjectName});
            }
        }
        arrayNew.sort((a,b) => b.new - a.new);
        arrayAll.sort((a,b) => b.new - a.new);
        let userSubjectsKeys = arrayNew.concat(arrayAll);
        userSubjectsKeys.splice(3);
        const userLists = [];
        const userListsAll = [];

        database
            .ref('users')
            .once("value", snapshot => {
                let users = snapshot.val();
                for (let key in users){
                    let user = users[key];
                    const userList = [];

                    // add allCoins
                    userListsAll.push({
                        name: user.name,
                        picture: user.picture,
                        uid: user.uid,
                        role: user.role,
                        allCoins: user.coinCounter
                    });

                    for (let keySubject in user.coinCounter ){
                        const subject = userSubjectsKeys.find(({key}) => key === `${keySubject}`);

                        if (userSubjectsKeys.filter(element => {return element.key === keySubject})) {
                            if (userLists.length === 0) {
                                userList.push({
                                    name: user.name,
                                    picture: user.picture,
                                    uid: user.uid,
                                    role: user.role,
                                    coins: user.coinCounter[keySubject].new,
                                    allCoins: user.coinCounter[keySubject].all
                                });
                                userLists.push({subject:{subject:keySubject, subjectName:subject.subjectName }, userList:userList });
                            } else {
                                userLists.forEach(element => {
                                    if (element.subject.subject === keySubject) {
                                        element.userList.push({
                                            name: user.name,
                                            picture: user.picture,
                                            uid: user.uid,
                                            role: user.role,
                                            coins: user.coinCounter[keySubject].new,
                                            allCoins: user.coinCounter[keySubject].all
                                        });
                                    } else {
                                        userList.push({
                                            name: user.name,
                                            picture: user.picture,
                                            uid: user.uid,
                                            role: user.role,
                                            coins: user.coinCounter[keySubject].new,
                                            allCoins: user.coinCounter[keySubject].all
                                        });
                                        userLists.push({subject:{subject:keySubject, subjectName: subject.subjectName}, userList:userList });
                                    }
                            })
                    ;}
                }}
            }})
            .then(() => {this.setState({userLists, userListsAll })});
    }

    render() {
        const {userLists, userListsAll} = this.state;
        return (
            <div className="Theme">
                <div className="Theme-content">
                    {userLists.map((object, index )=>
                         <RatingWidget
                            key={index}
                            user={this.props.user}
                            subject={object.subject}
                            userList={object.userList}/>
                        )
                    }
                </div>

                <div className="Theme-questions">
                    <h1>Общий рейтинг</h1>
                    <RatingWidget
                        user={this.props.user}
                        userList={userListsAll}
                        subject={{subject:'0', subjectName:'All' }}
                    />
                </div>
            </div>
        );
    }
}

export default Rating;