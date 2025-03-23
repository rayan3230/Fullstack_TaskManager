import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import '../../styles/shared.css';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Get user data from localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
            const parsedUser = JSON.parse(userData);
            console.log('Retrieved user data:', parsedUser); // Debug log
            setUser(parsedUser);
        }
    }, []);

    const fetchTasks = async () => {
        if (!user) {
            console.log('No user data available'); // Debug log
            return;
        }
        
        try {
            setLoading(true);
            console.log('Fetching tasks for user:', user.id); // Debug log
            const response = await axios.get(`http://127.0.0.1:8000/api/tasks/`);
            console.log('Tasks response:', response.data); // Debug log
            // Filter tasks for the current user
            const userTasks = response.data.filter(task => task.user === user.id);
            setTasks(userTasks);
            setError('');
        } catch (error) {
            console.error("Error fetching tasks:", error.response?.data || error);
            setError('Failed to load tasks. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleToggleComplete = async (taskId, currentStatus) => {
        if (!user) return;

        try {
            console.log('Updating task:', taskId, 'to status:', !currentStatus); // Debug log
            await axios.patch(`http://127.0.0.1:8000/api/tasks/${taskId}/`, {
                completed: !currentStatus
            });
            fetchTasks();
        } catch (error) {
            console.error("Error updating task:", error.response?.data || error);
            setError('Failed to update task status. Please try again.');
        }
    };

    useEffect(() => {
        if (user) {
            fetchTasks();
        }
    }, [user]);

    if (!user) {
        return (
            <div className="page-container">
                <div className="card">
                    <p style={{ textAlign: 'center', color: 'var(--secondary-color)' }}>
                        Please log in to view and manage your tasks.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <div className="card">
                <h1 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--text-dark)' }}>Task Manager</h1>
                <TaskForm onTaskAdded={fetchTasks} userId={user.id} />
            </div>

            <div className="card tasks-container">
                <div className="tasks-header">
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--text-dark)' }}>Your Tasks</h2>
                </div>
                
                <div className="tasks-content">
                    {loading && <p>Loading tasks...</p>}
                    {error && <div className="message error">{error}</div>}
                    
                    {!loading && !error && (
                        tasks.length === 0 ? (
                            <p style={{ color: 'var(--secondary-color)', textAlign: 'center', padding: '2rem' }}>
                                No tasks yet. Add your first task above!
                            </p>
                        ) : (
                            <ul className="task-list">
                                {tasks.map(task => (
                                    <li key={task.id} className="task-item">
                                        <div className="task-title">
                                            <h3 style={{ margin: '0 0 0.5rem 0' }}>{task.title}</h3>
                                            <p style={{ margin: 0, color: 'var(--secondary-color)', fontSize: '0.9rem' }}>
                                                {task.description}
                                            </p>
                                        </div>
                                        <button
                                            className={`task-status ${task.completed ? 'status-completed' : 'status-pending'}`}
                                            onClick={() => handleToggleComplete(task.id, task.completed)}
                                        >
                                            {task.completed ? "Completed" : "Pending"}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskList;
