import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Input, Button, Card, CardBody } from '@nextui-org/react';
import { toast } from 'react-toastify';

const AdminServices = () => {
    const { token } = useAuth();
    const [services, setServices] = useState([]);
    const [form, setForm] = useState({ name: '', description: '', price: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchServices = async () => {
            setLoading(true);
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
                setError('Error fetching services');
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/apiHotel/services', {
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
            setServices([...services, data]);
            setForm({ name: '', description: '', price: '' });
            toast.success('Service created successfully!');

        } catch (error) {
            console.error('Error creating service:', error);
            setError('Error creating service');
            toast.error('Error creating service');

        }
    };

    const handleUpdate = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/apiHotel/services/${id}`, {
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
            setServices(services.map(service => (service._id === id ? data : service)));
        } catch (error) {
            console.error('Error updating service:', error);
            setError('Error updating service');
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/apiHotel/services/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': token }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setServices(services.filter(service => service._id !== id));
        } catch (error) {
            console.error('Error deleting service:', error);
            setError('Error deleting service');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
            <h1 className="text-3xl font-bold mb-6">Manage Services</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <Card className="w-full max-w-lg mb-6">
                <CardBody>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <Input
                                clearable
                                bordered
                                fullWidth
                                id="name"
                                name="name"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                            <Input
                                clearable
                                bordered
                                fullWidth
                                id="description"
                                name="description"
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                            <Input
                                clearable
                                bordered
                                fullWidth
                                id="price"
                                name="price"
                                type="number"
                                value={form.price}
                                onChange={(e) => setForm({ ...form, price: e.target.value })}
                            />
                        </div>
                        <Button type="submit" shadow color="primary" auto>
                            Add Service
                        </Button>
                    </form>
                </CardBody>
            </Card>
            <Card className="w-full max-w-4xl">
                <CardBody>
                    {services.length === 0 ? (
                        <p>No services available</p>
                    ) : (
                        <ul className="space-y-4">
                            {services.map((service) => (
                                <li key={service._id} className="border p-4 rounded-lg bg-white shadow flex justify-between items-center">
                                    <div>
                                        <p className="font-bold">{service.name}</p>
                                        <p>{service.description}</p>
                                        <p>${service.price}</p>
                                    </div>
                                    <div className="flex space-x-4">
                                        <Button auto color="warning" onClick={() => handleUpdate(service._id)}>Update</Button>
                                        <Button auto color="error" onClick={() => handleDelete(service._id)}>Delete</Button>
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

export default AdminServices;