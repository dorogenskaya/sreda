import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ThemeItem extends Component {
    render () {
        const {i, data} = this.props;
        return <Link key={i} className="theme-link" to={data.url} title={data.label}>{data.label}</Link>
    }
};

ThemeItem.propTypes = {
    data: PropTypes.object.isRequired
}

export default ThemeItem;


