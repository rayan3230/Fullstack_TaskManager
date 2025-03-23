import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
            onUserAdded(response.data.user);
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
        <div className="container">
            <div id="left">
                <div>
                    <h1 style={{ color: 'white', marginBottom: '20px' }}>Welcome to Task Manager</h1>
                    <p style={{ color: '#EEEEEE' }}>Sign in to your account to start managing your tasks efficiently.</p>
                </div>
            </div>
            <div id="right">
                <div className="auth-form">
                    <h2>Sign In</h2>
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
                        <button type="submit" className="submit-btn">Sign In</button>
                        <button type="button" className="toggle-btn" onClick={handleCancel}>Cancel</button>
                        <p className="help-text">
                            Don't have an account? <Link to="/signup" className="text-link">Sign Up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;