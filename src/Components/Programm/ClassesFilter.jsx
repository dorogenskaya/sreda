import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

class ClassesFilter extends Component {
    getDefaultValue () {
        return this.props.currentClass ? this.props.currentClass : '';
    }

    render () {
        const Option = Select.Option;
        const children = [];
        this.props.classes.map((item, i)=> children.push(<Option key={i} value={item.id}>{item.label}</Option>))
        return <div className="filter-block">
            <div className="field">
                <label htmlFor="classes-filter">Classes</label>
                <Select
                    id={'classes-filter'}
                    placeholder={'Please, select class'}
                    style={{ width: '100%' }}
                    allowClear={true}
                    defaultActiveFirstOption={true}
                    value={this.getDefaultValue()}
                    onChange={this.props.hanleChange}
                >
                    {children}
                </Select>
            </div>
        </div>
    }
};

ClassesFilter.propTypes = {
    classes: PropTypes.array.isRequired
}

export default ClassesFilter;


