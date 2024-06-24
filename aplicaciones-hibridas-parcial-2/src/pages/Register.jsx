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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async () => {
        const response = await fetch('http://localhost:3000/apiHotel/users/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            navigate('/login');  // Redirige al usuario al login tras un registro exitoso
            alert('Registration successful. Please login.');
        } else {
            const data = await response.json();
            alert(data.message);
        }
    };

    return (
        <Card css={{ mw: "400px", margin: "auto" }}>
            <h1>Register</h1>
            <CardBody>
                <Input
                    clearable
                    bordered
                    fullWidth
                    color="primary"
                    size="lg"
                    placeholder="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <Input
                    clearable
                    bordered
                    fullWidth
                    color="primary"
                    size="lg"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <Input
                    clearable
                    bordered
                    fullWidth
                    color="primary"
                    size="lg"
                    placeholder="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                />
                <Input
                    clearable
                    bordered
                    fullWidth
                    color="primary"
                    size="lg"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <Button fullWidth color="primary" auto onClick={handleRegister} css={{ marginTop: '20px' }}>
                    Register
                </Button>
            </CardBody>
        </Card>
    );
};

export default Register;