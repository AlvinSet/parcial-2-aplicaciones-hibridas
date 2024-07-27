import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardBody, Button } from '@nextui-org/react';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

const ListBookings = () => {
    const { token } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBookings = async () => {
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
                setError('Error fetching bookings');
            }
        };
        fetchBookings();
    }, [token]);

    const handleStatusChange = (id, newStatus) => {
        setBookings(bookings.map(booking => 
            booking._id === id ? { ...booking, status: newStatus } : booking
        ));
    };

    const handleUpdate = async (id) => {
        const booking = bookings.find(b => b._id === id);
        try {
            const response = await fetch(`http://localhost:3000/apiHotel/bookings/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: booking.status })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setBookings(bookings.map(b => (b._id === id ? data : b)));
            toast.info('Booking status updated successfully!');
        } catch (error) {
            console.error('Error updating booking:', error);
            setError('Error updating booking');
            toast.error('Error updating booking');
        }
    };

    if (!bookings.length) {
        return <p>No bookings available</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
            <h1 className="text-3xl font-bold mb-6">Bookings</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {bookings.map((booking) => (
                <Card key={booking._id} className="w-full max-w-lg mb-6">
                    <CardBody>
                        <p>Client: {booking.client.name}</p>
                        <p>Room: {booking.room.number}</p>
                        <p>Start Date: {format(new Date(booking.startDate), 'dd MMM yyyy')}</p>
                        <p>End Date: {format(new Date(booking.endDate), 'dd MMM yyyy')}</p>
                        <p>Total Price: ${booking.totalPrice}</p>
                        <select
                            value={booking.status}
                            onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                        >
                            <option value="booked">Booked</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="completed">Completed</option>
                        </select>
                        <Button onClick={() => handleUpdate(booking._id)}>Update Status</Button>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
};

export default ListBookings;