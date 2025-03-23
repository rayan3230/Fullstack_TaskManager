import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/shared.css';

const TaskForm = ({ onTaskAdded, userId }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Current userId:', userId); // Debug log
        
        if (!userId) {
            setError('User ID is required to create a task');
            return;
        }

        setIsSubmitting(true);
        setError('');

        const newTask = { 
            title, 
            description, 
            completed: false,
            user: userId // Add user field
        };

        console.log('Sending task data:', newTask); // Debug log

        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/tasks/`, newTask);
            console.log('Task creation response:', response.data); // Debug log
            onTaskAdded(response.data);
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error("Error creating task:", error.response?.data || error); // Enhanced error logging
            setError(error.response?.data?.detail || 'Failed to create task. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-dark)' }}>Add New Task</h2>
            {error && <div className="message error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder="Task title" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <textarea 
                        placeholder="Task description" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        required 
                    />
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isSubmitting || !userId}
                    style={{ width: '100%' }}
                >
                    {isSubmitting ? 'Adding Task...' : 'Add Task'}
                </button>
            </form>
        </div>
    );
};

export default TaskForm;
