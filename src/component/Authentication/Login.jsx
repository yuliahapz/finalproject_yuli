import axios from 'axios';  // Memanggil axios untuk Api
import { useState } from 'react'; // Memanggil useState untuk state management

const Login = () => {
    const [login, setLogin] = useState(false);  // State untuk mengecek apakah user sudah login
    const [username, setUsername] = useState("");  // State untuk menyimpan data username
    const [password, setPassword] = useState("");  // State untuk menyimpan data password
    const [error, setError] = useState("");  // State untuk menyimpan pesan error

    const handleLogin = () => { // Fungsi untuk login
        if (username && password) { // Memeriksa apakah username dan password ada di api makanya kita bisa liat username di get postman
            // Melakukan request login dengan menambahkan API key di header
            axios.post("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/login", 
            {
                email: username,  // Menggunakan data username
                password: password,  // Menggunakan data password
            }, 
            {
                headers: {
                    'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c' // Menambahkan API key di header
                }
            })
            .then((res) => {  // Memeriksa respon dari API
                console.log(res.data.data.token); // Mengambil token dari response
                setLogin(true);  // Mengubah state login menjadi true
                localStorage.setItem("token", res.data.data.token);
                window.location.reload(); // Reload untuk menyegarkan tampilan setelah login
            })
            .catch((err) => {
                console.log(err);  // Menghandle error
                setError("Login Failed. Please check your username and password."); // Menampilkan pesan error
            });
        } else { // Jika username dan password tidak ada
            setError("Please enter your username and password.");  // Menampilkan pesan error
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
                value={username} // Menggunakan state username sebagai value
                onChange={(e) => setUsername(e.target.value)} // Menggunakan state username sebagai onChange
                style={{ padding: '10px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
            />
            <label htmlFor="password" style={{ marginBottom: '10px' }}>Password</label>
            <input 
                id="password"
                type="password" 
                value={password} // Menggunakan state password sebagai value
                onChange={(e) => setPassword(e.target.value)}  // Menggunakan state password sebagai onChange
                style={{ padding: '10px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
            />
            <button 
                onClick={handleLogin} //kalau dia klik tombol login, dia akan menj login
                style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
            >
                Login
            </button>
            {login && <p style={{ color: "green", marginTop: '20px' }}>Login Successful!</p>} // Jika user login, menampilkan pesan
        </div>
    );
};

export default Login; // Mengexport kalau diatas ada import bawahnya wajib export
