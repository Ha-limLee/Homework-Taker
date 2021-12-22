import * as React from 'react';
import {Route, Routes, Link} from 'react-router-dom';
import Home from './pages/Home';
import Classes from './pages/Classes';

export default function App() {
    return (
        <>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='Class' element={<Classes/>} />
        </Routes>
        </>
    );
}