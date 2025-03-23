import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './components/User/SignUp.jsx';
import TaskList from './components/Task/TaskList';
import SignIn from './components/User/SignIn.jsx';


function App() {
    const [user, setUser] = useState(null);

    const handleUserAdded = (userData) => {
        console.log('User created:', userData);
        setUser(userData);
    };

    return (
        <Router>
            <Routes>
                <Route path="/signup" element={!user ? <SignUp onUserAdded={handleUserAdded} /> : <Navigate to="/tasks" />} />
                <Route path="/signin" element={!user ? <SignIn onUserAdded={handleUserAdded} /> : <Navigate to="/tasks" />} />
                <Route path="/tasks" element={user ? <TaskList /> : <Navigate to="/signin" />} />
                <Route path="/" element={<Navigate to="/signin" />} />
            </Routes>
        </Router>
    );
}



export default App;
