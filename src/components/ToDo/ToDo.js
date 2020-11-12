import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TaskForm from '../TaskForm/TaskForm';
import ToDoList from '../ToDoList/ToDoList';

const ToDo = () => {
    document.title = 'ToDo List';
    const [todos, setTodos] = useState([]);
    const [reRender, setReRender] = useState(true);
    const [prepareUpdate, setPrepareUpdate] = useState(false);
    const [updateTask, setUpdateTask] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/allTasks')
        .then(res => res.json())
        .then(data => setTodos(data));
    }, [reRender]);

    return (
        <>
            <Link to='/' className='d-flex justify-content-center mt-5 pt-5 text-decoration-none'>
                Go to Wrod Search
            </Link>
            <div className='d-flex justify-content-start ml-3 mt-3'>
                <TaskForm setReRender={setReRender} setPrepareUpdate={setPrepareUpdate} prepareUpdate={prepareUpdate} updateTask={updateTask} />
                <ToDoList todos={todos} setReRender={setReRender} setPrepareUpdate={setPrepareUpdate} setUpdateTask={setUpdateTask} />
            </div>
        </>
    );
};

export default ToDo;