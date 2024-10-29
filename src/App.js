import React from 'react';
import './App.css';
import TaskList from './components/TaskList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
    return (
        <div className="app">
            <h1>Task Manager</h1>
            <TaskList />
            <ToastContainer />
        </div>
    );
}

export default App;
