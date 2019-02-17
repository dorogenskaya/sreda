import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

class ProgrammFilter extends Component {
    getDefaultValue () {
        return this.props.currentProgramm ? this.props.currentProgramm.id : '';
    }

    render () {
        const Option = Select.Option;
        const children = this.props.programms.map((item, i)=> <Option key={i} value={item.id}>{item.label}</Option>)
        return <div className="filter-block">
            <div className="field">
                <label htmlFor="programms-filter">Programms</label>
                <Select
                    id={'programms-filter'}
                    style={{ width: '100%' }}
                    placeholder={'Please, select programm'}
                    allowClear={true}
                    defaultValue={this.getDefaultValue()}
                    onChange={this.props.handleChange}
                >
                    {children}
                </Select>
            </div>
        </div>
    }
};

ProgrammFilter.propTypes = {
    programms: PropTypes.array.isRequired
}

export default ProgrammFilter;


