import React from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../features/auth/hooks/useAuth';
import './navbar.scss';
import logoImg from '../assets/logo.png';

const Navbar = () => {
    const { user, handleLogout } = useAuth();
    const navigate = useNavigate();

    const onLogout = async () => {
        await handleLogout();
        navigate('/');
    };

    return (
        <header className="global-navbar">
            <Link to="/" className="logo">
                <img src={logoImg} alt="BridgeUp AI" className="navbar-logo" />
            </Link>
            <div className="auth-buttons">
                {user ? (
                    <button onClick={onLogout} className="btn btn--logout">Logout</button>
                ) : (
                    <>
                        <Link to="/login" className="btn btn--login">Login</Link>
                        <Link to="/register" className="btn btn--signup">Sign Up</Link>
                    </>
                )}
            </div>
        </header>
    );
};

export default Navbar;
