import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Card, CardBody} from '@nextui-org/react';
import { useAuth } from '../context/AuthContext'; 

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        const response = await fetch('http://localhost:3000/apiHotel/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        console.log("Response from server on login:", data);
        if (response.ok) {
            login(data.data.token, data.data.user);
            navigate('/');
        } else {
            alert(data.message);
            setError(data.message); 
        }
    };

    return (
        <Card css={{ mw: "400px", margin: "auto" }}>
            <h1>Login</h1>
            <CardBody>
                <Input
                    clearable
                    bordered
                    fullWidth
                    color="primary"
                    size="lg"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    clearable
                    bordered
                    fullWidth
                    color="primary"
                    size="lg"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button fullWidth color="primary" auto onClick={handleLogin} css={{ marginTop: '20px' }}>
                    Login
                </Button>
            </CardBody>
        </Card>
    );
};

export default Login;