import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AdminRouter from './components/AdminRouter.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AdminRouter />
    </React.StrictMode>
);