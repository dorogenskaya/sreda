import React from "react";
import {Drawer, Button} from 'antd';

export default function CreateAnswer ({match: {params: { id }}, history, location}) {
    const previousLocation = location.pathname.replace(/create-answer.*$/i, '');
    return (
        <Drawer
            title={`Добавить ответ к теме ${id}`}
            onClose={() => {history.push(previousLocation)}}
            width={720}
            visible
            style={{
                overflow: 'auto',
                height: 'calc(100% - 108px)',
                paddingBottom: '108px',
            }}
            closable={false}
        >
            <div
                style={{
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    width: '100%',
                    borderTop: '1px solid #e9e9e9',
                    padding: '10px 16px',
                    background: '#fff',
                    textAlign: 'right',
                }}
            >
                <Button
                    onClick={() => {history.push(previousLocation)}}
                    style={{ marginRight: 8 }}>
                    Отмена
                </Button>
                <Button
                    onClick={() => {history.push(previousLocation)}}
                    type="primary">
                    Отправить
                </Button>
            </div>
        </Drawer>
    );
}

