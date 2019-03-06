import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

class SubjectsFilter extends Component {
    render () {
        const {currentSubjects, subjects, hanleChange} = this.props;
        const Option = Select.Option;
        const children = [];
        const defaultValue = !currentSubjects.length ? [] : currentSubjects;
        subjects.map((item, i)=> children.push(<Option key={i} value={item.id}>{item.label}</Option>))
        return (<div className="filter-block">
                    <div className="field">
                        <label htmlFor="subjects-filter">Subjects</label>
                        <Select
                            mode={'tags'}
                            placeholder={'Please, select subjects'}
                            id={'subjects-filter'}
                            allowClear={true}
                            style={{ width: '100%' }}
                            value={defaultValue}
                            onChange={hanleChange}
                            autoClearSearchValue={true}
                        >
                            {children}
                        </Select>
                    </div>
                 </div>)
    }
};

SubjectsFilter.propTypes = {
    subjects: PropTypes.array.isRequired
}

export default SubjectsFilter;


