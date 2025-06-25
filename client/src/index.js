import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // ← Add this here
import { AuthProvider } from './AuthContext';

document.documentElement.classList.add("dark");


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
