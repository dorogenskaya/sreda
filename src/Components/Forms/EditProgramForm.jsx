import React, {Component} from 'react';
import {Form, Input, Icon, Button, Select} from 'antd';
import DynamicInputs from './Input/DynamicInputs';
import {database} from '../../model/firebase';

class EditProgram extends Component {
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
        const programName = val ? this.state.programsData[val].programName : null;

        this.setState({
            currentProgramId: !val ? null : val,
            currentProgramName: programName
        })
        this.props.form.setFieldsValue({
            programName: programName
        })
        console.log(this.state);
    }


    render() {
        const {getFieldDecorator, getFieldError} = this.props.form;
        const {Option} = Select;
        let children = [];
        if (this.state.programsArray) {
            this.state.programsArray.map((item, i) => children.push(<Option key={i}
                                                                            value={item.id}>{item.programName}</Option>));
        }
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item
                    label="Выберите программу">
                    {getFieldDecorator('program', {
                        rules: [{required: true, message: 'Выберите редактируюемую программу'}],
                    })(
                        <Select
                            placeholder={'Выберите программу'}
                            name={'program'}
                            style={{width: '100%'}}
                            autoClearSearchValue={true}
                            allowClear={true}
                            onChange={this.handleSelectProgram}
                        >
                            {children}
                        </Select>
                    )}
                </Form.Item>
                <Form.Item
                    label="Редактировать название программы">
                    {getFieldDecorator('programName', {})(
                        <Input prefix={<Icon type="form" style={{color: 'rgba(0,0,0,.25)'}}/>}
                               placeholder="Изменить название программы"/>
                    )}
                </Form.Item>

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
        );
    }
}

const EditProgramForm = Form.create({name: 'edit_program'})(EditProgram);
export default EditProgramForm;