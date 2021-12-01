import * as React from 'react';
import { tdStyle, textareaStyle} from '../common';

const classStyle: React.CSSProperties = {
    ...textareaStyle,
    textAlign: "center",
    width: "120px"
}

export default function Class ({subject, doneStyle, onInput}: {subject: string, doneStyle?: React.CSSProperties, onInput: React.FormEventHandler<HTMLTextAreaElement>}) {
    return (
        <td style={tdStyle}><textarea style={{...classStyle, ...doneStyle}} defaultValue={subject} onInput={onInput}/></td>
    )
}