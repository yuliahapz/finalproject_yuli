import axios from 'axios';
import { useState } from 'react';

const Login = () => {
    const [login, setLogin] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        if (username && password) {
            // Melakukan request login dengan menambahkan API key di header
            axios.post("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/login", 
            {
                email: username,
                password: password,
            }, 
            {
                headers: {
                    'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c' // Menambahkan API key di header
                }
            })
            .then((res) => {
                console.log(res.data.data.token);
                setLogin(true);
                localStorage.setItem("token", res.data.data.token);
                window.location.reload(); // Reload untuk menyegarkan tampilan setelah login
            })
            .catch((err) => {
                console.log(err);
                setError("Login Failed. Please check your username and password.");
            });
        } else {
            setError("Please enter your username and password.");
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', backgroundColor: 'lightcyan', borderRadius: '10px', width: '300px', margin: 'auto' }}>
            <h2 style={{ marginBottom: '20px' }}>Travel App Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <label htmlFor="username" style={{ marginBottom: '10px' }}>Username</label>
            <input 
                id="username"
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                style={{ padding: '10px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
            />
            <label htmlFor="password" style={{ marginBottom: '10px' }}>Password</label>
            <input 
                id="password"
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                style={{ padding: '10px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
            />
            <button 
                onClick={handleLogin}
                style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
            >
                Login
            </button>
            {login && <p style={{ color: "green", marginTop: '20px' }}>Login Successful!</p>}
        </div>
    );
};

export default Login;
