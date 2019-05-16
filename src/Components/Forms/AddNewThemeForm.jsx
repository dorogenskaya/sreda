import React, {Component} from 'react';
import {Form, Input, Icon, Button, Select} from 'antd';
import DynamicInputs from './Input/DynamicInputs';
import {database} from '../../model/firebase';
import {Link} from 'react-router-dom';

let id = 0;

class AddNewTheme extends Component {
    constructor(props) {
        super(props);

        this.state = {
            validateThemeStatus: 'success',
            validateThemeMessage: null,
            validateSubjectsStatus: 'success',
            validateSubjectsMessage: null,
            subjectsList: null,
            themesList: null
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

            if (!this.state.themesList) {
                this.setState({
                    themesList: arrayThemes
                })
            } else {
                this.setState({
                    themesList: arrayThemes,
                    validateThemeStatus: 'success',
                    validateThemeMessage: `Тема "${arrayThemes[arrayThemes.length - 1]}" была успешно добавлен`
                })
            }

            this.setState({
                themesList: arrayThemes
            })
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let data = this.normalizeData(values);
            if (!err && data) {
                database.ref('themes').push().set(data);
            }
        });
    };

    normalizeData(values) {
        let isValid = true,
            questionsArray,
            data = {};
        if (!values.themeName) {
            isValid = false;
            this.setState({
                validateThemeStatus: 'error',
                validateThemeMessage: 'Пожайлуста, добавьте название темы'
            })
        } else {
            data.themeName = values.themeName;
            this.setState({
                validateThemeStatus: 'success',
                validateThemeMessage: null
            })
        }

        if (!values.subjectsList || !values.subjectsList.length) {
            isValid = false;
            this.setState({
                validateSubjectsStatus: 'error',
                validateSubjectsMessage: 'Пожайлуста, выберите предмет(ы)'
            })
        } else {
            data.subjectsList = values.subjectsList;
            this.setState({
                validateSubjectsStatus: 'success',
                validateSubjectsMessage: null,
            })
        }

        if (values.themeDescription) {
            data.themeDescription = values.themeDescription;
        }

        if (values.questions) {
            questionsArray = values.questions.filter((question) => !!question);
            if (questionsArray.length) {
                data.questionsList = questionsArray.map((question) => {
                    return {question: question}
                })
            }
        }

        return isValid ? data : isValid;
    }

    render() {
        const {getFieldDecorator, getFieldValue} = this.props.form;
        getFieldDecorator('keys', {initialValue: []});
        const {Option} = Select;
        let children = [];
        if (this.state.subjectsList) {
            this.state.subjectsList.map((item, i) => children.push(<Option key={i}
                                                                           value={item.key}>{item.subjectName}</Option>));
        }

        return (
            <div className="wrapper-block">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item
                        label="Название темы"
                        required
                        validateStatus={this.state.validateThemeStatus}
                        help={this.state.validateThemeMessage}>
                        {getFieldDecorator('themeName', {
                            rules: [{required: true}],
                        })(
                            <Input name="themeName"
                                   placeholder="Добавить новую тему"/>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="Описание темы">
                        {getFieldDecorator('themeDescription', {})(
                            <Input name="themeDescription" placeholder="Добавить описание темы"/>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="Выберите предмет(ы)"
                        required
                        validateStatus={this.state.validateSubjectsStatus}
                        help={this.state.validateSubjectsMessage}>
                        {getFieldDecorator('subjectsList', {
                            rules: [{required: true}],
                        })(
                            <Select
                                mode={'tags'}
                                placeholder={'Выберите предмет'}
                                name={'subjectsList'}
                                style={{width: '100%'}}
                                autoClearSearchValue={true}
                                allowClear={true}
                            >
                                {children}
                            </Select>
                        )}
                    </Form.Item>
                    <DynamicInputs
                        input={{
                            label: 'Добавить новый вопрос в тему',
                            name: 'questions',
                            validateTrigger: ['onChange', 'onBlur'],
                            rules: [{
                                required: true,
                                whitespace: true,
                                message: "Пожайлуста, заполните или удалите поле"
                            }],
                            placeholder: 'Введите, пожайлуста вопрос',
                            style: {width: '60%', marginRight: 8}
                        }}
                        button={{
                            label: 'Добавить вопрос в тему',
                            type: 'dashed',
                            style: {width: '60%'},
                            icon: {
                                type: 'plus'
                            }
                        }}
                        form={this.props.form}
                    />
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Добавить тему</Button>
                    </Form.Item>
                </Form>
                <div className="back-link">
                    <Link className="nav-link" to="/admin">Вернуться назад</Link>
                </div>
            </div>
        );
    }
}

const AddNewThemeForm = Form.create({name: 'add_new_theme'})(AddNewTheme);
export default AddNewThemeForm;