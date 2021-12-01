import * as React from 'react';
import VrList from './components/VrList';
import {UserDataContext} from './contexts/DataContext';
import {Homework, HomeworkSet} from '@server/src/assets/user';

export default function App(){
    const {userData, dispatch} = React.useContext(UserDataContext);
    console.log(userData);

    React.useEffect(()=>{
        const saveData = () => {
            
        }
        const confirmExit = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = '';
            dispatch({type: 'save'});

            return 'warn';
        }

        window.addEventListener('beforeunload', confirmExit);
        window.addEventListener('unload', saveData);
        return () => {
            window.removeEventListener('unload', saveData);
            window.removeEventListener('beforeunload', confirmExit);
        }
    }, [])

    const homeworkSet: HomeworkSet = userData.data;

    const homeworksdone: {data: Homework, key: string}[] = [];
    const homeworks: {data: Homework, key: string}[] = [];
    
    const keys = Object.keys(homeworkSet);
    keys.forEach((key) => {
        const val = homeworkSet[key];
        if (val.done)
            homeworksdone.push({data: val, key: key})
        else if (val)
            homeworks.push({data: val, key: key});
    })

    homeworksdone.sort((a, b)=>{
        if (!(a.data.due)) return 1;
        else if (!(b.data.due)) return -1;
        else if (a.data.due < b.data.due) return -1;
        else return 1;
    });
    homeworks.sort((a, b)=>{
        if (!(a.data.due)) return 1;
        else if (!(b.data.due)) return -1;
        else if (a.data.due < b.data.due) return -1;
        else return 1;
    })
    

    /**
    fetch('/userData').then((res) => {
        return res.json();
    }).then((json) => {
        console.log(JSON.parse(json));
    });
     */

    return (
        <div style={{margin: "auto", width: "fit-content"}}>
            <table>
                <thead>
                    <tr>
                        <th>Done</th>
                        <th>Class</th>
                        <th>Due</th>
                        <th>Todo</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <VrList data={homeworks} dispatch={dispatch}/>
                    <tr>
                        <td colSpan={5}>
                        <input style={{width: "100%"}} type='button' defaultValue='Add' onClick={()=>dispatch({type: 'add'})}/>
                        </td>
                    </tr>
                    <VrList data={homeworksdone} dispatch={dispatch}/>
                </tbody>
            </table>
        </div>
    )
}