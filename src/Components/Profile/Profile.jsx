import React, {Component} from 'react';
import Pagination from "../common/pagination";
import AnswerList from "../Theme/AnswerList";
import UserProfile from "./UserProfile";
import Tab from "../common/Tab";
import {paginate} from "../../util/paginate";
import {database} from "../../model/firebase";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userProfile: {},
            answers: [],
            questions: [],
            currentPage: 1,
            pageSize: 10,
            activeTab: 'Мои'
        };
    }


    componentDidMount() {
        database
            .ref("users/" + this.props.match.params.id)
            .once("value", snapshot => {
                const userProfile =snapshot.val();
                this.setState ({userProfile});
            })
            .then(() => {
                this.getAnswers(this.state.userProfile, this.state.activeTab);
            })
        ;
    }

    componentDidUpdate(propsUpdate) {
        if (this.props.match.params.id === propsUpdate.match.params.id) {
            return;
        }
        database
            .ref("users/" + this.props.match.params.id)
            .once("value", snapshot => {
                const userProfile =snapshot.val();
                this.setState ({userProfile});
            })
            .then(() => {
                this.getAnswers(this.state.userProfile, this.state.activeTab);
            })
        ;
    }

    handleTab = (activeTab) => {
        this.getAnswers(this.state.userProfile, activeTab);
    };


    handlePageClick = (currentPage) =>{
        this.setState({ currentPage });
    };

    getAnswers = (user, activeTab) => {
        if (activeTab === 'Мои') {
            database.ref('answers').on("value", snapshot => {
                let answersObject = snapshot.val(),
                    answers = [];
                for (let themeKey in answersObject) {
                    let theme = answersObject[themeKey];

                    for (let key in theme) {
                        let answer = theme[key];
                        if (answer.creator.creatorId === user.uid)

                        answers.push({
                            name: answer.title,
                            tags: answer.questionsList,
                            createDate: answer.createDate,
                            description: answer.description,
                            creator: answer.creator,
                            id: key,
                            likerList: !answer.likerList ? [] :  answer.likerList,
                            liked: answer.likerList && user ? answer.likerList.includes(user.name) : false,
                            favorite: !!(user && user.answersFavorite && user.answersFavorite.includes(key)),
                            themeId: themeKey,
                            themeName: answer.theme.themeName
                        });
                    }
                }
                this.setDataAnswers(answers)
            });
        } else {
            console.log(user);
            database.ref('answers').on("value", snapshot => {
                let answersObject = snapshot.val(),
                    answers = [];
                user.answersFavorite.forEach((answerId) => {
                    for (let themeKey in answersObject) {
                        let theme = answersObject[themeKey];

                        for (let key in theme) {
                            let answer = theme[key];
                            if (key === answerId)
                            answers.push({
                                name: answer.title,
                                tags: answer.questionsList,
                                createDate: answer.createDate,
                                description: answer.description,
                                creator: answer.creator,
                                id: key,
                                likerList: !answer.likerList ? [] : answer.likerList,
                                liked: answer.likerList && user ? answer.likerList.includes(user.name) : false,
                                favorite: !!(user && user.answersFavorite && user.answersFavorite.includes(key)),
                                themeId: themeKey,
                                themeName: answer.theme.themeName
                            });
                        }
                    }
                    this.setDataAnswers(answers)
                });
            });
        }
    };

    setDataAnswers (answers) {
        this.setState({answers: answers})
    }


    render() {
        console.log(this.state.userProfile, this.props.user);
        const {answers, currentPage, pageSize, questions, sortState, activeTab, userProfile} = this.state;

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
                        classCss={'tab_h2'}
                    />

                    <AnswerList
                        answers={answersPage}
                        history={history}
                        sortState={sortState}
                        questions={questions}
                        user = {this.props.user}
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
                    <UserProfile
                        user={userProfile}
                    />
                </div>
            </div>
        );
    }
}

export default Profile;