import React, {Component} from 'react';
import {Form, Input, Icon, Button, Select, Checkbox} from 'antd';
import InputSelect from './Input/InputSelect';
import DynamicInputs from './Input/DynamicInputs';
import {database} from '../../model/firebase';
import {Link} from 'react-router-dom';

class EditTheme extends Component {
    constructor(props) {
        super(props);

        this.state = {
            programList: null,
            subjectsList: null,
            themesSource: null,
            themesList: null,
            levelList: null,
            questionsList: [],
            submitButtonLabel: 'Сохранить тему'
        }
    }

    componentDidMount() {
        database.ref('themes').once('value', (snapShot) => {
            let themesSource = snapShot.val(),
                themesList = [];

            for (let key in themesSource) {
                themesList.push({id: key, themeName: themesSource[key].themeName})
            }

            themesList = themesList.sort((a, b) => a.themeName > b.themeName ? 1 : -1);

            this.setState({themesList, themesSource})
        });

        database.ref('programs').once('value', (snapShot) => {
            let data = snapShot.val(),
                programList = [];

            for (let key in data) {
                programList.push({id: key, programName: data[key].programName})
            }

            programList = programList.sort((a, b) => a.programName > b.programName ? 1 : -1);
            this.setState({programList})
        });

        database.ref('levels').once('value', (snapShot) => {
            let levelList = snapShot.val();
            this.setState({levelList})
        });

        database.ref('subjects').once('value', (snapShot) => {
            let data = snapShot.val(),
                subjectsList = [];

            for (let key in data) {
                subjectsList.push({id: key, subjectName: data[key].subjectName})
            }

            subjectsList = subjectsList.sort((a, b) => a.subjectName > b.subjectName ? 1 : -1);
            this.setState({subjectsList})
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const id = values.theme;
            if (!err) {
                if (values.removeTheme) {
                    database.ref(`themes/${id}`).remove().then(()=> {console.log('removed')}).catch((error)=>{console.warm(error)});
                } else {
                    database.ref(`themes/${id}`).set(this.getPreparedData(values, id));
                }
            }
        });
    };

    handleChangeTheme = (id) => {
        database.ref(`themes/${id}`).once('value', (snapShot) => {
            let data = snapShot.val(),
                questionsList = [],
                {programList, levelList, subjectsList} = data;

            if (data.questionsList) {
                data.questionsList.forEach((item, i) => {
                    questionsList.push({label: item.question, value: i});
                })
                questionsList = questionsList.sort((a, b) => a.label > b.label ? 1 : -1)
            }

            this.props.form.setFieldsValue({programList, levelList, subjectsList})

            this.setState({questionsList});
        });
    }

    getPreparedData(values, id) {
        let data = {},
            removeList,
            questionsList = this.state.questionsList.map((item) => {return {question: item.label}});

        if (values.removeQuestions) {
            removeList = values.removeQuestions.sort((a, b) => a < b ? 1 : -1);
            removeList.forEach((item) => {
                questionsList.splice(item, 1);
            })
            data.questionsList = questionsList;

        }

        if (questionsList || values.questionsList) {
            if (!data.questionsList) {
                data.questionsList = questionsList || [];
            }

            if (values.questionsList) {
                values.questionsList.forEach((newItem) => {
                    let oldItems = data.questionsList.filter((oldItem) => oldItem.question === newItem);
                    if (!oldItems.length) {
                        data.questionsList.push({question: newItem});
                    }
                })
            }
        }

        for (let key in values) {
            if (key === 'theme' || key === 'keys' || key === 'questionsList' || key === 'removeQuestions') {
                continue;
            }

            if (values[key]) {
                data[key] = values[key];
            }
        }

        data.themeName = this.state.themesSource[id].themeName;
        return data;
    }

    onRemoveMode = (e) => {
        this.setState({
            submitButtonLabel: e.target.checked ? 'Удалить тему' :  'Сохранить тему'
        })
    }


    render() {
        const CheckboxGroup = Checkbox.Group;
        const {getFieldDecorator} = this.props.form;

        const checkboxGroup = <div className={'wrapper-remove'}>
            <h3 className={'title'}>Выберите вопросы для удаления</h3>
            <Form.Item>
                {getFieldDecorator('removeQuestions', {})(
                    <CheckboxGroup options={this.state.questionsList}/>
                )}
            </Form.Item>
        </div>;
        const removeBlock = this.state.questionsList.length ? checkboxGroup : '';

        return (
            <div className="wrapper-block">
                <Form onSubmit={this.handleSubmit}>
                    <InputSelect name={`theme`}
                                 label={`Выберите тему`}
                                 rules={[{
                                     required: true,
                                     message: 'Выберите редактируюемую тему'
                                 }]}
                                 config={{
                                     placeholder: 'Выберите тему',
                                     style: {width: '100%'},
                                     autoClearSearchValue: true,
                                     allowClear: true,
                                     onChange: this.handleChangeTheme
                                 }}
                                 form={this.props.form}
                                 data={{data: this.state.themesList, nameKey: 'themeName', valueKey: 'id'}}
                    />

                    <InputSelect name={`programList`}
                                 label={`Выберите программу`}
                                 rules={[]}
                                 config={{
                                     mode: 'tags',
                                     placeholder: 'Выберите программу',
                                     style: {width: '100%'},
                                     autoClearSearchValue: true,
                                     allowClear: true,
                                     onChange: null
                                 }}
                                 form={this.props.form}
                                 data={{data: this.state.programList, nameKey: 'programName', valueKey: 'id'}}
                    />

                    <InputSelect name={`levelList`}
                                 label={`Выберите класс`}
                                 rules={[]}
                                 config={{
                                     mode: 'tags',
                                     placeholder: 'Выберите класс',
                                     style: {width: '100%'},
                                     autoClearSearchValue: true,
                                     allowClear: true,
                                     onChange: null
                                 }}
                                 form={this.props.form}
                                 data={{data: this.state.levelList, nameKey: 'label', valueKey: 'id'}}
                    />

                    <InputSelect name={`subjectsList`}
                                 label={`Выберите предмет(ы)`}
                                 rules={[]}
                                 config={{
                                     mode: 'tags',
                                     placeholder: 'Выберите предмет(ы)',
                                     style: {width: '100%'},
                                     autoClearSearchValue: true,
                                     allowClear: true,
                                     onChange: null
                                 }}
                                 form={this.props.form}
                                 data={{data: this.state.subjectsList, nameKey: 'subjectName', valueKey: 'id'}}
                    />

                    {removeBlock}

                    <DynamicInputs
                        input={{
                            label: 'Добавить новый вопрос в тему',
                            name: 'questionsList',
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
                        {getFieldDecorator('removeTheme', {})(
                            <Checkbox onChange={this.onRemoveMode}>Удалить тему</Checkbox>
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">{this.state.submitButtonLabel}</Button>
                    </Form.Item>
                </Form>
                <div className="back-link">
                    <Link className="nav-link" to="/admin">Вернуться назад</Link>
                </div>
            </div>
        );
    }
}

const EditThemeForm = Form.create({name: 'edit_theme'})(EditTheme);
export default EditThemeForm;