import * as React from 'react';
import {textareaStyle, tdStyle} from '../common';

const todoStyle: React.CSSProperties = {
    ...textareaStyle,
    width: "240px"
}

export default function Todo ({todo, doneStyle, onInput}: {todo: string, doneStyle?: React.CSSProperties, onInput: React.FormEventHandler<HTMLTextAreaElement>}) {
    return (
        <td style={tdStyle}><textarea spellCheck="false" style={{...todoStyle, ...doneStyle}} defaultValue={todo} onInput={onInput}/></td>
    )
}