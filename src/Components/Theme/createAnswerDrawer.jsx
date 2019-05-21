import React from "react";
import {Drawer} from 'antd';
import AddNewAnswer from '../Forms/AddAnswerForm';

export default function CreateAnswerDrawer ({match: {params: { id }}, history, location, themeId}) {
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
            <AddNewAnswer
                id={id}
                themeId={themeId}
                history={history}
                previousLocation={previousLocation}
                subjectActive={"Алгебра"}
            />
        </Drawer>
    );
}