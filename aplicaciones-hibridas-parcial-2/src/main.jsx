import React from 'react'
import ReactDOM from 'react-dom/client';
import { AuthProvider } from "./context/AuthContext";
import { NextUIProvider } from '@nextui-org/react';
import App from './App.jsx'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <NextUIProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </NextUIProvider>

  </React.StrictMode>,
)
