import React, {Component} from 'react';
import Joi from "joi-browser";
import {Button, Input, Cascader, Select} from 'antd';

class Form extends Component {
    state = {
        data: {},
        errors: {}
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

    validateProperty = ({name, value}) => {
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
        this.setState({errors: errors || {}});
        if (errors) return;

        this.doSubmit()
    }

    handleChangeSelect = (name, e, i) => {
        console.log(name, e, i);

        const errors = {...this.state.errors};
        const input = {name: name, value: e};
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[name] = errorMessage;
        else delete errors[name];

        const data = {...this.state.data};

        data[name] = e;
        this.setState({data, errors});
        console.log(data);
    };

    getQuestionID = (i) => {
        const data = {...this.state.data};

        let arrayId = [];
        i.forEach(item => arrayId.push(item.key));
        data.questionsListID = arrayId;
        this.setState({data});
    }

    handleChange = ({currentTarget: input}) => {
        // check the currentTarget input
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = {...this.state.data};
        data[input.name] = input.value;
        this.setState({data});
        this.setState({errors});
    };

    handleChangeTheme = () => {
        // database.ref('subjects').on('value', (snapShot) => {
        //     let data = snapShot.val(),
        //         arraySubjects = [];
        //
        //     for (let key in data) {
        //         arraySubjects.push({key: key, subjectName: data[key].subjectName})
        //     }
        //
        //     arraySubjects = arraySubjects.sort((a, b) => a.subjectName > b.subjectName ? 1 : -1);
        //     this.setState({
        //         subjectsList: arraySubjects
        //     })
        // });
    }

    renderButton(label) {
        return (
            // if there are no errors this.validate is false< otherwise it is truthy
            <Button
                disabled={this.validate()}
                type="primary">{label}</Button>
        );
    }

    renderInput(name, label, type = 'text', placeholder) {
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

    renderSelect(name, label, placeholder, options) {
        const Option = Select.Option;
        let children = [];
        options.map((item) => children.push(<Option key={item.key} value={item.name}>{item.name}</Option>));

        const {data, errors} = this.state;
        const error = errors[name];

        return (
            <div className="form-group" style={{marginBottom: '16px'}}>
                <label htmlFor={name}>{label}</label>
                <Select
                    name={name}
                    mode="multiple"
                    style={{width: '100%'}}
                    placeholder={placeholder}
                    onChange={(e, i) => this.handleChangeSelect(name, e, i)}
                    value={data[name]}
                    error={errors}
                >
                    {children}
                </Select>
                {error && <div style={{color: 'red'}}>{error}</div>}
            </div>

        );
    }

    renderTextArea(name, label, placeholder, rows) {
        const {data, errors} = this.state;
        const error = errors[name];
        const {TextArea} = Input;

        return (
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

    renderCascader(name, label, subjectActive, themeActive, themesList, subjectsList) {

        const {data, errors} = this.state;
        const error = errors[name];

        const options = [{
            value: 'алгебра',
            label: 'Алгебра',
            children: [{
                value: 'тема Алгебры',
                label: 'тема Алгебры',
            }],
        }, {
            value: 'русский язык',
            label: 'Русский язык',
            children: [{
                value: 'тема русского языка',
                label: 'Тема русского языка',
            }],
        }];


        return (
            <div className="form-group" style={{marginBottom: '16px'}}>
                <label htmlFor={name}>{label}</label>
                <Cascader
                    defaultValue={['алгебра', 'тема Алгебры']}
                    name={name}
                    label={label}
                    error={error}
                    value={data[name]}
                    options={options}
                    onChange={(e, i) => this.handleChangeSelect(name, e, i)}
                />
                     {error && <div style={{color: 'red'}}>{error}</div>}

            </div>
        )
    }
}
export default Form;