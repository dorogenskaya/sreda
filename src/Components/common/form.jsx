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

    renderCascader (name, label, subjectActive, themeActive, options) {
        const {data, errors} = this.state;
        const error = errors[name];

        return (
            <div className="form-group" style={{marginBottom: '16px'}}>
                <label htmlFor={name}>{label}</label>
                <Cascader defaultValue={[subjectActive, themeActive]}
                          label={label}
                          options={options}
                          onChange={this.handleChange}
                          error={error}/>


                <Input size="large" className="form-control"
                       placeholder={label}
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
}
export default Form;