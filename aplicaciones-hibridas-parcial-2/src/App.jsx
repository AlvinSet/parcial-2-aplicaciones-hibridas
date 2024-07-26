import { useState } from 'react'
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/Login";
import Register from "./pages/Register";
import NavBar from './components/NavBar';
import './App.css'
import UserProfile from './pages/UserProfile';
import AdminServices from './pages/AdminServices';
import CreateBooking from './pages/CreateBooking';
import ListBookings from './pages/ListBookings';
import AdminRooms from './pages/AdminRooms';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {


  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <NavBar></NavBar>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            } />
            <Route path="/admin/services" element={<ProtectedRoute><AdminServices /></ProtectedRoute>} />
            <Route path="/admin/rooms" element={<ProtectedRoute><AdminRooms /></ProtectedRoute>} />
            <Route path="/bookings/create" element={<ProtectedRoute><CreateBooking /></ProtectedRoute>} />
            <Route path="/bookings/list" element={<ProtectedRoute><ListBookings /></ProtectedRoute>} />
          </Routes>
          <ToastContainer />

        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
