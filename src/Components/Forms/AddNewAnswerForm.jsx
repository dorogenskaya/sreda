import React, {Component} from 'react';
import {Form, Input, Button, Cascader} from 'antd';
import {database} from '../../model/firebase';

class AddNewAnswer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            validateMessage: null,
            validateStatus: 'success',
            subjectsList: [],
            themesList: [],
            questionsList:[],
            themeActive: this.props.id,
            subjectActive:'Алгебра',
        }
    }

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

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let data = this.normalizeData(values);
            if (!err && data) {

                // need to add theme ID
            database.ref('themes/' + + 'answer/').push().set(data);
            }
        });
    };

    normalizeData (values) {
        let isValid = true,
            data = {};

        if (!values.answerName) {
            isValid = false;
            this.setState({
                validateStatus: 'error',
                validateMessage: 'Добавь описание ответа'
            })
        } else {
            data.answerName = values.answerName;
            this.setState({
                validateStatus: 'success',
                validateMessage: null
            })
        }

        if (!values.answerDescription) {
            isValid = false;
            this.setState({
                validateStatus: 'error',
                validateMessage: 'Напиши ответ'
            })
        } else {
            data.answerDescription = values.answerDescription;
            this.setState({
                validateStatus: 'success',
                validateMessage: null,
            })
        }

        if (!values.subjectsList || !values.subjectsList.length) {
            isValid = false;
            this.setState({
                validateStatus: 'error',
                validateMessage: 'Пожайлуста, выберите предмет(ы)'
            })
        } else {
            data.subjectsList = values.subjectsList;
            this.setState({
                validateStatus: 'success',
                validateMessage: null,
            })
        }

        if (!values.questionsList || !values.questionsList.length) {
            isValid = false;
            this.setState({
                validateStatus: 'error',
                validateMessage: 'Пожайлуста, выберите предмет(ы)'
            })
        } else {
            data.questionsList = values.questionsList;
            this.setState({
                validateStatus: 'success',
                validateMessage: null,
            })
        }
        return isValid ? data : isValid;
    }

    render() {
        // const {getFieldDecorator} = this.props.form;
        const {themeActive, subjectActive, subjectsList, themesList, validateStatus, validateMessage} = this.state;
        const { TextArea } = Input;

        function onChange(value) {
            console.log(value);
        }

        const array2 =[
            {test: 'Theme name 1', subjects:['-Lb9fI5xXlQWJfDilNru']},
            {test: 'Theme name 2', subjects:['-Lb9fI5xXlQWJfDilNru']},
            {test: 'Theme name 3', subjects:['-tytrxXlQWJfDilNru','-fdsQWJfDilNtu']}
        ];

        const createNestedArray = (array1, array2) => {
            return array1
                .map(element1 => {return {value: element1.subjectName, label: element1.subjectName, children: array2
                    .filter((element2) => {
                        if (!element2.subjects.includes(element1.key)) return null;
                        return(
                            {value: element2.test, label: element2.test}
                        );
                    })
                };
            })
        };

        const options = createNestedArray(subjectsList, array2);
        console.log(options);

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item
                    label="Предмет / Тема"
                    validateStatus={validateStatus}
                    help={validateMessage}
                >
                    <Cascader defaultValue={[subjectActive, themeActive]}
                              options={options}

                              onChange={onChange}
                    />
                </Form.Item>

                <Form.Item
                    label="Заголовок"
                    validateStatus={validateStatus}
                    help={validateMessage}>
                    <Input placeholder="Ответы с заголовками читают на 34% чаще" />
                </Form.Item>

                <Form.Item
                    label="Ответ"
                    validateStatus={validateStatus}
                    help={validateMessage}>
                    <TextArea
                        placeholder="Пиши то, что тебе было самому интересно прочитать. Пиши кратко и просто, вставь картинки, придумывай мемы, снимай видео и фото — просто вставь ссылку на ютуб. Не забудь ссылки на статьи, которые ты использовал."
                        rows={5} />
                </Form.Item>

                <Form.Item>

                    {/*submit without errors ? {this.props.history.push(this.props.previousLocation)} :  */}
                    <Button
                        onClick={() => {this.props.history.push(this.props.previousLocation)}}
                        type="primary"
                        htmlType="submit"
                    >
                        Добавить ответ
                    </Button>
                </Form.Item>

            </Form>


        );
    }
}

const AddNewAnswerForm = Form.create({ name: 'add_new_answer' })(AddNewAnswer);
export default AddNewAnswerForm;