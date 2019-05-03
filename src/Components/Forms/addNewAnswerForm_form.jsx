import React from 'react';
import {database} from '../../model/firebase';
import Form from '../common/form';
import Joi from "joi-browser";

class AddNewAnswer extends Form {
    state = {
        data: {
            theme: "",
            questionsList:[],
            questionsListID:[],
            title: "",
            description: ""
        },
        themeActive: "",
        questionsList: [],

        subjectsList: [],
        themesList: [],
        errors: {}
    };

    schema = {
        theme: Joi.array().required().label('theme'),
        questionsList: Joi.array().required().label('questions'),
        title: Joi.string().required().label('title').max(140),
        description: Joi.string().required().label('description'),
    };

    componentDidMount() {
        //get questionList for active theme
        const themeActive = this.props.themeId;
        const dbRefAnswer = database.ref('themes/' + themeActive).child('guestionsList');
        dbRefAnswer.on('value', snapshot => {
            let data = snapshot.val();
            let questionsList = data.map((item, i) => {
                return {key: i, name: item.question}
            });
            this.setState({questionsList, themeActive});
        });

        // if (answerID === "new") return;
        //const answer = get answer from the server by answerID
        // if (!answer) return this.props.history.replace(answer);
        // map answer object to the current data object
        //this.setState({data: this.mapToViewModel(answer)});
    };

    mapToViewModel(answer) {
        return {
            id: answer.id,
            theme: answer.theme,
            title: answer.title,
            questionsList: answer.questionsList,
            description: answer.description
        }
    }

    doSubmit = () => {
        const answer = this.state.data;
        // saveAnswer(this.state.data);
        // this.props.history.push(this.props.previousLocation);
    }

    render() {
        const {subjectActive} = this.props;
        const {subjectsList, themesList, questionsList, themeActive} = this.state;
        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmit}>
                    {this.renderCascader('theme', 'Тема', subjectActive, themeActive, themesList, subjectsList)}
                    {this.renderSelect('questionsList', 'Вопросы', '', questionsList)}
                    {this.renderInput('title', 'Заголовок ответа', 'text', 'Ответы с заголовками читают на 34% чаще')}
                    {this.renderTextArea('description', 'Ответ', 'Пиши то, что тебе было самому интересно прочитать. Пиши кратко и просто, вставь картинки, придумывай мемы, снимай видео и фото — просто вставь ссылку на ютуб. Не забудь ссылки на статьи, которые ты использовал.', 5)}
                    {this.renderButton('Добавить ответ')}
                </form>
            </React.Fragment>
        );
    }
}

export default AddNewAnswer;