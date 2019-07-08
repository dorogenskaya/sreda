import React, {Component} from 'react';
import Pagination from "../common/pagination";
import AnswerList from "../Theme/AnswerList";
import Tab from "../common/Tab"
import {paginate} from "../../util/paginate";
import {database} from "../../model/firebase";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            answers: [],
            questions: [],
            currentPage: 1,
            pageSize: 10,
            activeTab: 'Мои'
        };
    }

    componentDidMount() {
        const {user} = this.props;
        const {activeTab} = this.state;

        const getAnswers = new Promise((resolve, reject) => {
                const data = database.ref().child(`/users/${user.uid}/answersList`).on("value", snapshot => {
                    let answersLiked = snapshot.val(),
                        answers = [];
                    resolve(answersLiked);

                });

            reject('fdjksfjlds');
        });
        getAnswers.then((data)=>{
            const answersLiked = data;
            let answers = [];
            for (let key in answersLiked) {
                answersLiked[key].map( (i) => {
                    database
                        .ref(`/answers/${key}/${i}`)
                        .on("value", snapshot => {
                            let answer = snapshot.val();
                            answers.push({
                                name: answer.title,
                                tags: answer.questionsList,
                                createDate: answer.createDate,
                                description: answer.description,
                                creator: answer.creator,
                                id: i,
                                likerList: !answer.likerList ? [] :  answer.likerList,
                                liked: answer.likerList && user ? answer.likerList.includes(user.name) : false,
                                favorite: !!(user && user.answersFavorite && user.answersFavorite.includes(i))
                            });
                            return answers;
                        });
                    }
                )
            }

            console.log(data);})
    }

    handleTab = (activeTab) => {
        console.log(this);
        const {user} = this.state;

        const myFirstPromise = new Promise((resolve, reject) => {
            this.getAnswers(user, activeTab);
            const answers = this.getAnswers(user, activeTab);
            console.log(answers);
            if (answers) resolve('good');
            reject ('bad');
        });

        myFirstPromise.then((message) => {
            console.log("Yay! " + message);
        });
    };

    handlePageClick = (currentPage) =>{
        this.setState({ currentPage });
    };


    getAnswers = (user, activeTab) => {
        if (activeTab === 'Мои') {
            database.ref().child(`/users/${user.uid}/answersList`).on("value", snapshot => {
                let answersLiked = snapshot.val(),
                    answers = [];
                for (let key in answersLiked) {
                    answersLiked[key].map( (i) => {
                        database
                            .ref(`/answers/${key}/${i}`)
                            .on("value", snapshot => {
                                let answer = snapshot.val();
                                answers.push({
                                    name: answer.title,
                                    tags: answer.questionsList,
                                    createDate: answer.createDate,
                                    description: answer.description,
                                    creator: answer.creator,
                                    id: i,
                                    likerList: !answer.likerList ? [] :  answer.likerList,
                                    liked: answer.likerList && user ? answer.likerList.includes(user.name) : false,
                                    favorite: !!(user && user.answersFavorite && user.answersFavorite.includes(i))
                                });
                                return answers;
                            }).then((answers) => {
                            console.log(answers);
                        });
                        }
                    )
                }
            });
        } else {
            return console.log("favorites");
        }
    };


    render() {
        const {answers, currentPage, pageSize, questions, sortState, activeTab, user} = this.state;

        // const answersActiveTab = this.getAnswers(activeTab, user);
        const answersPage = paginate(answers, currentPage, pageSize);
        const history = this.props.history;

        return (
            <div className="Theme">
                <div className="Theme-content">
                    <h1>Ответы</h1>
                    <Tab
                        items={['Мои', 'Избранные']}
                        handleClick={this.handleTab}
                        activeTab={activeTab}
                    />

                    <AnswerList
                        answers={answersPage}
                        history={history}
                        sortState={sortState}
                        questions={questions}
                        user = {user}
                    />

                    <Pagination
                        onChange={this.handlePageClick}
                        total={answersPage.length}
                        pageSize={pageSize}
                        current={currentPage}
                        hideOnSinglePage={true}
                    />

                </div>

                <div className="Theme-questions">
                    {/*Profile component*/}
                </div>
            </div>
        );
    }
}

export default Profile;