import React, { useEffect, useState } from 'react';

const TaskForm = ({ setReRender, setPrepareUpdate, prepareUpdate, updateTask }) => {

    const [taskName, setTaskName] = useState('');
    const [fromTime, setFromTime] = useState(null);
    const [toTime, setToTime] = useState(null);
    const [date, setDate] = useState(null);

    useEffect(() => {
        if (prepareUpdate) {
            setTaskName(updateTask.taskName);
            setFromTime(updateTask.startTime);
            setToTime(updateTask.endTime);
            setDate(updateTask.date);
        } else {
            setTaskName('');
            setFromTime('');
            setToTime('');
            setDate('');
        }

    }, [prepareUpdate]);

    const handleAdd = (e) => {
        e.preventDefault();
        const task = {
            taskName: taskName,
            startTime: fromTime,
            endTime: toTime,
            date: date
        };

        fetch('https://quiet-eyrie-87850.herokuapp.com/addTask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        })
            .then(res => res.json())
            .then(isInserted => {
                if (isInserted) {
                    setReRender(prevValue => !prevValue);
                    setTaskName('');
                    setFromTime('');
                    setToTime('');
                    setDate('');
                }
            })
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        setPrepareUpdate(false);
        const updatedTask = {
            taskName: taskName,
            startTime: fromTime,
            endTime: toTime,
            date: date
        }
        fetch(`https://quiet-eyrie-87850.herokuapp.com/update/${updateTask._id}`, {
            method: "PATCH",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(updatedTask)
        })
            .then(res => res.json())
            .then(isUpdated => {
                if (isUpdated) {
                    setPrepareUpdate(false);
                    setReRender(prevValue => !prevValue);
                }
            })
    }

    return (
        <form>
            <label className='mr-2'>Task Name</label>  <br />
            <input type='text' onChange={(e) => setTaskName(e.target.value)} value={taskName} /> <br />
            <label className='mr-2'>Start Time</label>  <br />
            <input type='time' onChange={(e) => setFromTime(e.target.value)} value={fromTime} /> <br />
            <label className='mr-2'>End Time</label>  <br />
            <input type='time' onChange={(e) => setToTime(e.target.value)} value={toTime} /> <br />
            <label className='mr-2'>Date</label>  <br />
            <input type='date' onChange={(e) => setDate(e.target.value)} value={date} /> <br />
            {
                prepareUpdate ?
                    <>
                        <button className='btn btn-primary mt-3 w-25 mr-1' onClick={handleUpdate}>Update</button>
                        <button className='btn btn-primary mt-3 w-25 ml-1' onClick={() => setPrepareUpdate(false)}>Reset</button>
                    </>
                    :
                    <button className='btn btn-primary mt-3 w-100' onClick={handleAdd}>Add</button>
            }
        </form>
    );
};

export default TaskForm;