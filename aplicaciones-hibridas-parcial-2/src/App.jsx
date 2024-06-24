import { useState } from 'react'
import Home from "./pages/Home";
import {BrowserRouter, Routes,  Route} from "react-router-dom";
import Login from "./pages/Login";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>

    <Routes>
    <Route path='/' element={<Home/>} />

    <Route path="/login" element={<Login />} />
    </Routes>

    </BrowserRouter>
    </>
  )
}

export default App
