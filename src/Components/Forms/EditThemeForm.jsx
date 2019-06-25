import React, {Component} from 'react';
import {Form, Button, Checkbox} from 'antd';
import InputSelect from './Input/InputSelect';
import EditThemeFields from './EditThemeFields';
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
            submitButtonLabel: 'Сохранить тему',
            isRemoveMode: false
        }
    }

    componentDidMount() {
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

        this.loadThemes()
    }

    loadThemes () {
        database.ref('themes').once('value', (snapShot) => {
            let themesSource = snapShot.val(),
                themesList = [];
            for (let key in themesSource) {
                themesList.push({id: key, themeName: themesSource[key].themeName})
            }

            themesList = themesList.sort((a, b) => a.themeName > b.themeName ? 1 : -1);

            this.setState({themesList, themesSource})
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const id = values.theme;
                if (values.removeTheme) {
                    database.ref(`themes/${id}`).remove().then(()=> {
                        this.clearAllFields();
                        this.loadThemes();
                    }).catch((error)=>{console.warn(error)});
                } else {
                    database.ref(`themes/${id}`).set(this.getPreparedData(values, id)).then(()=>{
                        if (values.questionsList) {
                            values.questionsList.forEach(item => {
                                database.ref(`themes/${id}/questionsList`).push({question: item})
                            })
                        }
                        this.clearAllFields();
                        this.loadThemes();
                    });
                }
            }
        });
    };

    handleChangeTheme = (id) => {
        if (!this.state.isRemoveMode) {
            database.ref(`themes/${id}`).once('value', (snapShot) => {
                let data = snapShot.val(),
                    questionsList = [],
                    {programList, levelList, subject, themeName} = data;
                subject = subject.id;
                if (data.questionsList) {
                    for (let key in data.questionsList) {
                        questionsList.push({label: data.questionsList[key].question, value: key})
                    }
                    questionsList = questionsList.sort((a, b) => a.label > b.label ? 1 : -1)
                }

                this.props.form.setFieldsValue({themeName, programList, levelList, subject})

                this.setState({questionsList})
            })
        }
    }

    getPreparedData(values, id) {
        let data = {},
            // removeList,
            questionsList = {};

        if (this.state.questionsList.length) {
            this.state.questionsList.forEach(item => {
                if (!values.removeQuestions || !values.removeQuestions.includes(item.value)) {
                    questionsList[item.value] = {question: item.label};
                }
            })
            data.questionsList = questionsList;
        }

        for (let key in values) {
            if (key === 'subject' && values[key]) {
                data[key] = this.state.subjectsList.filter((subject) => subject.id === values[key])[0];
                continue;
            }

            if (key === 'theme' || key === 'keys' || key === 'questionsList' || key === 'removeQuestions') {
                continue;
            }

            if (values[key]) {
                data[key] = values[key];
            }
        }
        return data;
    }

    onRemoveMode = (e) => {
        this.setState({
            submitButtonLabel: e.target.checked ? 'Удалить тему' :  'Сохранить тему',
            isRemoveMode: !!e.target.checked
        })
    }

    clearAllFields () {
        this.props.form.setFieldsValue({
            keys: [],
            questionsList: [],
            theme: undefined,
            themeName: undefined,
            programList: undefined,
            levelList: undefined,
            subject: undefined,
            removeQuestions: undefined
        })

        this.setState({
            questionsList: [],
            isRemoveMode: false
        })
    }

    render() {
        // const CheckboxGroup = Checkbox.Group;
        const {getFieldDecorator} = this.props.form;
        const mainContent = this.state.isRemoveMode ? <h3>{'Для удаления темы нажмите кнопку "Удалить тему"'}</h3> :
            <EditThemeFields form={this.props.form} programList={this.state.programList} levelList={this.state.levelList} subjectsList={this.state.subjectsList} questionsList={this.state.questionsList} />;

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

                    {mainContent}

                    <Form.Item>
                        {getFieldDecorator('removeTheme', {})(
                            <Checkbox onChange={this.onRemoveMode} checked={this.state.isRemoveMode}>Удалить тему</Checkbox>
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