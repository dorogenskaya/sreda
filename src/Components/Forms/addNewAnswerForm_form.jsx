import React from 'react';
import {database} from '../../model/firebase';
import {Button} from 'antd';
import Form from '../common/form';
import Joi from "joi-browser";

class AddNewAnswer extends Form {
    state = {
        subjectsList: [],
        themesList: [],
        questionsList: [],

        data: {theme: "", title: "", description: ""},
        errors: {}
    };

    schema = {
        theme: Joi.object().required().label('Theme'),
        title: Joi.string().required().label('Theme').max(140),
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
    };

    handleSubmit = () => {
        //call to server
        console.log('Submitted');
    };

    handleSubmit = (e) => {
        console.log(e);
    };


    render() {
        const {id: themeActive, subjectActive} = this.props;
        const { subjectsList, themesList } = this.state;

        return (
            <div >
                <form onSubmit={this.handleSubmit}>
                    {this.renderCascader('theme', 'fdjkfjdk', subjectActive, themeActive, themesList, subjectsList)}
                    {this.renderInput('title', 'Заголовок', 'text','Ответы с заголовками читают на 34% чаще')}
                    {this.renderTextArea('Ответ', 'Пиши то, что тебе было самому интересно прочитать. Пиши кратко и просто, вставь картинки, придумывай мемы, снимай видео и фото — просто вставь ссылку на ютуб. Не забудь ссылки на статьи, которые ты использовал.', 5)}
                </form>

                <Button
                    onClick={() => {this.props.history.push(this.props.previousLocation)}}
                    type="primary"
                    htmlType="submit">Добавить ответ
                </Button>
            </div>
        );
    }
}
export default AddNewAnswer;