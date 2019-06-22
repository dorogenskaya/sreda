import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ThemeItem extends Component {
    render () {
        const {i, data, id} = this.props;
        return <Link key={id} className="theme-link" to={`/themes/${data.id}`} title={data.themeName}>{data.themeName}</Link>
    }
};

ThemeItem.propTypes = {
    data: PropTypes.object.isRequired
}

export default ThemeItem;


