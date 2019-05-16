import React, {Component} from 'react';
import {Form, Checkbox} from 'antd';
import InputSelect from './Input/InputSelect';
import DynamicInputs from './Input/DynamicInputs';

class EditThemeFields extends Component {    
    render() {
        const CheckboxGroup = Checkbox.Group;
        const {form, programList, levelList, subjectsList, questionsList} = this.props;
        const {getFieldDecorator} = form;

        const checkboxGroup = <div className={'wrapper-remove'}>
            <h3 className={'title'}>Выберите вопросы для удаления</h3>
            <Form.Item>
                {getFieldDecorator('removeQuestions', {})(
                    <CheckboxGroup options={questionsList}/>
                )}
            </Form.Item>
        </div>;

        const content =  questionsList.length ? checkboxGroup : '';

        return (
            <div className="wrapper-block">
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
                             form={form}
                             data={{data: programList, nameKey: 'programName', valueKey: 'id'}}
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
                             form={form}
                             data={{data: levelList, nameKey: 'label', valueKey: 'id'}}
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
                             form={form}
                             data={{data: subjectsList, nameKey: 'subjectName', valueKey: 'id'}}
                />

                {content}

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
                    form={form}
                />
            </div>
        );
    }
}

export default EditThemeFields;