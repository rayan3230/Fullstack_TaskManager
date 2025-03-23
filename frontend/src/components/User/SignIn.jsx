import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/shared.css';

const SignIn = ({onUserAdded}) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login/', formData);
            console.log('Success response:', response.data);
            
            // Store user data in localStorage
            const userData = response.data.user;
            localStorage.setItem('user', JSON.stringify(userData));
            
            // Update app state
            onUserAdded(userData);
            setError('');
            navigate('/tasks');
        } catch (error) {
            console.error('Login error:', error);
            setError(error.response?.data?.error || 'Failed to sign in. Please check your credentials.');
        }
    };

    const handleCancel = () => {
        setFormData({
            username: '',
            password: ''
        });
        setError('');
        navigate('/signup'); // Navigate to sign up page
    };

    return (
        <div className="auth-container">
            <div className="auth-left">
                <div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Welcome to Task Manager</h1>
                    <p style={{ fontSize: '1.2rem', opacity: '0.9' }}>
                        Sign in to your account to start managing your tasks efficiently.
                    </p>
                </div>
            </div>
            <div className="auth-right">
                <div className="auth-form">
                    <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--text-dark)' }}>Sign In</h2>
                    {error && <div className="message error">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                name="username"
                                placeholder="Enter username..."
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter Password..."
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary" style={{width: '100%', marginBottom: '1rem'}}>
                                Sign In
                            </button>
                        </div>
                        <div className="auth-links">
                            <p style={{ color: 'var(--secondary-color)' }}>
                                Don't have an account? <Link to="/signup" className="text-link">Sign Up</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;