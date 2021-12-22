import * as React from 'react';

import ClassRow from './ClassRow';

const containerStyle: React.CSSProperties = {
    display: 'inline-flex',
    flexDirection: 'column',
    margin: '10px'
};

const rowStyle: React.CSSProperties = {
    backgroundColor: '#59856a',
    marginTop: '2px',
    marginBottom: '2px',
};

const rowStyles = [rowStyle, {...rowStyle, backgroundColor: '#808080'}];

export default function ClassList ({subject, data}: {subject: string, data: {todo: string, due: string}[]}) {
    return (
        <div style={containerStyle}>
            <div style={{alignSelf: 'center', fontWeight: 'bold'}}>
                {subject}
            </div>
            {data.map((val, idx) => <ClassRow data={val} style={rowStyles[idx % 2]}/>)}
        </div>
    );
}