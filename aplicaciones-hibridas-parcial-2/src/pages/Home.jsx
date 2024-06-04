import { useNavigate } from 'react-router-dom';
import { Button } from '@nextui-org/react';

const Home = () => {
    const navigate = useNavigate();
    const handleBookNow = () => {
        navigate('/book');
    };
    
      const handleLogin = () => {
        navigate('/login');
    };
    


    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Welcome to Our Hotel Booking System</h1>
      <p>Enjoy a luxury experience with us at competitive prices.</p>
      
      <Button auto shadow color="primary" onClick={handleBookNow}>
        Book Now
      </Button>
      
      <Button auto flat color="secondary" onClick={handleLogin} style={{ marginLeft: '20px' }}>
        Login / Register
      </Button>
    </div>
    );
}

export default Home;