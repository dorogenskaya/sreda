import React, {Component} from 'react';
import {Form, Button} from 'antd';
import DynamicInputs from './Input/DynamicInputs';
import InputSelect from './Input/InputSelect';
import { Link } from 'react-router-dom';
import {database} from '../../model/firebase';

class EditProgramContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            programsData: null,
            programsArray: null,
            levelsList: null,
            subjectsList: null
        }

        this.handleSelectProgram = this.handleSelectProgram.bind(this);
        this.handleSelectLevel = this.handleSelectLevel.bind(this);
    }

    componentDidMount() {
        database.ref('programs').on('value', (snapShot) => {
            let programsData = snapShot.val(),
                programsArray = [];
            for (let key in programsData) {
                programsArray.push({id: key, programName: programsData[key].programName})
            }
            programsArray = programsArray.sort((a, b) => a.programName > b.programName ? 1 : -1)
            this.setState({
                programsData, programsArray
            })
        })

        database.ref('subjects').on('value', (snapShot) => {
            this.setState({
                subjectsData: snapShot.val()
            })
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err && values.themeName) {
                values.themeName.forEach((theme)=> {
                    const data = {
                        themeName: theme,
                        levelList: [values.level],
                        subjectsList: [values.subject],
                        programList: [values.program]
                    }
                    database.ref('themes').push().set(data);
                })
            }

        });
    }

    handleSelectProgram(val) {
        const {levelList} = this.state.programsData[val];
        this.setState({
            levelsList: levelList,
            subjectsList: null
        });
        this.clearField('subject');
    }

    handleSelectLevel(val) {
        let subjectsArray = [];

        for (let key in this.state.subjectsData) {
            if (this.state.subjectsData[key].levelList.includes(val)) {
                subjectsArray.push({id: key, subjectName: this.state.subjectsData[key].subjectName});
            }
        }

        this.setState({subjectsArray});
        this.clearField('subject');
    }

    clearField(name) {
        let field = {};
        field[name] = '';
        this.props.form.setFieldsValue(field);
    }


    render() {
        // const {getFieldDecorator, getFieldError} = this.props.form;
        // const {Option} = Select;
        console.log(this.state.programsArray);

        return (
            <div className="wrapper-block">
                <Form onSubmit={this.handleSubmit}>
                    <InputSelect name={`program`}
                                 label={`Выберите программу`}
                                 rules={[{
                                     required: true,
                                     message: 'Выберите редактируюемую программу'
                                 }]}
                                 config={{
                                     placeholder: 'Выберите программу',
                                     style: {width: '100%'},
                                     autoClearSearchValue: true,
                                     allowClear: true,
                                     onChange: this.handleSelectProgram
                                 }}
                                 form={this.props.form}
                                 data={{data: this.state.programsArray, nameKey: 'programName', valueKey: 'id'}}
                    />
                    <InputSelect name={`level`}
                                 label={`Выберите класс`}
                                 rules={[{
                                     required: true,
                                     message: 'Пожайлуста, выберите класс'
                                 }]}
                                 config={{
                                     placeholder: 'Выберите класс',
                                     style: {width: '100%'},
                                     autoClearSearchValue: true,
                                     allowClear: true,
                                     onChange: this.handleSelectLevel
                                 }}
                                 form={this.props.form}
                                 data={{data: this.state.levelsList, nameKey: 'label', valueKey: 'id'}}
                    />
                    <InputSelect name={`subject`}
                                 label={`Выберите предмет`}
                                 rules={[{
                                     required: true,
                                     message: 'Пожайлуста, выберите предмет'
                                 }]}
                                 config={{
                                     placeholder: 'Выберите предмет',
                                     style: {width: '100%'},
                                     autoClearSearchValue: true,
                                     allowClear: true,
                                     onChange: null
                                 }}
                                 form={this.props.form}
                                 data={{data: this.state.subjectsArray, nameKey: 'subjectName', valueKey: 'id'}}
                    />
                    <DynamicInputs
                        form={this.props.form}
                        input={{
                            label: 'Добавить тему',
                            name: 'themeName',
                            placeholder: 'Добавьте, пожайлуста, название темы',
                            validateTrigger: ['onChange', 'onBlur'],
                            rules: [{
                                required: true,
                                whitespace: true,
                                message: 'Пожайлуста, заполните или удалите поле'
                            }],
                            style: {
                                width: '60%',
                                marginRight: 8
                            }
                        }}
                        button={{
                            label: 'Добавить новую тему',
                            type: 'dashed',
                            style: {width: '60%'},
                            icon: {
                                type: 'plus'
                            }
                        }}/>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Сохранить изменения в программе
                        </Button>
                    </Form.Item>
                </Form>
                <div className="back-link">
                    <Link className="nav-link" to="/admin">Вернуться назад</Link>
                </div>
            </div>
        );
    }
}

const EditProgramContentForm = Form.create({name: 'edit_program'})(EditProgramContent);
export default EditProgramContentForm;