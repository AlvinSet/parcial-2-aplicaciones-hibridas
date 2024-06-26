import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Card, CardBody } from '@nextui-org/react';
import { useAuth } from '../context/AuthContext'; 

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent form default submission
        try {
            const response = await fetch('http://localhost:3000/apiHotel/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                login(data.token, data.user);
                navigate('/');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again later.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-indigo-400 p-4">
            <Card className="max-w-md w-full bg-white bg-opacity-90 shadow-lg rounded-lg">
                <h1 className="text-center text-3xl font-bold text-gray-900 mb-8">Login</h1>
                <CardBody>
                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && <p className="text-red-500 text-sm">{error}</p>}
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-2"
                            />
                        </div>
                        <Button type="submit" fullWidth color="primary" auto className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Login
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
};

export default Login;