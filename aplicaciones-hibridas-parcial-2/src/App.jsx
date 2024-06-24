import { useState } from 'react'
import Home from "./pages/Home";
import {BrowserRouter, Routes,  Route} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NavBar from './components/NavBar';

import './App.css'

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
    </Routes>

    </BrowserRouter>
    </>
  )
}

export default App
