import React from 'react';

const ToDoList = ({ todos, setReRender, setPrepareUpdate, setUpdateTask }) => {

    const handleDelete = (id) => {
        fetch(`https://quiet-eyrie-87850.herokuapp.com/delete/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(isDeleted => {
            if(isDeleted) setReRender(prevValue => !prevValue);
        })
    }
    
    return (
        <table className="table m-4">
            <thead>
                <tr>
                    <th scope="col">Task Name</th>
                    <th scope="col">Start Time</th>
                    <th scope="col">End Time</th>
                    <th scope="col">Date</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    todos.map(todo => {
                        return <tr>
                            <td>{todo.taskName}</td>
                            <td>{todo.startTime}</td>
                            <td>{todo.endTime}</td>
                            <td>{todo.date}</td>
                            <td>
                                <button className='btn btn-primary m-2' onClick={() => {setPrepareUpdate(true); setUpdateTask(todo)}}>Update</button>
                                <button className='btn btn-danger m-2' onClick={() => handleDelete(todo._id)}>Delete</button>
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    );
};

export default ToDoList;