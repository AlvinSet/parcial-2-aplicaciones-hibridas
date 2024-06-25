import { useState } from 'react'
import Home from "./pages/Home";
import {BrowserRouter, Routes,  Route} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NavBar from './components/NavBar';
import './App.css'
import UserProfile from './pages/UserProfile';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <NavBar></NavBar>
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/profile" element={<UserProfile />} />

    </Routes>

    </BrowserRouter>
    </>
  )
}

export default App
