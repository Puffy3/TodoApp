import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
        window.location.reload();
    };

    return (
        <header className="border-b w-full">
            <div className="flex justify-between items-center h-16 px-4">
                <span className="text-xl font-bold">TodoApp</span>
                {userInfo && (
                    <div className="flex items-center">
                        <span className="mr-4">{userInfo.email}</span>
                        <button onClick={handleLogout} className="p-2 bg-red-500 text-white">
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
