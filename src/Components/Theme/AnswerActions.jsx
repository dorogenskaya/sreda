import React from 'react';
import Like from '../Like/Like';
import CoinCount from './CoinCount';
import Button from 'antd/lib/button';
// import PropTypes from 'prop-types';

class AnswerActions extends React.Component{
    render () {
        return (
            <div className="Answer__actions" >
                <div>
                    <Like
                        handleLike={this.props.handleLike}
                        liked={this.props.answer.liked}
                    />
                    <CoinCount
                        likerList={this.props.answer.likerList}
                    />
                </div>

                <Button
                    type="default"
                    className="ant-btn"
                    icon="star">
                </Button>
            </div>
        );
    }
}

export default AnswerActions;
