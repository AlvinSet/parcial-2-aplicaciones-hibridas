import React from 'react';
import { useAuth } from '../context/AuthContext';

const UserProfile = () => {
    const { user,token } = useAuth();
    console.log("User data in UserProfile:", user);
    
    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>User Profile</h1>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Bookings:</strong> {user.bookings}</p>
            {/* Añade más campos si es necesario */}
        </div>
    );
};

export default UserProfile;