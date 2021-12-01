import * as React from 'react';
import {UserDataContext} from '../contexts/DataContext';

export default function Blank() {
    const {userData} = React.useContext(UserDataContext);
    return (
        <>
            {JSON.stringify(userData)}
        </>
    )
}