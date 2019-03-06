import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

class ProgramFilter extends Component {
    getDefaultValue () {
        return this.props.currentProgram ? this.props.currentProgram.id : '';
    }

    render () {
        const {programs, handleChange} = this.props;
        const Option = Select.Option;
        const children = programs.map((item, i)=> <Option key={i} value={item.id}>{item.label}</Option>)

        return (<div className="filter-block">
                    <div className="field">
                        <label htmlFor="Programs-filter">Programs</label>
                        <Select
                            id={'Programs-filter'}
                            style={{ width: '100%' }}
                            placeholder={'Please, select Program'}
                            allowClear={true}
                            value={this.getDefaultValue()}
                            onChange={handleChange}
                        >
                            {children}
                        </Select>
                    </div>
                </div>)
    }
};

ProgramFilter.propTypes = {
    programs: PropTypes.array.isRequired,
}

export default ProgramFilter;