import * as React from 'react';
import {Homework} from '@server/src/assets/user';
import {UserDataAction} from '@contexts/DataContext';
import VrRow from './src/VrRow';

const colors = [{backgroundColor: '#59856a'}, {backgroundColor: '#808080'}];

export default function VrList({data, dispatch}: {data: {data: Homework, key: string}[], dispatch: React.Dispatch<UserDataAction>}) {
    return (
        <>
            {data.map((each, idx) => <VrRow style={colors[idx % 2]} key={each.key} id={each.key} task={each.data} dispatch={dispatch}/>)}
        </>
    )
}