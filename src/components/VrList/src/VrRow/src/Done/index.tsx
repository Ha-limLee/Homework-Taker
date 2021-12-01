import * as React from 'react';
import { tdStyle } from '../common';

export default function Done ({checked, onChange}: {checked?: boolean, onChange?: React.ChangeEventHandler<HTMLInputElement>}) {
    return (
        <td style={tdStyle}><input type="checkbox" onChange={onChange} checked={checked}/></td>
    )
}