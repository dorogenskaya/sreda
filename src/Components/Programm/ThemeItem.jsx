import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ThemeItem extends Component {
    render () {
        return <li key={this.props.i} className="theme-item">
            <Link className="theme-link" to={this.props.data.url} title={this.props.data.label}>{this.props.data.label}</Link>
        </li>
    }
};

ThemeItem.propTypes = {
    data: PropTypes.object.isRequired
}

export default ThemeItem;


