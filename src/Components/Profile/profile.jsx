import React, {Component} from 'react';
import Pagination from "../common/pagination";
import AnswerList from "../Theme/AnswerList";
import {paginate} from "../../util/paginate";
import {database} from "../../model/firebase";

// import {paginate} from '../../util/paginate';
// import {database} from "../../model/firebase";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            answers: [],
            questions: [],
            currentPage: 1,
            pageSize: 10,
        };
    }

    componentDidMount() {
        const {user}= this.props;
        database.ref().child(`/users/${user.uid}/answersList`).on("value", snapshot => {
            let answersLiked = snapshot.val(),
                testList = [];
            for (let key in answersLiked) {
                answersLiked[key].map( (i) => {
                        database
                            .ref(`/answers/${key}/${i}`)
                            .on("value", snapshot => {
                                return snapshot.val();
                            }
                        )
                    }
                )
            }
        });

        // find this answers in DB and take it< normalize and pass to the state
        //



        // database.ref('answers/' + themeId).on('value', snapshot => {
        //     let data = snapshot.val();
        //     let answers = [];
        //
        //     for (let key in data){
        //         const answer = data[key];
        //         answers.push({
        //             name: answer.title,
        //             tags: answer.questionsList,
        //             createDate: answer.createDate,
        //             description: answer.description,
        //             creator: answer.creator,
        //             id: key,
        //             likerList: !answer.likerList ? [] :  answer.likerList,
        //             liked: answer.likerList && user ? answer.likerList.includes(user.name) : false,
        //             favorite: !!(user && user.answersFavorite && user.answersFavorite.includes(key))
        //         });
        //
        //     }
        //     this.setState({answers, user});
        // });

    }

    handlePageClick = (currentPage) =>{
        this.setState({ currentPage });
    };

    render() {
        const {answers, currentPage, pageSize, questions, sortState, user} = this.state;
        const answersPage = paginate(answers, currentPage, pageSize);
        const history = this.props.history;

        return (
            <div className="Theme">
                <div className="Theme-content">
                    {/*Tabs cpmponent*/}

                    <AnswerList
                        answers={answersPage}
                        history={history}
                        sortState={sortState}
                        questions={questions}
                        user = {user}
                    />

                    <Pagination
                        onChange={this.handlePageClick}
                        total={answers.length}
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