import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Input, Button, Card, CardBody } from '@nextui-org/react';

const AdminRooms = () => {
    const { token } = useAuth();
    const [rooms, setRooms] = useState([]);
    const [form, setForm] = useState({ number: '', type: '', pricePerNight: '', amenities: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchRooms = async () => {
            setLoading(true);
            try {
                // console.log("Sending token:", token);  
                const response = await fetch('http://localhost:3000/apiHotel/rooms', {
                    headers: { 'Authorization': token }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                if (Array.isArray(data)) {
                    setRooms(data);
                } else {
                    throw new Error('Expected an array of rooms');
                }
            } catch (error) {
                console.error('Error fetching rooms:', error);
                setError('Error fetching rooms');
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/apiHotel/rooms', {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setRooms([...rooms, data]);
            setForm({ number: '', type: '', pricePerNight: '', amenities: '' });
        } catch (error) {
            console.error('Error creating room:', error);
            setError('Error creating room');
        }
    };

    const handleUpdate = async (id) => {
        try {
            console.log("Sending token:", token);  // Agrega este log
            const response = await fetch(`http://localhost:3000/apiHotel/rooms/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setRooms(rooms.map(room => (room._id === id ? data : room)));
        } catch (error) {
            console.error('Error updating room:', error);
            setError('Error updating room');
        }
    };

    const handleDelete = async (id) => {
        try {
            console.log("Sending token:", token);  // Agrega este log
            const response = await fetch(`http://localhost:3000/apiHotel/rooms/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': token }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setRooms(rooms.filter(room => room._id !== id));
        } catch (error) {
            console.error('Error deleting room:', error);
            setError('Error deleting room');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
            <h1 className="text-3xl font-bold mb-6">Manage Rooms</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <Card className="w-full max-w-lg mb-6">
                <CardBody>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="number" className="block text-sm font-medium text-gray-700">Number</label>
                            <Input
                                clearable
                                bordered
                                fullWidth
                                id="number"
                                name="number"
                                value={form.number}
                                onChange={(e) => setForm({ ...form, number: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
                            <select
                                id="type"
                                name="type"
                                value={form.type}
                                onChange={(e) => setForm({ ...form, type: e.target.value })}
                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="">Select a type</option>
                                <option value="single">Single</option>
                                <option value="double">Double</option>
                                <option value="suite">Suite</option>
                                <option value="family">Family</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="pricePerNight" className="block text-sm font-medium text-gray-700">Price per Night</label>
                            <Input
                                clearable
                                bordered
                                fullWidth
                                id="pricePerNight"
                                name="pricePerNight"
                                type="number"
                                value={form.pricePerNight}
                                onChange={(e) => setForm({ ...form, pricePerNight: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="amenities" className="block text-sm font-medium text-gray-700">Amenities</label>
                            <Input
                                clearable
                                bordered
                                fullWidth
                                id="amenities"
                                name="amenities"
                                value={form.amenities}
                                onChange={(e) => setForm({ ...form, amenities: e.target.value.split(',') })}
                            />
                        </div>
                        <Button type="submit" shadow color="primary" auto>
                            Add Room
                        </Button>
                    </form>
                </CardBody>
            </Card>
            <Card className="w-full max-w-4xl">
                <CardBody>
                    {rooms.length === 0 ? (
                        <p>No rooms available</p>
                    ) : (
                        <ul className="space-y-4">
                            {rooms.map((room) => (
                                <li key={room._id} className="border p-4 rounded-lg bg-white shadow flex justify-between items-center">
                                    <div>
                                        <p className="font-bold">{room.number} - {room.type}</p>
                                        <p>${room.pricePerNight}</p>
                                        <p>{room.amenities.join(', ')}</p>
                                    </div>
                                    <div className="flex space-x-4">
                                        <Button auto color="warning" onClick={() => handleUpdate(room._id)}>Update</Button>
                                        <Button auto color="error" onClick={() => handleDelete(room._id)}>Delete</Button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </CardBody>
            </Card>
        </div>
    );
};

export default AdminRooms;