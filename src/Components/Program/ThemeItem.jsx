import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ThemeItem extends Component {
    render () {
        const {i, data} = this.props;
        return <li key={i} className="theme-item">
            <Link className="theme-link" to={data.url} title={data.label}>{data.label}</Link>
        </li>
    }
};

ThemeItem.propTypes = {
    data: PropTypes.object.isRequired
}

export default ThemeItem;


