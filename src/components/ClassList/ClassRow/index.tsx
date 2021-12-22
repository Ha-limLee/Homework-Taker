import * as React from 'react';
import { textareaStyle } from '@components/VrList/src/VrRow/src/common';

export default function ClassRow ({data, style}: {data: {todo: string, due: string}, style?: React.CSSProperties}) {
    return (
        <div style={style}>
            <textarea style={{...textareaStyle, display: 'block'}} readOnly={true} value={data.todo} />
            <textarea style={{
                ...textareaStyle, display: 'block', height: '32px', textAlign: 'center'
            }}
             value={data.due}
             readOnly={true}
             />
        </div>
    );
}