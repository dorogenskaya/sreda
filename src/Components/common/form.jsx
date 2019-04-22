import React, {Component} from 'react';
import Joi from "joi-browser";
import { Button, Input, Cascader, Select } from 'antd';

class Form extends Component {
    state = {
        data:{},
        errors:{}
    };

    validate = () => {
        const options = {abortEarly: false};

        // error property from the result of validation
        const {error} = Joi.validate(this.state.data, this.schema, options);
        if (!error) return null;

        const errors = {};
        // map throw array result.error.details of joi validate
        for (let item of error.details) errors[item.path[0]] = item.message;
        return errors;
    };

    validateProperty = ({ name, value}) => {
        // take input name  with value and store into the obj
        const obj = {[name]: value};

        // take input name with schema and store into the schema
        const schema = {[name]: this.schema[name]};

        // store error into the object. pass value from input and schema for this input from Joi
        const {error} = Joi.validate(obj, schema);
        // return error message if error is truthy
        return error ? error.details[0].message : null;
    }

    handleSubmit = e => {
        e.preventDefault();
        const errors = this.validate();
        // it helps to manage case when errors null
        this.setState({ errors: errors || {} });
        if (errors) return;

        this.doSubmit()
    }

    handleChange = ({currentTarget: input}) => {
        // check the currentTarget input
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = {...this.state.data};
        data[input.name] = input.value;
        this.setState({ data, errors });
    };

    renderButton(label) {
        return (
        // if there are no errors this.validate is false< otherwise it is truthy
        <Button
                disabled={this.validate()}
                type="primary">{label}</Button>
        );
    }

    renderInput (name, label, type = 'text', placeholder) {
        const {data, errors} = this.state;
        const error = errors[name];

        return (
            <div className="form-group" style={{marginBottom: '16px'}}>
                <label htmlFor={name}>{label}</label>
                <Input size="large" className="form-control"
                       placeholder={placeholder}
                       type={type}
                       id={name}
                       name={name}
                       label={label}
                       error={error}
                       value={data[name]}
                       onChange={this.handleChange}
                />
                {error && <div style={{color: 'red'}}>{error}</div>}
            </div>

        );
    }

    renderSelect (name, label, placeholder, options) {
        const Option = Select.Option;
        for (let i = 10; i < 36; i++) {
            options.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
        }

        const {data, errors} = this.state;
        const error = errors[name];

        return (
            <div className="form-group" style={{marginBottom: '16px'}}>
                <label htmlFor={name}>{label}</label>
                <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder={placeholder}
                    onChange={this.handleChange}
                    value={data[name]}
                    error={error}
                >
                    {options}
                </Select>
                {error && <div style={{color: 'red'}}>{error}</div>}
            </div>

        );
    }

    renderTextArea (name, label, placeholder, rows) {
        const {data, errors} = this.state;
        const error = errors[name];
        const { TextArea } = Input;

        return(
            <div className="form-group" style={{marginBottom: '16px'}}>
                <label htmlFor={label}>{label}</label>

                <TextArea
                    name={name}
                    label={label}
                    placeholder={placeholder}
                    rows={rows}
                    onChange={this.handleChange}
                    value={data[name]}
                    error={error}
                />
                {error && <div style={{color: 'red'}}>{error}</div>}

            </div>
        );
    }

    renderCascader (name, label, subjectActive, themeActive, themesList, subjectsList) {
        const {data, errors} = this.state;
        const error = errors[name];

        const createNestedArray = (array1, array2) => {
            return array1
                .map(element1 => {return {value: element1.subjectName, label: element1.subjectName, children: array2
                        .filter((element2) => {
                            if (element2.subjects.includes(element1.key)) return {value: element2.test, label: element2.test};
                            return null;

                        })
                    };
                })
            };

        const array2 =[
            {test: 'Theme name 1', subjects:['-Lb9fI5xXlQWJfDilNru']},
            {test: 'Theme name 2', subjects:['-Lb9fI5xXlQWJfDilNru']},
            {test: 'Theme name 3', subjects:['-tytrxXlQWJfDilNru','-fdsQWJfDilNtu']}
        ];

        const options = createNestedArray(subjectsList, array2);

        return (
            <div className="form-group" style={{marginBottom: '16px'}}>
                <label htmlFor={name}>{label}</label>
                <Cascader defaultValue={[subjectActive, themeActive]}
                          label={label}
                          options={options}
                          onChange={this.handleChange}
                          error={error}
                          value={data[name]}/>
                {error && <div style={{color: 'red'}}>{error}</div>}
            </div>

        );
    }
}
export default Form;