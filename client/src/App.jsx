import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';

function App() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/login" element={!userInfo ? <LoginPage /> : <Navigate to="/dashboard" />} />
                    <Route path="/register" element={!userInfo ? <RegisterPage /> : <Navigate to="/dashboard" />} />
                    <Route path="/dashboard" element={userInfo ? <Dashboard /> : <Navigate to="/login" />} />
                    <Route path="/" element={<Navigate to={userInfo ? "/dashboard" : "/login"} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
