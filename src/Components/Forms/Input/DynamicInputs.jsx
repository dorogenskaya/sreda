import React, {Component} from 'react';
import {Form, Input, Icon, Button} from 'antd';

let id = 0;

class DynamicInputs extends Component {
    remove = (k) => {
        const {form} = this.props;
        const keys = form.getFieldValue('keys');
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }

    add = () => {
        const {form} = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);
        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    render() {
        const { input, button } = this.props;
        const {getFieldDecorator, getFieldValue} = this.props.form;
        getFieldDecorator('keys', {initialValue: []});
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => (
            <Form.Item
                label={input.label}
                key={k}>
                {getFieldDecorator(`${input.name}[${k}]`, {
                    validateTrigger: input.validateTrigger,
                    rules: input.rules,
                })(
                    <Input placeholder={input.placeholder} style={input.style}/>
                )}
                {keys.length > 0 ? (
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        onClick={() => this.remove(k)}
                    />
                ) : null}
            </Form.Item>
        ));

        return (
            <div>
                { formItems }
                <Form.Item>
                    <Button type={button.type} onClick={this.add} style={button.style}>
                        <Icon type={ button.icon.type }/> {button.label}
                    </Button>
                </Form.Item>
            </div>
        );
    }
}

export default DynamicInputs;