import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardBody, Button } from '@nextui-org/react';

const UserProfile = () => {
    const { user,token } = useAuth();
    console.log("User data in UserProfile:", user);
    
    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-indigo-400 p-4">
            <Card className="max-w-2xl w-full bg-white bg-opacity-90 shadow-lg rounded-lg">
                <h1 className="text-center text-3xl font-bold text-gray-900 mb-8">User Profile</h1>
                <CardBody>
                    <p className="text-lg"><strong>Name:</strong> {user.name}</p>
                    <p className="text-lg"><strong>Email:</strong> {user.email}</p>
                    <p className="text-lg"><strong>Phone:</strong> {user.phone}</p>

                    {user.bookings && user.bookings.length > 0 ? (
                        <div>
                            <h2 className="text-2xl font-bold mt-6">Bookings</h2>
                            {user.bookings.map((booking) => (
                                <div key={booking._id} className="border rounded-lg p-4 mt-4">
                                    <p><strong>Room:</strong> {booking.room.number} ({booking.room.type})</p>
                                    <p><strong>Start Date:</strong> {new Date(booking.startDate).toLocaleDateString()}</p>
                                    <p><strong>End Date:</strong> {new Date(booking.endDate).toLocaleDateString()}</p>
                                    <p><strong>Status:</strong> {booking.status}</p>
                                    {booking.services && booking.services.length > 0 && (
                                        <div className="mt-4">
                                            <h3 className="text-xl font-bold">Services</h3>
                                            {booking.services.map((service) => (
                                                <p key={service._id}>{service.name} - ${service.price}</p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-600 mt-6">No bookings found</p>
                    )}
                    <div className="mt-8 flex justify-center">
                        <Button color="primary" auto>Update Profile</Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default UserProfile;