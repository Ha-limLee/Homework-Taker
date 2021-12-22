import * as React from 'react';
import {Homework} from '@server/src/assets/user';
import {UserDataAction} from '@contexts/DataContext';
import Done from './src/Done';
import Class from './src/Class';
import Due from './src/Due';
import Todo from './src/Todo';
import Delete from './src/Delete';

const debounce = (fn: Function, timeout=300) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
        clearTimeout(timer);
        timer = setTimeout(()=>fn.apply(this, args), timeout);
    }
}

const validate = (value: string) => {
    // YYYY-MM-DD HH:MM
    const rule = [4, 2, 2, 2, 2];
    const arr = value.match(/\d+/g);
    return arr?.every((val, idx) => val.length === rule[idx]);
}

export default function VrRow({id, task, style, dispatch}: {id: string, task: Homework, style: React.CSSProperties, dispatch: React.Dispatch<UserDataAction>}) {
    const onDueChange = React.useCallback(
        debounce((e: React.ChangeEvent<HTMLInputElement>)=>{
            const value = e.target.value;
            if (validate(value)) {
                e.target.style.textDecoration = "";
                e.target.style.textDecorationColor = "";
                dispatch({type: 'due', key: id, value: e.target.value});
            }
            else {
                e.target.style.textDecoration = "underline";
                e.target.style.textDecorationColor = "red";
            }
        }, 1000)
    , []);

    const onDoneChange = React.useCallback(
        ()=>dispatch({type: 'done', key: id})
    , []);

    const onClassChange = React.useCallback(
        debounce((e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            dispatch({type: 'class', key: id, value: value});
        }, 1000)
    , []);

    const onTodoChange = React.useCallback(
        debounce((e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            dispatch({type: 'todo', key: id, value: value})
        }, 1000)
    , []);

    const onDelete = React.useCallback( ()=>{
        const ok = confirm("Delete this?")
        if (ok) dispatch({type: 'delete', key: id})}
    , []);

    let doneStyle: React.CSSProperties;
    if (task.done) {
        doneStyle = {
            textDecorationLine: "line-through",
            textDecorationThickness: "20%",
        };
    } else {
        doneStyle = {};
    }

    return (
        <tr style={{...doneStyle, ...style}}>
            <Done checked={task.done} onChange={onDoneChange}/>
            <Class doneStyle={doneStyle} subject={task.class} onInput={onClassChange}/>
            <Due doneStyle={doneStyle} due={task.due} onInput={onDueChange} />
            <Todo doneStyle={doneStyle} todo={task.todo} onInput={onTodoChange}/>
            <Delete onClick={onDelete}/>
        </tr>
    );
}