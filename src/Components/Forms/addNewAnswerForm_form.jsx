import React from 'react';
import {database} from '../../model/firebase';
import {Input, Button, Cascader} from 'antd';
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
        const { TextArea } = Input;

        const createNestedArray = (array1, array2) => {
            return array1
                .map(element1 => {return {value: element1.subjectName, label: element1.subjectName, children: array2
                    .filter((element2) => {
                        if (element2.subjects.includes(element1.key)) return {value: element2.test, label: element2.test};
                        return null;

                    })
                };
            })
        };

        const array2 =[
            {test: 'Theme name 1', subjects:['-Lb9fI5xXlQWJfDilNru']},
            {test: 'Theme name 2', subjects:['-Lb9fI5xXlQWJfDilNru']},
            {test: 'Theme name 3', subjects:['-tytrxXlQWJfDilNru','-fdsQWJfDilNtu']}
        ];

        const options = createNestedArray(subjectsList, array2);

        return (
            <div >
                <form onSubmit={this.handleSubmit}>
                    {this.renderCascader('theme', 'Предмет / Тема', subjectActive, themeActive, options)}
                    {this.renderInput('password', 'Заголовок', 'text','Ответы с заголовками читают на 34% чаще')}
                </form>

                <TextArea
                    label="Ответ"
                    placeholder="Пиши то, что тебе было самому интересно прочитать. Пиши кратко и просто, вставь картинки, придумывай мемы, снимай видео и фото — просто вставь ссылку на ютуб. Не забудь ссылки на статьи, которые ты использовал."
                    rows={5} />

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