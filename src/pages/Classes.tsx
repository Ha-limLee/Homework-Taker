import * as React from 'react';

import { UserDataContext } from '@contexts/DataContext';
import { HomeworkSet, Homework } from '@server/src/assets/user';

import ClassList from '../components/ClassList';

type cell = {
    todo: string;
    due: string;
}

const centerContainer: React.CSSProperties = {
    width: '80%',
    margin: 'auto',
};

export default function Classes () {
    const {userData, dispatch} = React.useContext(UserDataContext);
    const homeworkSet: HomeworkSet = userData.data;
    
    const classified: {[key: string]: cell[]} = {};

    Object.values(homeworkSet).forEach((val) => {
        if (val.done || val.class === '') return;

        let obj = {...val} as cell;
        if (!classified[val.class]) {
            classified[val.class] = [obj];
        } else {
            classified[val.class].push(obj);
        }
    });

    Object.values(classified).forEach((arr) => {
        arr.sort((a, b)=>{
            if (!(a.due)) return 1;
            else if (!(b.due)) return -1;
            else if (a.due < b.due) return -1;
            else return 1;
        });
    });

    const headers = Object.keys(classified);

    console.log(classified);

    return (
        <div style={centerContainer}>
            {headers.map(subject =>
                <ClassList subject={subject} data={classified[subject]}/>
            )}
        </div>
    );
}