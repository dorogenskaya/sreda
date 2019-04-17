import React, {Component} from 'react';
import { Form, Input, Icon, Button} from 'antd';
import {database} from '../../model/firebase';

class AddNewSubjects extends Component {
    constructor(props) {
        super(props);

        this.state = {
            validateMessage: null,
            subjectList: null
        }
    }

    componentDidMount() {
        database.ref('subjects').on('value', (snapShot) => {
            let data = snapShot.val(),
                arrayNames = [];

            for (let key in data) {
                arrayNames.push(data[key].subjectName);
            }

            if (!this.state.subjectList) {
                this.setState({
                    subjectList: arrayNames
                })
            } else {
                this.setState({
                    subjectList: arrayNames,
                    validateStatus: 'success',
                    validateMessage: `Предмет ${arrayNames[arrayNames.length -1]} был успешно добавлена`
                })
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (this.validateData(values) && !err) {
                database.ref('subjects').push().set(values);
            }
        });
    }

    validateData (value) {
        if (!value.subjectName || this.state.subjectList.includes(value.subjectName)) {
            this.setState({
                validateStatus: 'error',
                validateMessage: !value.subjectName ? 'Добавьте, пожайлуста, название предемета' : `Предмет ${value.subjectName} уже существует`
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
            <Form onSubmit={this.handleSubmit}>
                <Form.Item
                    label="Предмет"
                    validateStatus={this.state.validateStatus}
                    help={this.state.validateMessage}
                >
                    {getFieldDecorator('subjectName', {
                        rules: [{ required: true}],
                    })(
                        <Input prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Добавить новый предмет" />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Добавить новый предмет
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const AddNewSubjectForm = Form.create({ name: 'add_new_subject' })(AddNewSubjects);
export default AddNewSubjectForm;