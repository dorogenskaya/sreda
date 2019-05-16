import React, {Component} from 'react';
import {Form, Input, Icon, Button, Select, Checkbox} from 'antd';
import InputSelect from './Input/InputSelect';
import DynamicInputs from './Input/DynamicInputs';

class EditThemeFields extends Component {
    render() {
        const CheckboxGroup = Checkbox.Group;
        const {getFieldDecorator} = this.props.form;

        const checkboxGroup = <div className={'wrapper-remove'}>
            <h3 className={'title'}>Выберите вопросы для удаления</h3>
            <Form.Item>
                {getFieldDecorator('removeQuestions', {})(
                    <CheckboxGroup options={this.state.questionsList}/>
                )}
            </Form.Item>
        </div>;
        const removeBlock = this.state.questionsList.length ? checkboxGroup : '';

        return (
            <div className="wrapper-block">
                <Form onSubmit={this.handleSubmit}>
                    <InputSelect name={`theme`}
                                 label={`Выберите тему`}
                                 rules={[{
                                     required: true,
                                     message: 'Выберите редактируюемую тему'
                                 }]}
                                 config={{
                                     placeholder: 'Выберите тему',
                                     style: {width: '100%'},
                                     autoClearSearchValue: true,
                                     allowClear: true,
                                     onChange: this.handleChangeTheme
                                 }}
                                 form={this.props.form}
                                 data={{data: this.state.themesList, nameKey: 'themeName', valueKey: 'id'}}
                    />

                    <InputSelect name={`programList`}
                                 label={`Выберите программу`}
                                 rules={[]}
                                 config={{
                                     mode: 'tags',
                                     placeholder: 'Выберите программу',
                                     style: {width: '100%'},
                                     autoClearSearchValue: true,
                                     allowClear: true,
                                     onChange: null
                                 }}
                                 form={this.props.form}
                                 data={{data: this.state.programList, nameKey: 'programName', valueKey: 'id'}}
                    />

                    <InputSelect name={`levelList`}
                                 label={`Выберите класс`}
                                 rules={[]}
                                 config={{
                                     mode: 'tags',
                                     placeholder: 'Выберите класс',
                                     style: {width: '100%'},
                                     autoClearSearchValue: true,
                                     allowClear: true,
                                     onChange: null
                                 }}
                                 form={this.props.form}
                                 data={{data: this.state.levelList, nameKey: 'label', valueKey: 'id'}}
                    />

                    <InputSelect name={`subjectsList`}
                                 label={`Выберите предмет(ы)`}
                                 rules={[]}
                                 config={{
                                     mode: 'tags',
                                     placeholder: 'Выберите предмет(ы)',
                                     style: {width: '100%'},
                                     autoClearSearchValue: true,
                                     allowClear: true,
                                     onChange: null
                                 }}
                                 form={this.props.form}
                                 data={{data: this.state.subjectsList, nameKey: 'subjectName', valueKey: 'id'}}
                    />

                    {removeBlock}

                    <DynamicInputs
                        input={{
                            label: 'Добавить новый вопрос в тему',
                            name: 'questionsList',
                            validateTrigger: ['onChange', 'onBlur'],
                            rules: [{
                                required: true,
                                whitespace: true,
                                message: "Пожайлуста, заполните или удалите поле"
                            }],
                            placeholder: 'Введите, пожайлуста вопрос',
                            style: {width: '60%', marginRight: 8}
                        }}
                        button={{
                            label: 'Добавить вопрос в тему',
                            type: 'dashed',
                            style: {width: '60%'},
                            icon: {
                                type: 'plus'
                            }
                        }}
                        form={this.props.form}
                    />
                </Form>
            </div>
        );
    }
}

export default EditThemeFields;