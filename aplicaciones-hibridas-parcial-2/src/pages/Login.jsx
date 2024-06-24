import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Card, CardBody} from '@nextui-org/react';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const response = await fetch('http://localhost:3000/apiHotel/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token);
            navigate('/');
        } else {
            alert(data.message);
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