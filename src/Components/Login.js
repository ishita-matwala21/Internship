import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    Axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        Axios.post("http://localhost:3000/auth/login", {
            email,
            password
        }).then(response => {
            if (response.data.status) {
                navigate("/");
            }
        }).catch((err) => {
            setError('An error occurred. Please try again later.');
            console.error(err);
        });
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" id="email" className="form-input" placeholder='Enter Email' value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input type="password" id="password" className="form-input" placeholder='Enter Password' value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type='submit' className="login-btn">Login</button>
                <div className="signup-link">
                    <p>Don't have an account?</p>
                    <button onClick={() => navigate("/signup")} className="signup-btn">Sign Up</button>
                </div>
            </form>
            {error && <p className="error-msg">{error}</p>}
        </div>
    );
}
