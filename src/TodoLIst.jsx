import React, { useState } from 'react';
import './index.css';

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [deadline, setDeadline] = useState("");

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function handleDeadlineChange(event) {
        setDeadline(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "" && deadline !== "") {
            const updatedTasks = [...tasks, { text: newTask, deadline, done: false }];
            updatedTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
            setTasks(updatedTasks);
            setNewTask("");
            setDeadline("");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function toggleDone(index) {
        const updatedTasks = [...tasks];
        updatedTasks[index].done = !updatedTasks[index].done;
        setTasks(updatedTasks);
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function getTaskClass(task) {
        if (task.done) return 'task done';        // задача сделана
        const today = new Date().setHours(0,0,0,0);
        const taskDate = new Date(task.deadline).setHours(0,0,0,0);
        if (taskDate < today) return 'task overdue';
        return 'task';
    }

    return (
        <div className="to-do-list">
            <h1>To-Do List</h1>

            <div className="input-group">
                <input
                    type="text"
                    placeholder="Enter a task..."
                    value={newTask}
                    onChange={handleInputChange}
                    className="task-input"
                />
                <input
                    type="date"
                    value={deadline}
                    onChange={handleDeadlineChange}
                    className="date-input"
                />
                <button className="add-button" onClick={addTask}>Add</button>
            </div>

            <ul className="task-list">
                {tasks.map((task, index) => (
                    <li key={index} className={getTaskClass(task)}>
                        <div className="task-info">
                            <span className="task-text">{task.text}</span>
                            <span className="task-deadline">{task.deadline}</span>
                        </div>
                        <div className="task-buttons">
                            <button onClick={() => toggleDone(index)}>
                                {task.done ? '✅' : '✔'}
                            </button>
                            <button onClick={() => moveTaskUp(index)}>☝</button>
                            <button onClick={() => moveTaskDown(index)}>👇</button>
                            <button onClick={() => deleteTask(index)}>🗑</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ToDoList;
