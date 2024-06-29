import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    Button, Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem, Link
} from '@nextui-org/react';

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { user, token, logout } = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login'); // Redirige al usuario a la página de inicio de sesión
    };
    return (

        <Navbar isBordered variant="sticky">
            <NavbarBrand>
                {/* <img src="" alt="My App Logo" className="h-12 w-12mr-2" /> */}

            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link href="/" color="foreground">Inicio</Link>
                </NavbarItem>

                {!token && (
                    <>
                        <NavbarItem>
                            <Link href="/register" className="text-brand-white">Registro</Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link href="/login" className="text-brand-white">Iniciar Sesión</Link>
                        </NavbarItem>
                    </>
                )}
                {token && (
                    <>
                        <NavbarItem>
                            <Link href="/admin/services" className="text-brand-white">Admin Servicios</Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link href="/admin/rooms" className="text-brand-white">Admin Habitaciones</Link>
                        </NavbarItem>

                        <NavbarItem>
                            <Link href="/profile" className="text-brand-white">Mi Perfil</Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Button onClick={handleLogout}>
                                Salir
                            </Button>
                        </NavbarItem>
                    </>
                )}
            </NavbarContent>
        </Navbar>

    );
};

export default NavBar;