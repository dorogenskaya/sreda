import React, {Component} from 'react';
import {Form} from 'antd';
import InputSelect from '../Forms/Input/InputSelect';
import SubjectsList from './SubjectList';
import {database} from '../../model/firebase';
import './Program.css';

class EditProgramFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            programsData: null,
            programsArray: null,
            currentProgram: '-LbdUMkq7sqkAR6zaSax',
            levels: null,
            currentLevel: 'level_5',
            subjectsData: null,
            subjectsList: null,
            themesData: null,
            subjectThemes: []
        }
    }

    componentDidMount() {
        database.ref('programs').once('value', (snapShot) => {
            let programsData = snapShot.val(),
                programsArray = [];
            for (let key in programsData) {
                programsArray.push({id: key, programName: programsData[key].programName})
            }
            this.setState({programsData, programsArray})
            this.setDefaultValues();
        })

        database.ref('subjects').once('value', (snapShot) => {
            let subjectsData = snapShot.val(),
                subjectsList = [];
            for (let key in subjectsData) {
                subjectsList.push({id: key, subjectName: subjectsData[key].subjectName})
            }
            this.setState({subjectsData, subjectsList})
            this.setDefaultValues();
        })

        database.ref('themes').once('value', (snapShot) => {
            this.setState({
                themesData: snapShot.val()
            })
        })
    }

    setDefaultValues () {
        if (this.state.subjectsData && this.state.programsData) {
            this.setLevels(this.state.currentProgram, true)
            this.props.form.setFieldsValue({'program': this.state.currentProgram})
        }
    }

    setLevels (id, isDefaultValue) {
        let program = id ? this.state.programsData[id] : null,
            levels = program ? program.levelList : null,
            oldValue = this.getCurrentLevel();

        if (levels) {
            this.setState({levels})
        }
        this.props.form.setFieldsValue({'level':  isDefaultValue ? this.state.currentLevel : oldValue})

        this.setSubjects(isDefaultValue ? this.state.currentLevel : oldValue, id);
        this.setContentData(id, this.getCurrentLevel(), this.getCurrentSubjects());
    }

    setSubjects (level, programId) {
        let subjectsList = [],
            oldValue = this.getCurrentSubjects(),
            newValue = [];
        for (let key in this.state.subjectsData) {
            if (this.isContainsSubject(level, programId, this.state.subjectsData[key])) {
                subjectsList.push({id: key, subjectName: this.state.subjectsData[key].subjectName})
                if (oldValue && oldValue.includes(key)) {
                    newValue.push(key);
                }
            }
        }

        this.setState({subjectsList})
        this.props.form.setFieldsValue({'subject': newValue.length ? newValue : undefined });
        this.setContentData(this.getCurrentProgram(), level, this.getCurrentSubjects());
    }

    isContainsSubject (level, programId, subject) {
        let levels = subject.levelList || [],
            programs = subject.programList || [];

        return (levels.includes(level) || !level) && (programs.includes(programId) || !programId)
        // return (!level && !programId) || (levels.includes(level) && programs.includes(programId)) || !programId && levels.includes(level) || !level && programs.includes(programId)
    }

    getCurrentProgram () {
        return this.props.form.getFieldsValue(['program']).program
    }

    getCurrentLevel () {
        return this.props.form.getFieldsValue(['level']).level
    }

    getCurrentSubjects () {
        return this.props.form.getFieldsValue(['subject']).subject
    }

    onChangeProgram = (id) => {
        this.setLevels(id)
    }

    onChangeLevel = (id) => {
        let programId = this.props.form.getFieldsValue(['program']).program;
        this.setSubjects(id, programId);
    }

    onChangeSubjects = (id)=> {
        this.setContentData(this.getCurrentProgram(), this.getCurrentLevel(), id);
    }

    setContentData (program, level, subjects) {
        if (subjects) {
            this.setState({
                subjectThemes: this.collectContentData(program, level, subjects)
            })
        } else {
            this.setState({
                subjectThemes: []
            })
        }
    }

    collectContentData (program, level, subjects) {
        let data = [];
        subjects.forEach((subject) => {
            let subjectLabel = this.state.subjectsData[subject].subjectName,
                themesData = this.state.themesData,
                themesList = [];
            for (let key in themesData) {
                if (themesData[key].subject.id === subject && this.isAllowedTheme(program, level, themesData[key])) {
                    themesData[key].id = key;
                    themesList.push(themesData[key]);
                }
            }
            if (themesList.length) {
                data.push({subjectLabel, themesList})
            }
        })
        return data;
    }

    isAllowedTheme(program, level, theme) {
        return (theme.programList.includes(program) || !program) && (theme.levelList.includes(level) || !level)
    }

    render() {
        return (<div className="Program">
            <h1>Program Page</h1>
            <Form>
                <div className="Program-filters">
                    <div className="filter-block">
                        <InputSelect name={`program`}
                                     label={`Выберите программу`}
                                     config={{
                                         placeholder: 'Выберите программу',
                                         style: {width: '100%'},
                                         autoClearSearchValue: true,
                                         allowClear: true,
                                         onChange: this.onChangeProgram
                                     }}
                                     form={this.props.form}
                                     data={{data: this.state.programsArray, nameKey: 'programName', valueKey: 'id'}}
                        />
                    </div>
                    <div className="filter-block">
                        <InputSelect name={`level`}
                                     label={`Выберите класс`}
                                     config={{
                                         placeholder: 'Выберите класс',
                                         style: {width: '100%'},
                                         autoClearSearchValue: true,
                                         allowClear: true,
                                         onChange: this.onChangeLevel
                                     }}
                                     form={this.props.form}
                                     data={{data: this.state.levels, nameKey: 'label', valueKey: 'id'}}
                        />
                    </div>
                    <div className="filter-block">
                        <InputSelect name={`subject`}
                                     label={`Выберите предмет`}

                                     config={{
                                         mode: 'tags',
                                         placeholder: 'Выберите предмет',
                                         style: {width: '100%'},
                                         autoClearSearchValue: true,
                                         allowClear: true,
                                         onChange: this.onChangeSubjects
                                     }}
                                     form={this.props.form}
                                     data={{data: this.state.subjectsList, nameKey: 'subjectName', valueKey: 'id'}}
                        />
                    </div>
                </div>
            </Form>
            <SubjectsList data={this.state.subjectThemes}/>
        </div>)
    }
};

const Program = Form.create({name: 'edit_program'})(EditProgramFilter);
export default Program;