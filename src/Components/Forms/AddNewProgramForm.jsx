import React, {Component} from 'react';
import {Form, Input, Icon, Button} from 'antd';
import {Link} from 'react-router-dom';
import {database} from '../../model/firebase';

class AddNewProgram extends Component {
    constructor(props) {
        super(props);

        this.state = {
            validateMessage: null,
            programList: null
        }
    }

    componentDidMount() {
        database.ref('programs').on('value', (snapShot) => {
            let data = snapShot.val(),
                arrayNames = [];

            for (let key in data) {
                arrayNames.push(data[key].programName);
            }

            if (!this.state.programList) {
                this.setState({
                    programList: arrayNames
                })
            } else {
                this.setState({
                    programList: arrayNames,
                    validateStatus: 'success',
                    validateMessage: `Программа ${arrayNames[arrayNames.length - 1]} была успешно добавлена`
                })
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (this.validateData(values) && !err) {
                database.ref('programs').push().set(values);
            }
        });
    };

    validateData(value) {
        if (!value.programName || this.state.programList.includes(value.programName)) {
            this.setState({
                validateStatus: 'error',
                validateMessage: !value.programName ? 'Добавьте, пожайлуста, название программы' : `Программа ${value.programName} уже существует`
            });
            return false;
        } else {
            this.setState({
                validateStatus: 'success',
                validateMessage: null
            });
            return true;
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="wrapper-block">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item
                        label="Програма"
                        validateStatus={this.state.validateStatus}
                        help={this.state.validateMessage}>
                        {getFieldDecorator('programName', {
                            rules: [{required: true}],
                        })(
                            <Input prefix={<Icon type="form" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                   placeholder="Добавить новую програму"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Добавить новую программу
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

const AddNewProgramForm = Form.create({name: 'add_new_program'})(AddNewProgram);
export default AddNewProgramForm;