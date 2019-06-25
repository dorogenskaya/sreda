import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SubjectItem from './SubjectItem';

class SubjectList extends Component {
    render () {
        return <div className="subjects-list">{
            this.props.data.map((item, i) => <SubjectItem
                key={i}
                data={item}
                subjectLabel={item.subjectLabel}
                themesList={item.themesList}/>)
            }
        </div>
    }
};

SubjectList.propTypes = {
    data: PropTypes.array.isRequired
}

export default SubjectList;


