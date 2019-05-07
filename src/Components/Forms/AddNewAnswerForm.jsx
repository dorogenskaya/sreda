import React, {Component} from 'react';
import {Form, Input, Button, Cascader} from 'antd';
import InputSelect from './Input/InputSelect';
import {database} from '../../model/firebase';

class AddNewAnswer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            answerData: null,
            questionsList:[],
            themeActive: {},
            subjectActive:'',
            subjectsList:[],
            themesList:[],
            options:[]
        }

        this.handleClickTheme = this.handleClickTheme.bind(this);
        this.handleSelectTheme = this.handleSelectTheme.bind(this);

    }

    componentDidMount() {
        //get active subject and active theme
        const subjectActive = 'Алгебра';
        const themeID = this.props.themeId;

        database.ref('themes/' + themeID).on('value', snapshot => {
            let themeActive = snapshot.val();
            let questionsList = themeActive.questionsList.map((item, i) => {
                return {id: i, name: item.question}
            });
            this.setState({subjectActive, themeActive, questionsList});
        });


    };

    handleSubmit = (e) => {
        console.log(e);
        // e.preventDefault();
        // this.props.form.validateFields((err, values) => {
        //     if (!err && data) {
        //         // need to add theme ID
        //     database.ref('themes/' + + 'answer/').push().set(data);
        //     }
        // });
    };
    handleClickTheme(){
        const {subjectsList, themesList} = this.state;
        if (subjectsList.length && themesList.length){
            return false;
        }

        database.ref('subjects').on('value', snapshot => {
            let subjectsList = [];
            let data = snapshot.val();

            for (let key in data) {
                subjectsList.push({id: key, subjectName: data[key].subjectName});
            }
            subjectsList = subjectsList.sort((a, b) => a.subjectName > b.subjectName ? 1 : -1);
            this.setState({subjectsList});
            this.testFunction();
        });

        database.ref('themes').on('value', snapshot => {
            let themesList = [];
            let data = snapshot.val();
            for (let key in data) {
                themesList.push({id: key, themeName: data[key].themeName, subjectsID:data[key].subjectsList});
            }
            this.setState({themesList});
            this.testFunction();
        });


    }

    testFunction() {
        const {subjectsList, themesList} = this.state;

        if (subjectsList.length && themesList.length) {
            const options = subjectsList.map((element1) => {
                return {key: element1.id, value: element1.subjectName, label: element1.subjectName, children: themesList.filter(element2 => {
                        if (!element2.subjectsID.includes(element1.id)) return null;
                        return Object.assign(element2, {value: element2.themeName , label: element2.themeName } )
                    })
                }
            });
            this.setState({ options });
        }
    }

    handleSelectTheme = (value, e) => {
        const subjectActive = e[0].value;
        database.ref('themes/' + e[1].id).on('value', snapshot => {

            let themeActive = snapshot.val();
            if (!themeActive.questionsList) return [];
            let questionsList = themeActive.questionsList.map((item, i) => {
                return {id: i, name: item.question}
            });

            this.setState({subjectActive, themeActive, questionsList});
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const { TextArea } = Input;
        const {themeActive, subjectActive, questionsList, options} = this.state;
        console.log(subjectActive, themeActive, questionsList, 'ffdsfdshdfjks');

        return (
            <div className="wrapper-block">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item
                        label="Предмет / Тема">
                        {getFieldDecorator('themes', {
                            initialValue:[subjectActive, themeActive.themeName]
                        })(
                            <Cascader
                                name = {'themes'}
                                options={options}
                                onClick={this.handleClickTheme}
                                onChange={(value, e)=>{this.handleSelectTheme(value, e)}}
                                showSearch={true}
                            />
                        )}
                    </Form.Item>
                    <InputSelect
                        name={`questionsList`}
                        label={`Выбери вопросы`}
                        rules={[{
                            message: 'Без вопросов нельзя добавить ответ'
                        }]}
                        config={{
                             mode:'tag',
                             placeholder: 'Выбери один или несколько вопросов',
                             style: {width: '100%'},
                             autoClearSearchValue: true,
                             allowClear: true,
                             onChange: this.handleSelectProgram
                        }}
                        form={this.props.form}
                        data={{data: questionsList, nameKey: 'name', valueKey: 'key'}}
                    />

                    <Form.Item
                        label="Заголовок ответа">
                        {getFieldDecorator('title', {})(
                            <Input placeholder="Ответы с заголовками читают на 34% чаще"/>
                        )}
                    </Form.Item>

                    <Form.Item
                        label="Ответ">
                        {getFieldDecorator('description', {})(
                            <TextArea
                                placeholder="Пиши то, что тебе было самому интересно прочитать. Пиши кратко и просто, вставь картинки, придумывай мемы, снимай видео и фото — просто вставь ссылку на ютуб. Не забудь ссылки на статьи, которые ты использовал."
                                rows={5} />
                        )}

                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={() => {this.props.history.push(this.props.previousLocation)}}
                        >
                            Сохранить изменения в программе
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const AddNewAnswerForm = Form.create({ name: 'add_new_answer' })(AddNewAnswer);
export default AddNewAnswerForm;