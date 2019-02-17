import PropTypes from 'prop-types';
import {Pagination} from 'antd';

Pagination.propTypes = {
    total: PropTypes.number.isRequired,
    pageSize:PropTypes.number.isRequired,
    onChange:PropTypes.func.isRequired,
    current:PropTypes.number.isRequired,
    hideOnSinglePage:PropTypes.bool.isRequired
};

export default Pagination;