import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Card, CardBody } from '@nextui-org/react';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault(); // Prevent form default submission
        try {
            const response = await fetch('http://localhost:3000/apiHotel/users/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                navigate('/login');  // Redirige al usuario al login tras un registro exitoso
                alert('Registration successful. Please login.');
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again later.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-indigo-400 p-4">
            <Card className="max-w-md w-full bg-white bg-opacity-90 shadow-lg rounded-lg">
                <h1 className="text-center text-3xl font-bold text-gray-900 mb-8">Register</h1>
                <CardBody>
                    <form onSubmit={handleRegister} className="space-y-6">
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <Input
                                clearable
                                bordered
                                fullWidth
                                color="default"
                                size="lg"
                                placeholder="Name"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <Input
                                clearable
                                bordered
                                fullWidth
                                color="default"
                                size="lg"
                                placeholder="Email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                            <Input
                                clearable
                                bordered
                                fullWidth
                                color="default"
                                size="lg"
                                placeholder="Phone"
                                name="phone"
                                id="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <Input
                                clearable
                                bordered
                                fullWidth
                                color="default"
                                size="lg"
                                type="password"
                                placeholder="Password"
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-2"
                            />
                        </div>
                        <Button type="submit" fullWidth color="primary" auto className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Register
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
};

export default Register;