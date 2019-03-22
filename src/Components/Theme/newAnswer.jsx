import React from "react";
import {Drawer, Button} from 'antd';

export default class NewAnswer extends React.Component {

    render() {
        const { visible, onClose } = this.props;
        return (
            <Drawer
                title="Create a new account"
                width={720}
                onClose={onClose}
                visible={visible}
                style={{
                    overflow: 'auto',
                    height: 'calc(100% - 108px)',
                    paddingBottom: '108px',
                }}
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
                    <Button onClick={onClose} style={{ marginRight: 8 }}>
                        Cancel
                    </Button>
                    <Button onClick={onClose} type="primary">
                        Submit
                    </Button>
                </div>
            </Drawer>
        );
    }
}