import React from 'react';
import Button from 'antd/lib/button';

export default class Like extends React.Component {
    render() {
        return (
            <Button
                type={this.props.liked? "default"  : "primary"}
                onClick={this.props.handleLike}
                icon={this.props.liked? "dislike" : "like"}
            >
            </Button>
        )
    }
}