import * as React from 'react';
import { tdStyle, textareaStyle } from '../common';

const dueStyle: React.CSSProperties = {
    ...textareaStyle,
    textAlign: "center",
    width: "150px"
}

export default function Due ({due, onInput, doneStyle}: {due: string, onInput: React.FormEventHandler<HTMLTextAreaElement>, doneStyle?: React.CSSProperties}) {
    return (
        <td style={tdStyle}>
            <textarea spellCheck="false" style={{...dueStyle, ...doneStyle}} placeholder="YYYY-MM-DD HH:MM" defaultValue={due} onInput={onInput}/>
        </td>
    )
}