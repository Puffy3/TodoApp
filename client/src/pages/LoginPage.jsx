import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as api from '../services/api';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        
        e.preventDefault();
       
        try {
            const { data } = await api.login(email, password);
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate('/dashboard');
            
            window.location.reload();
        } catch (err) {
            setError(err.response?.data?.message || 'Login Failed.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 space-y-6">
                <h2 className="text-2xl font-bold text-center">Login</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-2 border"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-2 border"
                    />
                    <button type="submit" className="w-full p-2 bg-blue-500 text-white">
                        Sign in
                    </button>
                </form>
                <p className="text-center">
                    <Link to="/register" className="text-blue-500">
                        Register for an account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
