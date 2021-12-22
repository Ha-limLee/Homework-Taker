import * as React from 'react';
import * as ReactDom from 'react-dom';
import {UserDataProvider} from './contexts/DataContext';
import {BrowserRouter} from 'react-router-dom';
import App from './App';

ReactDom.render(
    <BrowserRouter>
    <UserDataProvider>
        <App/>
    </UserDataProvider>
    </BrowserRouter>,
    document.getElementById("root")
);