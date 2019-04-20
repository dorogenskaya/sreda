import React, {Component} from 'react';
import {Form, Input, Icon, Button, Select} from 'antd';
import DynamicInputs from './Input/DynamicInputs';
import InputSelect from './Input/InputSelect';
import { Link } from 'react-router-dom';
import {database} from '../../model/firebase';

class EditProgramContent extends Component {
    constructor(prop) {
        super(prop);

        this.state = {
            programsData: null,
            programsArray: null,
            currentProgramId: null,
            currentProgramName: null,
            validateMessage: null
        }

        this.handleSelectProgram = this.handleSelectProgram.bind(this);
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
                programsData,
                programsArray
            })
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(err, values, 'SUBMIT');
            // if (this.validateData(values) && !err) {
            //     database.ref('programs').push().set(values);
            // }
        });
    }

    handleSelectProgram(val) {
        console.log(val, 'Select Programm');
    }

    handleSelectSubject(val) {
        console.log(val, 'Select Subject')
    }

    handleSelectLevel(val) {
        console.log(val, 'Select Level')
    }


    render() {
        const {getFieldDecorator, getFieldError} = this.props.form;
        const {Option} = Select;

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
                                 data={{data: this.state.programsArray, nameKey: 'programName', valueKey: 'id'}}
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
                                     onChange: this.handleSelectSubject
                                 }}
                                 form={this.props.form}
                                 data={{data: this.state.programsArray, nameKey: 'programName', valueKey: 'id'}}
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