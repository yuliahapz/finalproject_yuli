import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";  // Import useNavigate
import './Login.css';
import { toast, Toaster } from "react-hot-toast";  // Import the toast function

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const navigate = useNavigate();  // Initialize useNavigate


    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('Please fill in all fields');  // Show error toast
            return;
        }

        try {
            const response = await axios.post(
                'https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/login', 
                { email, password },
                { headers: { 'apiKey': 'c7b411cc-0e7c-4ad1-aa3f-822b00e7734b' } }
            );

            console.log(response);
            const token  = response.data.token;
            setError('');
            localStorage.setItem('token', token);
            toast.success('Login successful');  // Show success toast
            
            // Use navigate to redirect after 2 seconds
                navigate('/');
        } catch (error) {
            toast.error('Invalid email or password');  // Show error toast
        }
    };

    return (
        <div className="page-container">
            <Toaster position="top-center" reverseOrder={false} />  {/* Place Toaster outside */}
            <header className="header">
                <div className="header-content">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24">
                        <path d="M18 5l-2-3h-8l-2 3h-6v17h24v-17h-6zm4 7h-4.079c.581 3.754-2.312 7-5.921 7-3.612 0-6.501-3.248-5.921-7h-4.079v-5h5.07l2-3h5.859l2 3h5.071v5zm-10-3c-2.243 0-4 1.73-4 3.939 0 2.239 1.794 4.061 4 4.061s4-1.822 4-4.061c0-2.209-1.757-3.939-4-3.939zm-.436 3.555c-.632.503-1.461.5-1.852-.006-.39-.506-.194-1.324.438-1.827.632-.502 1.461-.499 1.851.007.391.505.195 1.323-.437 1.826z"/>
                    </svg>
                </div>
            </header>

            <div className="container">
                <div className="form-container">
                    <h1>Login</h1>
                    <form onSubmit={handleLogin}>  
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="exp@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button className="login" type="submit">Login</button>
                    </form>
                    <p className="login-link">Don't have an account? <Link to="/register">Register</Link></p>
                </div>
            </div>

            <footer className="footer">
                <div className="footer-links">
                    <a href="#">About Us</a>
                    <a href="#">Contact</a>
                    <a href="#">Privacy Policy</a>
                </div>
            </footer>
        </div>
    );
}

export default Login;
