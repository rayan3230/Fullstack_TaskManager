import React, { useState } from 'react';
import Login from './components/User/Login.jsx';
import TaskList from './components/Task/TaskList';

function App() {
    const [user, setUser] = useState(null);

    const handleUserAdded = (userData) => {
        console.log('User created:', userData);
        setUser(userData);
        // You can add additional logic here, like redirecting to another page
    };

    return (
        <div>
            {!user ? (
                <Login onUserAdded={handleUserAdded} />
            ) : (
                <div>
                    <h2>Welcome, {user.first_name}!</h2>
                    <TaskList />
                </div>
            )}
        </div>
    );
}

export default App;
