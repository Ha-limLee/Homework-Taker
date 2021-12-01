import * as React from 'react';
import { tdStyle } from '../common';

export default function Delete ({onClick}: {onClick: React.MouseEventHandler<HTMLInputElement>}) {
    return (
        <td style={tdStyle}><input type="button" defaultValue="X" onClick={onClick}/></td>
    )
}