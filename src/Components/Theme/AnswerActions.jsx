import React from 'react';
import Like from './Like';
import CoinCount from './CoinCount';
import Button from 'antd/lib/button';

class AnswerActions extends React.Component{
    render () {
        return (
            <div className="Answer__actions" >
                <Like
                    className="Answer__action"
                    handleLike={this.props.handleLike}
                    liked={this.props.answer.liked}
                />
                <CoinCount
                    className="Answer__action"
                    likerList={this.props.answer.likerList}
                />
                <Button
                    className="ant-btn Answer__action"
                    icon="star">
                </Button>
            </div>
        );
    }
}

export default AnswerActions;