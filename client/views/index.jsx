/**
 * @author : 최정우
 * @since : 2022.10.12
 * @dscription : React를 활용한 Client단 구현의 시작점(Index) Component 입니다.
 */

import React from 'react';
import ReactDom from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx';

const root = ReactDom.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);