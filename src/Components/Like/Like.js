import React from 'react';
import './Like.css';
import Icon from '../Icon/Icon';
// import PropTypes from 'prop-types';


class Like extends React.Component {
    render() {
        return (
            <div>
                {this.props.liked && <Icon />}
                <div>
                    <button type="button" className="btn no-outline btn-secondary" onClick={this.props.toggleLike}>

                        <i
                            className="fa fa-thumbs-o-up fa-4 align-middle"
                            aria-hidden="true"
                        />
                        &nbsp;
                        <span className="align-middle">Like</span>
                    </button>
                </div>
            </div>
        )
    }
}

export default Like;
