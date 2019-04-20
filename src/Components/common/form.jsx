import React, {Component} from 'react';
import Joi from "joi-browser";
import { Button, Input, Cascader } from 'antd';

class Form extends Component {
    state = {
        data:{},
        errors:{}
    };

    validate = () => {
        const options = {abortEarly: false};
        const {error} = Joi.validate(this.state.data, this.schema, options);
        if (!error) return null;

        const errors = {};
        for (let item of error.details) errors[item.path[0]] = item.message;
        return errors;
    };

    validateProperty = ({ name, value}) => {
        const obj = {[name]: value};
        const schema = {[name]: this.schema[name]};
        const {error} = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    }

    handleSubmit = e => {
        e.preventDefault();

        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;
        this.doSubmit()
    }


    handleChange = ({currentTarget: input}) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = {...this.state.data};
        data[input.name] = input.value;
        this.setState({ data, errors});
    };

    renderButton(label) {
        return (
            <Button
                disabled={this.validate()} type="primary">{label}</Button>
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
                       value={data[name]}
                       label={label}
                       onChange={this.handleChange}
                       error={error}
                />
                {error && <div style={{color: 'red'}}>{error}</div>}
            </div>

        );
    }

    renderTextArea (label, placeholder, rows) {
        const { TextArea } = Input;

        <TextArea label={label} placeholder={placeholder} rows={rows}/>
    }

    renderCascader (name, label, subjectActive, themeActive, themesList, subjectsList) {
        const {errors} = this.state;
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
                          error={error}/>
            </div>

        );
    }
}
export default Form;