import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/tasks/');
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div>
            <h2>Task List</h2>
            <TaskForm onTaskAdded={fetchTasks} />
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        {task.title} - {task.completed ? "Done" : "Pending"}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
