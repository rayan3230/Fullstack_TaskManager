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
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Clear error for the field being changed
        setErrors({
            ...errors,
            [e.target.name]: ''
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/users/', formData);
            console.log('Success response:', response.data);
            
            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify(response.data));
            
            // Update app state
            onUserAdded(response.data);
            
            // Clear form
            setFormData({
                first_name: '',
                user_name: '',
                email: '',
                password: ''
            });
            setErrors({});
            navigate('/tasks');
        } catch (error) {
            console.log('Error response:', error.response?.data);
            
            const errorData = error.response?.data || {};
            const newErrors = {};
            
            // Handle specific field errors
            if (errorData.user_name) {
                newErrors.user_name = 'This username is already taken. Please choose another one.';
            }
            if (errorData.email) {
                newErrors.email = 'This email is already registered. Please use a different email.';
            }
            
            // If there are no specific field errors but there's a general error message
            if (Object.keys(newErrors).length === 0 && errorData.error) {
                newErrors.general = errorData.error;
            }
            
            // If we have no specific errors, set a generic error message
            if (Object.keys(newErrors).length === 0) {
                newErrors.general = 'Failed to create account. Please try again.';
            }
            
            setErrors(newErrors);
        }
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
                    {errors.general && <div className="message error">{errors.general}</div>}
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
                            {errors.user_name && <div className="field-error">{errors.user_name}</div>}
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
                            {errors.email && <div className="field-error">{errors.email}</div>}
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
                        <button type="button" className="toggle-btn" onClick={() => navigate('/signin')}>Cancel</button>
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
