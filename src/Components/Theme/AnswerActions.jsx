import React from 'react';
import Toggle from '../common/Toggle';
import CoinCount from './CoinCount';
import {Button, Icon} from 'antd';

class AnswerActions extends React.Component{
    render () {
        const {answer, user} = this.props;
        return (
            <div className="Answer__actions" >
                <Toggle
                    className="Answer__action"
                    handleToggle={this.props.handleLike}
                    toggled={answer.liked}
                    iconOn = "like"
                    iconOff= "like"
                />
                <CoinCount
                    className="Answer__action"
                    likerList={answer.likerList}
                />

                {user && user.uid === answer.creator.creatorId ? (
                    <Button type="danger"
                            style={{ width: "100%", height: 42}}
                            onClick={this.props.handleDelete}>
                        <Icon type="delete" />
                        <span >Удалить ответ</span>
                    </Button>
                ) : (
                    <Toggle
                        className="Answer__action"
                        handleToggle={this.props.handleFavorite}
                        toggled= {answer.favorite}
                        iconOn = "star"
                        iconOff= "star"
                    />
                    )
                }
            </div>
        );
    }
}

export default AnswerActions;