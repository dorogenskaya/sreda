import React, {Component} from 'react';
import {Form, Input, Icon, Button, Select} from 'antd';
import {database} from '../../model/firebase';

let id = 0;

class AddNewTheme extends Component {
    constructor(prop) {
        super(prop);

        this.state = {
            validateThemeStatus: 'success',
            validateThemeMessage: null,
            validateSubjetsStatus: 'success',
            validateSubjectsMessage: null,
            subjectstList: null,
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
                subjectstList: arraySubjects
            })
        })

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
                    validateThemeMessage: `Тема "${arrayThemes[arrayThemes.length -1]}" была успешно добавлен`
                })
            }

            this.setState({
                themesList: arrayThemes
            })
        })
    }

    remove = (k) => {
        const {form} = this.props;
        const keys = form.getFieldValue('keys');
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }

    add = () => {
        const {form} = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);

        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let data = this.normalizeData(values);
            if (!err && data) {
                database.ref('themes').push().set(data);
            }
        });
    }

    normalizeData (values) {
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
                validateSubjetsStatus: 'error',
                validateSubjectsMessage: 'Пожайлуста, выберите предмет(ы)'
            })
        } else {
            data.subjectsList = values.subjectsList;
            this.setState({
                validateSubjetsStatus: 'success',
                validateSubjectsMessage: null,
            })
        }

        if (values.themeDescription) {
            data.themeDescription = values.themeDescription;
        }

        if (values.questions) {
            questionsArray = values.questions.filter((question)=> !!question);
            if (questionsArray.length) {
                data.guestionsList = questionsArray.map((question) => {return {question: question}})
            }
        }

        return isValid ? data : isValid;
    }

    render() {
        const {getFieldDecorator, getFieldValue} = this.props.form;
        getFieldDecorator('keys', {initialValue: []});
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => (
            <Form.Item
                label={'Добавить новый вопрос в тему'}
                key={k}
            >
                {getFieldDecorator(`questions[${k}]`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                        required: true,
                        whitespace: true,
                        message: "Пожайлуста, заполните или удалите поле",
                    }],
                })(
                    <Input placeholder="Введите, пожайлуста вопрос" style={{width: '60%', marginRight: 8}}/>
                )}
                {keys.length > 0 ? (
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        onClick={() => this.remove(k)}
                    />
                ) : null}
            </Form.Item>
        ));

        const {Option} = Select;
        let children = [];
        if (this.state.subjectstList) {
            this.state.subjectstList.map((item, i) => children.push(<Option key={i} value={item.key}>{item.subjectName}</Option>));
        }

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item
                    label="Название темы"
                    required
                    validateStatus={this.state.validateThemeStatus}
                    help={this.state.validateThemeMessage}>
                    {getFieldDecorator('themeName', {
                        rules: [{required: true}],
                    })(
                        <Input name="themeName" prefix={<Icon type="form" style={{color: 'rgba(0,0,0,.25)'}}/>}
                               placeholder="Добавить новую тему"/>
                    )}
                </Form.Item>
                <Form.Item
                    label="Описание темы">
                    {getFieldDecorator('themeDescription', {})(
                    <Input name="themeDescription" prefix={<Icon type="form" style={{color: 'rgba(0,0,0,.25)'}}/>}
                               placeholder="Добавить описание темы"/>
                    )}
                </Form.Item>
                <Form.Item
                    label="Выберите предмет(ы)"
                    required
                    validateStatus={this.state.validateSubjetsStatus}
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
                {formItems}
                <Form.Item >
                    <Button type="dashed" onClick={this.add} style={{width: '60%'}}>
                        <Icon type="plus"/> Добавить вопрос в тему
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Добавить тему</Button>
                </Form.Item>
            </Form>
        );
    }
}

const AddNewThemeForm = Form.create({name: 'add_new_theme'})(AddNewTheme);
export default AddNewThemeForm;