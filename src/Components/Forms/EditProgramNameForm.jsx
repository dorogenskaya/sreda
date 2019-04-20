import React, {Component} from 'react';
import {Form, Input, Icon, Button, Select} from 'antd';
import InputSelect from './Input/InputSelect';
import { Link } from 'react-router-dom';
import {database} from '../../model/firebase';

class EditProgramName extends Component {
    constructor(prop) {
        super(prop);

        this.state = {
            programsData: null,
            programsArray: null
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
            if (!err) {
                database.ref('programs/' + values.program ).set({programName: values.programName});
            }
        });
    }

    handleSelectProgram(val) {
        const programName = val ? this.state.programsData[val].programName : null;
        this.props.form.setFieldsValue({
            programName: programName
        })
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
                    <Form.Item
                        label="Редактировать название программы">
                        {getFieldDecorator('programName', {})(
                            <Input prefix={<Icon type="form" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                   placeholder="Изменить название программы"/>
                        )}
                    </Form.Item>
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
        )
    }
}

const EditProgramNameNameForm = Form.create({name: 'edit_program'})(EditProgramName);
export default EditProgramNameNameForm;