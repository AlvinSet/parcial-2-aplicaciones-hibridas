import React from 'react';
// import logo from '../assets/logonavbar.png';
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
    return (

        <Navbar isBordered variant="sticky">
            <NavbarBrand>
                {/* <img src="" alt="My App Logo" className="h-12 w-12mr-2" /> */}

            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link href="/" color="foreground">Inicio</Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="/services" className="text-brand-white">Servicios</Link>
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
                            <Link href="/profile" className="text-brand-white">Mi Perfil</Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Button onClick={logout}>
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