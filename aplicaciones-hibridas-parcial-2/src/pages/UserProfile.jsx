import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardBody, Button } from '@nextui-org/react';
import { format } from 'date-fns';

const UserProfile = () => {
    const { token, setUser } = useAuth(); // Usamos setUser para actualizar el contexto
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('http://localhost:3000/apiHotel/users/profile', {
                    headers: { 'Authorization': token } // Usamos solo el token sin Bearer
                });

                if (response.ok) {
                    const updatedUser = await response.json();
                    setProfile(updatedUser);
                    setUser(updatedUser); // Actualizar el contexto de autenticación
                } else {
                    throw new Error('Failed to fetch profile');
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [token, setUser]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!profile) {
        return <p>Error loading profile</p>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-indigo-400 p-4">
            <Card className="max-w-2xl w-full bg-white bg-opacity-90 shadow-lg rounded-lg">
                <h1 className="text-center text-3xl font-bold text-gray-900 mb-8">User Profile</h1>
                <CardBody>
                    <p className="text-lg"><strong>Name:</strong> {profile.name}</p>
                    <p className="text-lg"><strong>Email:</strong> {profile.email}</p>
                    <p className="text-lg"><strong>Phone:</strong> {profile.phone}</p>

                    {profile.bookings && profile.bookings.length > 0 ? (
                        <div>
                            <h2 className="text-2xl font-bold mt-6">Bookings</h2>
                            {profile.bookings.map((booking) => (
                                <div key={booking._id} className="border rounded-lg p-4 mt-4">
                                    <p><strong>Room:</strong> {booking.room.number} ({booking.room.type})</p>
                                    <p><strong>Start Date:</strong> {format(new Date(booking.startDate), 'dd MMM yyyy')}</p>
                                    <p><strong>End Date:</strong> {format(new Date(booking.endDate), 'dd MMM yyyy')}</p>
                                    <p><strong>Total Price:</strong> ${booking.totalPrice.toFixed(2)}</p>
                                    <p><strong>Status:</strong> {booking.status}</p>
                                    {booking.services && booking.services.length > 0 && (
                                        <div className="mt-4">
                                        <h3 className="text-xl font-bold">Services</h3>
                                        {booking.services.map((service) => (
                                            <p key={service._id}>{service.name} - ${service.price.toFixed(2)}</p>
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