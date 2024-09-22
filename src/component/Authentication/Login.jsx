import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './component.css'; // Importing CSS file

const Login = () => {
    const [login, setLogin] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError("");

        if (!username || !password) {
            setError("Please enter your username and password.");
            return;
        }

        try {
            const response = await axios.post(
                "https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/login", 
                { email: username, password: password },
                { headers: { 'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c' } }
            );

            setLogin(true);
            localStorage.setItem("token", response.data.data.token);
            if (rememberMe) {
                localStorage.setItem("username", username);
            } else {
                localStorage.removeItem("username");
            }
            navigate("/dashboard");

        } catch (err) {
            if (err.response && err.response.status === 401) {
                setError("Invalid username or password.");
            } else {
                setError("Login failed. Please try again later.");
            }
        }
    };

    return (
        <div className="login-page">
            <div className="login-grid">
                {/* Left side: Login form */}
                <div className="login-form-section">
                    <h2 className="login-title">LOGIN TO YOUR ACCOUNT</h2>
                    {error && <p className="login-error">{error}</p>}

                    <label htmlFor="username" className="login-label">E-mail</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="login-input"
                        placeholder="Enter your e-mail"
                    />

                    <label htmlFor="password" className="login-label">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-input"
                        placeholder="Enter your password"
                    />

                    <div className="login-remember-me">
                        <input
                            type="checkbox"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                        />
                        <label htmlFor="rememberMe" className="login-label remember-me-label">Remember Me</label>
                        <p className="login-forgot-password"><a href="/forgot-password" className="login-link">Forgot Password?</a></p>
                    </div>

                    <button onClick={handleLogin} className="login-button">Login</button>

                    {login && <p className="login-success">Login Successful!</p>}

                    <div className="login-or">- or -</div>

                    <button className="social-login-button facebook-login">Sign in with Facebook</button>
                    <button className="social-login-button google-login">Sign in with Google</button>

                    <p className="login-signup-text">
                        Not registered yet? <a href="/register" className="login-link">Sign Up</a>
                    </p>
                </div>

                {/* Right side: Sports image */}
                <div className="login-image">
                    <img src="https://img.freepik.com/free-photo/caucasian-professional-male-athlete-runner-training-isolated-white-background_155003-32542.jpg?t=st=1726981435~exp=1726985035~hmac=3f63af68bc184042fb900616e950127c752aa77e9de73b07d6cd4a3886c1391c&w=1800" alt="Sports Image" className="login-image" />
                </div>
            </div>
        </div>
    );
};

export default Login;
