import * as React from 'react';
import * as ReactDom from 'react-dom';
import {UserDataProvider} from './contexts/DataContext';
import App from './App';

ReactDom.render(
    <UserDataProvider>
        <App/>
    </UserDataProvider>,
    document.getElementById("root")
);