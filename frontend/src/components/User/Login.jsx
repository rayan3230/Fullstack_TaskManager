import './Login.css';
import React, { useState } from 'react';
import axios from 'axios';

const Login = ({onUserAdded}) => {
    const [formData, setFormData] = useState({
        first_name: '',
        user_name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

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
    };

    return (
        <div className="login-container">
            <h2>Create Account</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="first_name"
                    placeholder="Enter Name..."
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="user_name"
                    placeholder="Enter username..."
                    value={formData.user_name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email..."
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password..."
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Create Account</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
                <p>
                    Already have an account? <a href="/signin" className="textbut">Sign In</a>
                </p>
            </form>
        </div>
    );
};

export default Login;
