import './SignUp.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';

const SignUp = ({onUserAdded}) => {
    const [formData, setFormData] = useState({
        first_name: '',
        user_name: '',
        email: '',
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
            console.log('Sending data:', formData);
            const response = await axios.post('http://127.0.0.1:8000/api/users/', formData);
            console.log('Success response:', response.data);
            onUserAdded(response.data);
            // Clear form
            setFormData({
                first_name: '',
                user_name: '',
                email: '',
                password: ''
            });
            setError('');
        } catch (error) {
            console.log('Full error object:', error);
            console.log('Error response data:', error.response?.data);
            console.log('Error status:', error.response?.status);
            
            let errorMessage = 'Failed to create account. ';
            if (error.response?.data) {
                if (typeof error.response.data === 'object') {
                    errorMessage += Object.entries(error.response.data)
                        .map(([key, value]) => `${key}: ${value}`)
                        .join(', ');
                } else {
                    errorMessage += error.response.data;
                }
            } else if (error.message) {
                errorMessage += error.message;
            }
            setError(errorMessage);
        }
    };

    const handleCancel = () => {
        setFormData({
            first_name: '',
            user_name: '',
            email: '',
            password: ''
        });
        setError('');
        navigate('/signin'); // Navigate to sign in page
    };

    return (
        <div className="container">
            <div id="left">
                <div>
                    <h1 style={{ color: 'white', marginBottom: '20px' }}>Welcome to Task Manager</h1>
                    <p style={{ color: '#EEEEEE' }}>Create an account to start managing your tasks efficiently.</p>
                </div>
            </div>
            <div id="right">
                <div className="auth-form">
                    <h2>Create Account</h2>
                    {error && <div className="message error">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                name="first_name"
                                placeholder="Enter Name..."
                                value={formData.first_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="user_name"
                                placeholder="Enter username..."
                                value={formData.user_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter Email..."
                                value={formData.email}
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
                        <button type="submit" className="submit-btn">Create Account</button>
                        <button type="button" className="toggle-btn" onClick={handleCancel}>Cancel</button>
                        <p className="help-text">
                            Already have an account? <Link to="/signin" className="text-link">Sign In</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
