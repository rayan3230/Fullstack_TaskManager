import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onTaskAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    


    const handleSubmit = async (event) => {
        event.preventDefault();  // Prevent form from refreshing the page

        const newTask = { title, description, completed: false };

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/tasks/', newTask);
            onTaskAdded(response.data);  // Call parent function to refresh task list
            setTitle('');  // Clear the form
            setDescription('');
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Task</h2>
            <input 
                type="text" 
                placeholder="Title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required 
            />
            <textarea 
                placeholder="Description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                required 
            />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;
