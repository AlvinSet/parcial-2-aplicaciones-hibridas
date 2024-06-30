import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody } from '@nextui-org/react';

const Home = () => {
  const navigate = useNavigate();
  const handleBookNow = () => {
    navigate('/book');
  };

  const handleLogin = () => {
    navigate('/login');
  };



  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
    <Card className="max-w-2xl w-full shadow-lg">
      <CardBody className="text-center">
        <h1 className="text-4xl font-bold mb-4">Bienvenido a Nuestro Sistema de Reservas de Hotel</h1>
        <p className="text-lg mb-6">Disfruta de una experiencia de lujo con nosotros a precios competitivos. Reserva tu estancia y servicios de manera fácil y rápida.</p>

        <div className="my-4">
          <h2 className="text-2xl font-semibold mb-2">Características del Proyecto:</h2>
          <ul className="text-left list-disc list-inside">
            <li>Autenticación con JWT para seguridad mejorada.</li>
            <li>Base de datos no relacional (MongoDB) para un rendimiento óptimo.</li>
            <li>CRUD completo para entidades de usuarios, habitaciones y servicios.</li>
            <li>BackOffice para administración y FrontOffice para los usuarios.</li>
            <li>Validación de datos y manejo de estados en tiempo real.</li>
          </ul>
        </div>

        <div className="my-4">
          <h2 className="text-2xl font-semibold mb-2">Tecnologías Utilizadas:</h2>
          <ul className="text-left list-disc list-inside">
            <li>Frontend: React con componentes funcionales y hooks.</li>
            <li>Backend: Node.js y Express para la API REST.</li>
            <li>Base de datos: MongoDB para el almacenamiento de datos.</li>
            <li>UI: NextUI y Tailwind CSS para una interfaz moderna y responsive.</li>
          </ul>
        </div>

        <div className="flex justify-center space-x-4 mt-6">
          <Button shadow color="primary" auto onClick={() => navigate('/login')}>
            Iniciar Sesión
          </Button>
          <Button shadow color="secondary" auto onClick={() => navigate('/register')}>
            Registrarse
          </Button>
        </div>
      </CardBody>
    </Card>
  </div>
  );
}

export default Home;