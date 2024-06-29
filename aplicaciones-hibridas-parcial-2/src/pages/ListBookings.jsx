import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardBody, Button } from '@nextui-org/react';

const ListBookings = () => {
    const { token } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:3000/apiHotel/bookings', {
                    headers: { 'Authorization': token }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setBookings(data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setError('Error fetching bookings or no bookings available');
                setBookings([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [token]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
            <h1 className="text-3xl font-bold mb-6">All Bookings</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {bookings.length === 0 ? (
                <p>No bookings available</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
                    {bookings.map((booking) => (
                        <Card key={booking._id} className="w-full">
                            <CardBody>
                                <h2 className="text-xl font-bold">Booking ID: {booking._id}</h2>
                                <p><strong>Client:</strong> {booking.client.name}</p>
                                <p><strong>Room:</strong> {booking.room.number} - {booking.room.type}</p>
                                <p><strong>Start Date:</strong> {new Date(booking.startDate).toLocaleDateString()}</p>
                                <p><strong>End Date:</strong> {new Date(booking.endDate).toLocaleDateString()}</p>
                                <p><strong>Total Price:</strong> ${booking.totalPrice}</p>
                                <p><strong>Status:</strong> {booking.status}</p>
                                {booking.services.length > 0 && (
                                    <div>
                                        <p><strong>Services:</strong></p>
                                        <ul>
                                            {booking.services.map(service => (
                                                <li key={service._id}>{service.name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </CardBody>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ListBookings;