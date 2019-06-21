import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ThemeItem extends Component {
    render () {
        const {i, data} = this.props;
        return <Link key={i} className="theme-link" to={`/themes/${data.id}`} title={data.themeName}>{data.themeName}</Link>
    }
};

ThemeItem.propTypes = {
    data: PropTypes.object.isRequired
}

export default ThemeItem;


