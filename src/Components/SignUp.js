import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; 

export default function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!username || !email || !password) {
            setError('Please fill in all fields');
            return;
        }

        Axios.post("http://localhost:3000/auth/signup", {
            username,
            email,
            password
        }).then(response => {
            if (response.data.status) {
                navigate("/login");
            }
        }).catch((err) => {
            setError('An error occurred. Please try again later.');
            console.error(err);
        });
    };

    return (
        <div className="signup-container">
            <h2 className="signup-title">SignUp</h2>
            <form className="signup-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Username:</label>
                    <input type="text" className="form-input" placeholder='Username' value={username}
                        onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label className="form-label">Email:</label>
                    <input type="email" className="form-input" placeholder='Enter Email' value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label className="form-label">Password:</label>
                    <input type="password" className="form-input" placeholder='Enter Password' value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type='submit' className="signup-btn">SignUp</button>
                <div className="login-link">
                    <p>Already have an account?</p>
                    <button onClick={() => navigate("/login")} className="login-btn">Login</button>
                </div>
            </form>
            {error && <p className="error-msg">{error}</p>}
        </div>
    );
}
