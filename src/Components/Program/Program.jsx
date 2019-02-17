import React, {Component} from 'react';
import ProgramData from './testProgramData';
import ProgramFilter from './ProgramFilter';
import ClassesFilter from './ClassesFilter';
import SubjectsFilter from './SubjectsFilter';
import SubjectsList from './SubjectList';
import './Program.css';

class Program extends Component {
    constructor(props) {
        super(props);

        this.state = {
            programs: [],
            currentProgram: null,
            classes: [] ,
            currentClass: null,
            subjects: [],
            currentSubjects: [],
            subjectsData: []
        }

        this.handleChangeProgram = this.handleChangeProgram.bind(this);
        this.handleChangeClass = this.handleChangeClass.bind(this);
        this.handleChangeSubjects = this.handleChangeSubjects.bind(this);
    }

    componentDidMount () {
        const currentProgram = this.getCurrentProgram();
        const classes = this.getCurrentClasses(currentProgram)
        const currentClass = classes[0].id;
        const subjects =  this.getCurrentSubjects(currentClass);
        const currentSubjects =  [];

        this.setState({
            programs: this.getDataByKey('Programs'),
            currentProgram: currentProgram,
            classes: classes ,
            currentClass: currentClass,
            subjects: subjects,
            currentSubjects: currentSubjects,
            subjectsData: this.getSubjectsData(currentClass, currentSubjects)
        })
    }

    getDataByKey = (key) => ProgramData[key];

    getCurrentProgram (Program = this.getDataByKey('defaultProgram')) {
        return !Program ? null : this.getDataByKey('Programs').filter((item) => item.id === Program)[0];
    }

    getCurrentClasses (Program) {
        const allClasses = this.getDataByKey('classes');
        let data;
        if (Program) {
            data = Program.classes.map((clId) => allClasses.filter((item) => item.id === clId)[0]);
        }
        return Program ? data : allClasses
    }

    getCurrentSubjects (cl) {
        const subjectsData = this.getDataByKey('subjects');
        let currentClassSubjects;
        let data;
        if (cl) {
            currentClassSubjects = this.getDataByKey('classes').filter((cls) => cls.id === cl)[0].subjects;
            data = currentClassSubjects.map((subjId) => {
                return subjectsData.filter((item) => item.id === subjId)[0]
            })
        }
        return cl ? data : subjectsData;
    }

    getSelectedSubjectsData (list) {
        return this.state.subjects.filter((item) => list.includes(item.id))
    }

    getSubjectsData (cl, list) {
        const subcjectsList = !list.length ? this.getCurrentSubjects(cl) : list;
        return subcjectsList.map((item) => {
            return {subjectLabel: item.label, themesList: this.getClassThemesData(item)};
        })
    }

    getClassThemesData (cl) {
        return cl.themes.map((theme) => {
            return this.getThemeData(theme);
        })
    }

    getThemeData (theme) {
        return this.getDataByKey('themes').filter((item) => item.id === theme)[0];
    }

    handleChangeProgram (val) {
        const currentProgram = this.getCurrentProgram(val);
        const currentClasses = this.getCurrentClasses(currentProgram);
        const currentClass = currentClasses.filter((cl) => cl.id === this.state.currentClass).length ? this.state.currentClass : this.currentClassesList[0].id;
        const subjects = this.getCurrentSubjects(currentClass);
        const currentSubjects = [];

        this.setState({
            currentProgram: currentProgram,
            classes: currentClasses,
            currentClass: currentClass,
            subjects: subjects,
            currentSubjects: currentSubjects,
            subjectsData: this.getSubjectsData(currentClass, currentSubjects)
        })
    }

    handleChangeClass (val) {
        const currentClass = val;
        const subjects = this.getCurrentSubjects(currentClass);
        const currentSubjects = [];

        this.setState({
            currentClass: currentClass,
            subjects: subjects,
            currentSubjects: currentSubjects,
            subjectsData: this.getSubjectsData(currentClass, currentSubjects)
        })
    }

    handleChangeSubjects (val) {
        const currentSubjects = val;
        const subjectsData = this.getSubjectsData(this.state.currentClass, this.getSelectedSubjectsData(currentSubjects));

        this.setState({
            currentSubjects: currentSubjects,
            subjectsData: subjectsData
        })
    }

    render () {
        return (<div className="Program">
                    <h1>Program Page</h1>
                    <div className="Program-filters">
                        <ProgramFilter programs={ this.state.programs} currentProgram={this.state.currentProgram} handleChange={this.handleChangeProgram}/>
                        <ClassesFilter classes={this.state.classes} currentClass={this.state.currentClass} hanleChange={this.handleChangeClass}/>
                        <SubjectsFilter subjects={this.state.subjects} currentSubjects={this.state.currentSubjects} hanleChange={this.handleChangeSubjects}/>
                    </div>
                    <SubjectsList data={this.state.subjectsData}/>
                </div>)
    }
};

export default Program;