import * as React from 'react';
import {UserData, Homework} from '@server/src/assets/user';
import * as clone from '../helper/clone';

type UserDataAction =
| {type: 'init', value: UserData}
| {type: 'add', value?: Homework}
| {type: 'delete', key: string}
| {type: 'save'}
| {type: 'done', key: string}
| {type: 'due', key: string, value: string}
| {type: 'class', key: string, value: string}
| {type: 'todo', key: string, value: string}

const UserDataContext = React.createContext({} as {userData: UserData, dispatch: React.Dispatch<UserDataAction>});

function userDataReducer(state: UserData, action: UserDataAction): UserData {
    switch (action.type) {
        case 'init':
            return action.value as UserData;
        case 'add':
            const next = state.removed.pop();
            const added = action?.value || {class: ' ', todo: ' ', due: '', done: false};
            
            return clone.produce(state, (copy: UserData) => {
                if (next)
                    copy.data[next] = added
                else {
                    const last = (Number(state.last) + 1).toString();
                    console.log('last: ' + last);
                    copy.last = last;
                    copy.data[last] = added;
                }
            });
        case 'delete':
            return clone.produce(state, (copy: UserData) => {
                const target = action.key;
                delete copy.data[target];
                copy.removed.push(target);
            });
        case 'save':
            fetch('/saveData', {
                method: 'POST',
                body: JSON.stringify(state),
                keepalive: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json());
            return state;
        case 'done':
            return clone.produce(state, (copy: UserData) => {
                const target = action.key;
                copy.data[target].done = !(copy.data[target].done)
            })
        case 'due':
            return clone.produce(state, (copy: UserData) => {
                copy.data[action.key].due = action.value;
            })
        case 'class':
            console.log('class change');
            return clone.produce(state, (copy: UserData) => {
                copy.data[action.key].class = action.value;
            })
        case 'todo':
            console.log('todo change');
            return clone.produce(state, (copy: UserData) => {
                copy.data[action.key].todo = action.value;
            })
        default:
            return state;
    }
}

const initUserData = () => {
    fetch('/userData').then((res) => {
        return res.json();
    }).then((json) => {
        console.log(JSON.parse(json));
    })
};

function UserDataProvider({children}: {children: React.ReactNode}) {
    const [userData, dispatch] = React.useReducer(userDataReducer, undefined as UserData);
    React.useEffect(() => {
        fetch('/userData').then((res) => {
            return res.json();
        }).then((json) => {
            const loaded: UserData = JSON.parse(json);
            dispatch({type: 'init', value: loaded});
            console.log("in DataContext.tsx\n" + loaded);
        })
    }, []);

    return (
        <UserDataContext.Provider value={{userData, dispatch}}>
            {userData ? children : "fetching now"}
        </UserDataContext.Provider>
    )
}

export {UserDataContext, UserDataProvider, UserDataAction};