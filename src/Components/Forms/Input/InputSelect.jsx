import React, {Component} from 'react';
import {Form, Input, Select, Icon} from 'antd';

class InputSelect extends Component {
    render() {
        const {getFieldDecorator, getFieldError} = this.props.form;
        const {name, label, rules, config, data} = this.props;
        const {Option} = Select;
        let children = [];

        if (data.data) {
            data.data.map((item, i) => children.push(<Option key={i} value={item[data.valueKey]}>{item[data.nameKey]}</Option>));
        }

        return (
            <Form.Item
                label={label}>
                {getFieldDecorator(`${name}`, {
                    rules: rules,
                })(
                    <Select
                        mode={config.mode || null }
                        placeholder={config.placeholder}
                        name={name}
                        style={config.style}
                        autoClearSearchValue={config.autoClearSearchValue}
                        allowClear={config.allowClear}
                        onChange={config.onChange}
                    >
                        {children}
                    </Select>
                )}
            </Form.Item>
        );
    }
}

export default InputSelect;