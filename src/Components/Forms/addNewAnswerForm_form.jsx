import React from 'react';
import {database} from '../../model/firebase';
import {Button} from 'antd';
import Form from '../common/form';
import Joi from "joi-browser";

class AddNewAnswer extends Form {
    state = {
        data: {
            theme: "",
            questionsListID: [],
            title: "",
            description: ""
        },
        subjectsList: [],
        themesList: [],
        questionsList: [],
        themeActive: this.props.themeId,
        errors: {}
    };

    schema = {
        theme: Joi.string().required().label('Theme'),
        questionsListID: Joi.string().required().label('Theme'),
        title: Joi.string().required().label('Title').max(140),
        description: Joi.string().required().label('Description'),
    };

    componentDidMount() {
        database.ref('subjects').on('value', (snapShot) => {
            let data = snapShot.val(),
                arraySubjects = [];

            for (let key in data) {
                arraySubjects.push({key: key, subjectName: data[key].subjectName})
            }

            arraySubjects = arraySubjects.sort((a, b) => a.subjectName > b.subjectName ? 1 : -1);
            this.setState({
                subjectsList: arraySubjects
            })
        });

        // take only this themes that have SubjectActive
        database.ref('themes').on('value', (snapShot) => {
            let data = snapShot.val(),
                arrayThemes = [];

            for (let key in data) {
                arrayThemes.push(data[key].themeName)
            }

            this.setState({
                themesList: arrayThemes
            })
        });


        // take questionList from the themeActive
        const themeActive = this.state.themeActive;
        database.ref('themes/'+ {themeActive}).on('value', (snapShot) => {
            let data = snapShot.val(),
                arraySubjects = [];

            for (let key in data) {
                arraySubjects.push({key: key, subjectName: data[key].subjectName})
            }

            arraySubjects = arraySubjects.sort((a, b) => a.subjectName > b.subjectName ? 1 : -1);
            this.setState({
                subjectsList: arraySubjects
            })
        });

    //    ID of the questions
    //    ID of the answer?

        // const answerID = this.props.match.params.id;
        // if (answerID === "new") return;

        //const answer = get answer from the server by answerID
        // if (!answer) return this.props.history.replace(answer);
        // map answer object to the current data object
        //this.setState({data: this.mapToViewModel(answer)});

    };

    mapToViewModel(answer){
        return{
            id: answer.id,
            theme: answer.theme,
            title: answer.title,
            questionsList: answer.questionsList,
            description: answer.description
        }
    }

    doSubmit = () => {
        // saveAnswer(this.state.data);
        this.props.history.push(this.props.previousLocation);
    }

    render() {
        const {subjectActive} = this.props;
        const { subjectsList, themesList, questionsList, themeActive} = this.state;

        return (
            <div >
                <form onSubmit={this.handleSubmit}>
                    {this.renderCascader('theme', 'fdjkfjdk', subjectActive, themeActive, themesList, subjectsList)}
                    {this.renderSelect('questions','вопросы', '', questionsList)}
                    {this.renderInput('title', 'Заголовок', 'text','Ответы с заголовками читают на 34% чаще')}
                    {this.renderTextArea('description','Ответ', 'Пиши то, что тебе было самому интересно прочитать. Пиши кратко и просто, вставь картинки, придумывай мемы, снимай видео и фото — просто вставь ссылку на ютуб. Не забудь ссылки на статьи, которые ты использовал.', 5)}
                    {this.renderButton('Добавить ответ')}
                </form>
            </div>
        );
    }
}
export default AddNewAnswer;