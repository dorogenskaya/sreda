import React, {Component} from 'react';
import {Form, Input, Button} from 'antd';
import InputSelect from './Input/InputSelect';
import DynamicInputs from './Input/DynamicInputs';
import {database} from '../../model/firebase';
import {Link} from 'react-router-dom';

// let id = 0;

class AddNewTheme extends Component {
    constructor(props) {
        super(props);

        this.state = {
            subjectsList: null,
            themesList: null,
            programsArray: null,
            levels: null,
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

        database.ref('programs').once('value', (snapShot) => {
            let data = snapShot.val(),
                programsArray = [];
            for (let key in data) {
                programsArray.push({id: key, programName: data[key].programName})
            }

            programsArray = programsArray.sort((a, b) => a.programName > b.programName ? 1 : -1);

            this.setState({programsArray})
        });

        database.ref('levels').once('value', (snapShot) => {
            let levels = snapShot.val();

            this.setState({levels})
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
                        newRefList = database.ref(`themes/${newKey}/questionsList`);
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
        let
            // questionsArray,
            data = {
                themeName: values.themeName,
                subject: {
                    id: values.subject,
                    subjectName: this.getSubjectName(values.subject)
                }
            };

        if (values.themeDescription) {
            data.themeDescription = values.themeDescription;
        }

        if (values.programList) {
            data.programList = values.programList;
        }

        if (values.levelList) {
            data.levelList = values.levelList;
        }

        return data;
    }

    getSubjectName (id) {
        return this.state.subjectsList.filter(subject => subject.key === id)[0].subjectName
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

                    <InputSelect name={`programList`}
                                 label={`Выберите программу(ы)`}
                                 config={{
                                     mode: 'tags',
                                     placeholder: 'Выберите программу(ы)',
                                     style: {width: '100%'},
                                     autoClearSearchValue: true,
                                     allowClear: true,
                                     onChange: null
                                 }}
                                 form={this.props.form}
                                 data={{data: this.state.programsArray, nameKey: 'programName', valueKey: 'id'}}
                    />

                    <InputSelect name={`levelList`}
                                 label={`Выберите класс(ы)`}
                                 config={{
                                     mode: 'tags',
                                     placeholder: 'Выберите класс(ы)',
                                     style: {width: '100%'},
                                     autoClearSearchValue: true,
                                     allowClear: true,
                                     onChange: null
                                 }}
                                 form={this.props.form}
                                 data={{data: this.state.levels, nameKey: 'label', valueKey: 'id'}}
                    />

                    <InputSelect name={`subject`}
                                 label={`Выберите предмет`}
                                 rules={[{
                                     required: true,
                                     message: 'Выберите предмет'
                                 }]}
                                 config={{
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