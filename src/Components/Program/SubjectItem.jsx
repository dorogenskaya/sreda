import React, {Component} from 'react';
import PropTypes  from 'prop-types';
import ThemeItem from './ThemeItem';

class SubjectItem extends Component {
    render () {
        return (<div className="subject-item">
            <h3 className="subject-item-title">{this.props.subjectLabel}</h3>
            <div className="themes-list">
                {this.props.themesList.map((theme, i) => <ThemeItem key={i} data={theme}/>)}
            </div>
        </div>)
    }
};

SubjectItem.propTypes = {
    subjectLabel: PropTypes.string.isRequired,
    themesList: PropTypes.array.isRequired
}

export default SubjectItem;


