import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Input, Button, Card, CardBody } from '@nextui-org/react';

const CreateBooking = () => {
    const { token, user } = useAuth();
    const [rooms, setRooms] = useState([]);
    const [services, setServices] = useState([]);
    const [form, setForm] = useState({ roomId: '', startDate: '', endDate: '', services: [], totalPrice: 0 });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchRooms = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:3000/apiHotel/rooms', {
                    headers: { 'Authorization': token }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setRooms(data);
            } catch (error) {
                console.error('Error fetching rooms:', error);
                setError('Error fetching rooms or no rooms available');
                setRooms([]);
            } finally {
                setLoading(false);
            }
        };

        const fetchServices = async () => {
            try {
                const response = await fetch('http://localhost:3000/apiHotel/services', {
                    headers: { 'Authorization': token }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setServices(data);
            } catch (error) {
                console.error('Error fetching services:', error);
                setError('Error fetching services or no services available');
                setServices([]);
            }
        };

        fetchRooms();
        fetchServices();
    }, [token]);

    const handleServiceChange = (serviceId) => {
        setForm((prevForm) => {
            const services = prevForm.services.includes(serviceId)
                ? prevForm.services.filter((id) => id !== serviceId)
                : [...prevForm.services, serviceId];
            return { ...prevForm, services };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const room = rooms.find(r => r._id === form.roomId);
        const totalPrice = room ? room.pricePerNight * (new Date(form.endDate) - new Date(form.startDate)) / (1000 * 60 * 60 * 24) : 0;
        const selectedServices = form.services.map(serviceId => services.find(service => service._id === serviceId));
        const servicesPrice = selectedServices.reduce((total, service) => total + service.price, 0);
        const finalTotalPrice = totalPrice + servicesPrice;

        const bookingData = { ...form, client: user?._id, totalPrice: finalTotalPrice };

        console.log('Booking Data:', bookingData);

        try {
            const response = await fetch('http://localhost:3000/apiHotel/bookings', {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookingData)
            });

            if (!response.ok) {
                console.error('Response Status:', response.status);
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Booking Created:', data);
            setForm({ roomId: '', startDate: '', endDate: '', services: [], totalPrice: 0 });
        } catch (error) {
            console.error('Error creating booking:', error);
            setError('Error creating booking');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
            <h1 className="text-3xl font-bold mb-6">Create Booking</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <Card className="w-full max-w-lg mb-6">
                <CardBody>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="roomId" className="block text-sm font-medium text-gray-700">Room</label>
                            <select
                                id="roomId"
                                name="roomId"
                                value={form.roomId}
                                onChange={(e) => setForm({ ...form, roomId: e.target.value })}
                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                disabled={rooms.length === 0}
                            >
                                <option value="">Select a room</option>
                                {rooms.map((room) => (
                                    <option key={room._id} value={room._id}>
                                        {room.number} - {room.type}
                                    </option>
                                ))}
                            </select>
                            {rooms.length === 0 && <p className="text-red-500 text-sm">No rooms available</p>}
                        </div>
                        <div>
                            <label htmlFor="services" className="block text-sm font-medium text-gray-700">Services</label>
                            {services.map((service) => (
                                <div key={service._id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`service-${service._id}`}
                                        checked={form.services.includes(service._id)}
                                        onChange={() => handleServiceChange(service._id)}
                                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                    />
                                    <label htmlFor={`service-${service._id}`} className="ml-2 block text-sm text-gray-900">
                                        {service.name} - ${service.price}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div>
                            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
                            <Input
                                bordered
                                fullWidth
                                id="startDate"
                                name="startDate"
                                type="date"
                                value={form.startDate}
                                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                                disabled={rooms.length === 0}
                            />
                        </div>
                        <div>
                            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
                            <Input
                                bordered
                                fullWidth
                                id="endDate"
                                name="endDate"
                                type="date"
                                value={form.endDate}
                                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                                disabled={rooms.length === 0}
                            />
                        </div>
                        <Button type="submit" shadow color="primary" auto disabled={rooms.length === 0}>
                            Add Booking
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
};

export default CreateBooking;