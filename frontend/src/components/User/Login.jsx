import './Login.css'; // Ensure this path is correct
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [firstName, setFirstName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newUser = { firstName, userName, email, password };

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/User/', newUser);
            console.log("User created:", response.data);
            setFirstName('');
            setUserName('');
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error("Error creating User:", error);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter Name..."
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Enter username..."
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Enter Email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Enter Password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <p>
                    <a href="#" className="textbut">Forgot Password?</a>
                </p>
                <button type="submit">Submit</button>
                <button type="button">Cancel</button>
                <p>
                    Can't sign in? Try{' '}
                    <a href="#" className="textbut">resetting your password</a> or{' '}
                    <a href="#" className="textbut">contact us</a> for assistance.
                </p>
            </form>
        </div>
    );
};

export default Login;