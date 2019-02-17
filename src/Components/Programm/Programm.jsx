import React, {Component} from 'react';
import programmData from './testProgrammData';
import ProgrammFilter from './ProgrammFilter';
import ClassesFilter from './ClassesFilter';
import SubjectsFilter from './SubjectsFilter';
import SubjectsList from './SubjectList';
import './Programm.css';

class Programm extends Component {
    constructor(props) {
        super(props);

        this.collectLoadData();

        this.state = {
            programms: this.proggramsList,
            currentProgramm: this.currentProgramm,
            classes: this.currentClassesList,
            currentClass: this.currentClass,
            subjects: this.subjectsList,
            currentSubjects: this.currentSubjectList,
            subjectsData: this.subjectsData
        }
        this.handleChangeProgramm = this.handleChangeProgramm.bind(this);
        this.handleChangeClass = this.handleChangeClass.bind(this);
        this.handleChangeSubjects = this.handleChangeSubjects.bind(this);
    }

    getDataByKey = (key) => programmData[key];

    collectLoadData () {
        this.proggramsList = this.getDataByKey('programms');
        this.currentProgramm = this.getCurrentProgramm();
        this.currentClassesList = this.getCurrentClasses(this.currentProgramm);
        this.currentClass = this.currentClassesList[0].id;
        this.subjectsList = this.getCurrentSubjects(this.currentClass);
        this.currentSubjectList = [];
        this.subjectsData = this.getSubjectsData(this.currentClass, this.currentSubjectList);
    }

    getCurrentProgramm (programm = this.getDataByKey('defaultProgramm')) {
        return !programm ? null : this.getDataByKey('programms').filter((item) => item.id === programm)[0];
    }

    getCurrentClasses (programm) {
        const allClasses = this.getDataByKey('classes');
        let data;
        if (programm) {
            data = programm.classes.map((clId) => allClasses.filter((item) => item.id === clId)[0]);
        }
        return programm ? data : allClasses
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
        return this.subjectsList.filter((item) => list.includes(item.id))
    }

    getSubjectsData (cl, list) {
        const subcjectsList = !list.length ? this.subjectsList : list;
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

    handleChangeProgramm (val) {
        this.currentProgramm = this.getCurrentProgramm(val);
        this.currentClassesList = this.getCurrentClasses(this.currentProgramm);
        this.currentClass = this.currentClassesList.filter((cl) => cl.id === this.currentClass).length ? this.currentClass : this.currentClassesList[0].id;
        this.subjectsList = this.getCurrentSubjects(this.currentClass);
        this.currentSubjectList = [];
        this.subjectsData = this.getSubjectsData(this.currentClass, this.currentSubjectList);
        this.setState({
            currentProgramm: this.currentProgramm,
            classes: this.currentClassesList,
            currentClass: this.currentClass,
            subjects: this.subjectsList,
            currentSubjects: this.currentSubjectList,
            subjectsData: this.subjectsData
        })
    }

    handleChangeClass (val) {
        this.currentClass = val;
        this.subjectsList = this.getCurrentSubjects(this.currentClass);
        this.currentSubjectList = [];
        this.subjectsData = this.getSubjectsData(this.currentClass, this.currentSubjectList);
        this.setState({
            currentClass: this.currentClass,
            subjects: this.subjectsList,
            currentSubjects: this.currentSubjectList,
            subjectsData: this.subjectsData
        })
    }

    handleChangeSubjects (val) {
        this.currentSubjectList = val;
        this.subjectsData = this.getSubjectsData(this.currentClass, this.getSelectedSubjectsData(this.currentSubjectList));
        this.setState({
            currentSubjects: this.currentSubjectList,
            subjectsData: this.subjectsData
        })
    }

    render () {
        return <div className="programm">
            <h1>Programm Page</h1>
            <div className="programm-filters">
                <ProgrammFilter programms={ this.state.programms} currentProgramm={this.state.currentProgramm} handleChange={this.handleChangeProgramm}/>
                <ClassesFilter classes={this.state.classes} currentClass={this.state.currentClass} hanleChange={this.handleChangeClass}/>
                <SubjectsFilter subjects={this.state.subjects} currentSubjects={this.state.currentSubjects} hanleChange={this.handleChangeSubjects}/>
            </div>
            <SubjectsList data={this.state.subjectsData}/>
        </div>
    }
};

export default Programm;