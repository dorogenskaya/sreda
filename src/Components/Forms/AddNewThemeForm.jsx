import React, {Component} from 'react';
import {Form, Input, Icon, Button, Select} from 'antd';
import InputSelect from './Input/InputSelect';
import DynamicInputs from './Input/DynamicInputs';
import {database} from '../../model/firebase';
import {Link} from 'react-router-dom';

let id = 0;

class AddNewTheme extends Component {
    constructor(props) {
        super(props);

        this.state = {
            subjectsList: null,
            themesList: null,
            successMessage: ''
        }

        this.clearSuccessState = this.clearSuccessState.bind(this)
    }

    componentDidMount() {
        database.ref('subjects').once('value', (snapShot) => {
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
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let data = this.normalizeData(values),
                    newKey = database.ref('theme').push().key,
                    newRefList;

                database.ref(`themes/${newKey}`).set(data).then(()=>{
                    if (values.questions) {
                        newRefList = newRefList = database.ref(`themes/${newKey}/questionsList`);
                        values.questions.forEach(item => {
                            newRefList.push({question: item});
                        })
                    }
                    this.setState({
                        successMessage: 'Новая тема успешно добавлена'
                    })
                });
            }
        });
    };


    normalizeData (values) {
        let questionsArray,
            data = {
                themeName: values.themeName,
                subjectsList: values.subjectsList
            };

        if (values.themeDescription) {
            data.themeDescription = values.themeDescription;
        }

        return data;
    }

    clearSuccessState () {
        this.setState({
            successMessage: ''
        })
    }
    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <div className="wrapper-block">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item
                        label="Название темы"
                        required
                        validateStatus={this.state.validateThemeStatus}
                        help={this.state.validateThemeMessage}>
                        {getFieldDecorator('themeName', {
                            rules: [{required: true, message: 'Заполнита, пожайлуста, поле'}]
                        })(
                            <Input name="themeName" placeholder="Добавить новую тему" onFocus={this.clearSuccessState}/>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="Описание темы">
                        {getFieldDecorator('themeDescription', {})(
                            <Input name="themeDescription" placeholder="Добавить описание темы"/>
                        )}
                    </Form.Item>

                    <InputSelect name={`subjectsList`}
                                 label={`Выберите предмет(ы)`}
                                 rules={[{
                                     required: true,
                                     message: 'Выберите предмет'
                                 }]}
                                 config={{
                                     mode: 'tags',
                                     placeholder: 'Выберите предмет',
                                     style: {width: '100%'},
                                     autoClearSearchValue: true,
                                     allowClear: true,
                                     onChange: null
                                 }}
                                 form={this.props.form}
                                 data={{data: this.state.subjectsList, nameKey: 'subjectName', valueKey: 'key'}}
                    />

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
                    <div className="success-message">{this.state.successMessage}</div>
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