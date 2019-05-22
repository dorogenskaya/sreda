import React, {Component} from 'react';
import {Form, Input, Button, Cascader} from 'antd';
import InputSelect from './Input/InputSelect';
import {database} from '../../model/firebase';

class AddNewAnswer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            answerData: null,
            questionsList: [],
            selectedQuestions: [],
            themeActive: {},
            subjectActive: {},
            subjectsList: [],
            themesList: [],
            options: []
        }

        this.handleSelectTheme = this.handleSelectTheme.bind(this);
    }

    componentDidMount() {
        const subjectActive = {
            key: '-Lb9fI5xXlQWJfDilNru',
            label: 'Алгебра',
            value: 'Алгебра'
        };
        const themeKey = this.props.themeId;

        database.ref('themes/' + themeKey).once('value', snapshot => {
            let data = snapshot.val();
            const themeActive = {
                key: themeKey,
                themeName: data.themeName,
                questionsList: data.questionsList
            };

            let questionsList = themeActive.questionsList.map((item, i) => {
                return {id: i, name: item.question}
            });
            this.setState({subjectActive, themeActive, questionsList});
            this.props.form.setFieldsValue({'themes': [subjectActive.value, themeActive.themeName]})
        });

        database.ref('subjects').once('value', snapshot => {
            let subjectsList = [];
            let data = snapshot.val();

            for (let key in data) {
                subjectsList.push({key: key, subjectName: data[key].subjectName});
            }
            subjectsList = subjectsList.sort((a, b) => a.subjectName > b.subjectName ? 1 : -1);

            this.setState({subjectsList});
            this.collectOptions();
        });

        database.ref('themes').once('value', snapshot => {
            let themesList = [];
            let data = snapshot.val();
            for (let key in data) {
                themesList.push({key: key, themeName: data[key].themeName, subjectsID: data[key].subjectsList});
            }
            this.setState({themesList});
            this.collectOptions();
        });
        this.collectOptions();
    };

    collectOptions() {
        const {subjectsList, themesList} = this.state;

        if (subjectsList.length && themesList.length) {
            const collectedArray = subjectsList.map((element1) => {
                return {
                    key: element1.key, value: element1.subjectName, label: element1.subjectName,
                    children: this.renameThemes(themesList.filter(element2 => {
                        return element2.subjectsID.includes(element1.key)
                    }))
                }
            });

            const options = this.filterOptions(collectedArray);
            this.setState({options});
        }
    }

    filterOptions(collectedArray) {
        return collectedArray.filter(object => {
            return object.children.length > 0
        });
    }

    renameThemes(data) {
        let newThemes = [];
        data.forEach(obj => newThemes.push({
                value: obj.themeName,
                label: obj.themeName,
                key: obj.key
            })
        )
        return newThemes;
    }

    handleSelectTheme = (value, e) => {
        const subjectActive = e[0];
        database.ref('themes/' + e[1].key).once('value', snapshot => {
            let data = snapshot.val();
            const themeActive = {
                key: e[1].key,
                themeName: data.themeName,
                questionsList: data.questionsList
            };


            let questionsList = [];

            if (themeActive.questionsList) {
                themeActive.questionsList.forEach((item, i) => {
                    questionsList.push({key: i, name: item.question});
                });
            }
            this.setState({subjectActive, themeActive, questionsList, selectedQuestions: []});
            this.props.form.setFieldsValue({questionsList: undefined})
        });
    }

    handleSelectQuestions = (value) => {
        let questionsList = [...this.state.questionsList];
        let selectedQuestions = questionsList.filter(question => value.includes(question.id));
        this.setState({selectedQuestions});
    }

    handleSubmit = (e, v) => {
        e.preventDefault();

        let tempDate = new Date();
        let createDate = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();

        this.props.form.validateFields((err, values) => {
            if (!err && values) {
                const answerData = {
                    subject: this.state.subjectActive.key,
                    theme: this.state.themeActive.key,
                    questionsList: values.questionsList,
                    title: values.title,
                    description: values.description,
                    createDate: createDate
                }
                database.ref('themes/' + this.state.themeActive.key + '/answersList').push().set(answerData);
                this.props.history.push(this.props.previousLocation);
            }
            return err;
        })
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {TextArea} = Input;
        const {themeActive, subjectActive, questionsList, options} = this.state;

        return (
            <div className="wrapper-block">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item
                        label="Предмет / Тема">
                        {getFieldDecorator('themes', {
                            initialValue: [subjectActive.value, themeActive.themeName]
                        })(
                            <Cascader
                                name={'themes'}
                                options={options}
                                onChange={(value, e) => {
                                    this.handleSelectTheme(value, e)
                                }}
                                showSearch={true}
                                allowClear={false}
                            />
                        )}
                    </Form.Item>
                    <InputSelect
                        name={`questionsList`}
                        label={`Выбери вопросы`}
                        rules={[{
                            required: true,
                            message: 'Без вопросов нельзя добавить ответ'
                        }]}
                        config={{
                            mode: 'multiple',
                            placeholder: 'Выбери один или несколько вопросов',
                            style: {width: '100%'},
                            autoClearSearchValue: true,
                            allowClear: true,
                            onChange: this.handleSelectQuestions,
                            disabled: !questionsList.length
                        }}
                        form={this.props.form}
                        data={{data: questionsList, nameKey: 'name', valueKey: 'id'}}
                    />

                    <Form.Item
                        label="Заголовок ответа"
                        rules={[{
                            required: true,
                            message: 'Без вопросов нельзя добавить ответ'
                        }]}>
                        {getFieldDecorator('title', {})(
                            <Input placeholder="Ответы с заголовками читают на 34% чаще"/>
                        )}
                    </Form.Item>

                    <Form.Item
                        label="Ответ"
                        rules={[{
                            required: true,
                            message: 'Без вопросов нельзя добавить ответ'
                        }]}>
                        {getFieldDecorator('description', {})(
                            <TextArea
                                placeholder="Пиши то, что тебе было самому интересно прочитать. Пиши кратко и просто, вставь картинки, придумывай мемы, снимай видео и фото — просто вставь ссылку на ютуб. Не забудь ссылки на статьи, которые ты использовал."
                                rows={5}/>
                        )}
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                        >Сохранить ответ
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const AddNewAnswerForm = Form.create({name: 'add_new_answer'})(AddNewAnswer);
export default AddNewAnswerForm;