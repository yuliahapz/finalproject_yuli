import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import '../../../src/index.css'; // Tailwind CSS styles will replace this

const Register = () => {
    const [name, setName] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [profilePictureUrl, setProfilePictureUrl] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [bio, setBio] = useState('');
    const [website, setWebsite] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== passwordRepeat) {
            toast.error('Passwords do not match');
            return;
        }

        if (!name || !username || !email || !password || !passwordRepeat || !profilePictureUrl || !phoneNumber) {
            toast.error('Please fill in all fields');
            return;
        }

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters long');
            return;
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            toast.error('Invalid email address');
            return;
        }

        if (!/^[0-9]+$/.test(phoneNumber)) {
            toast.error('Invalid phone number');
            return;
        }

        try {
            const response = await axios.post(`https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/register`, {
                name,
                username,
                email,
                password,
                passwordRepeat,
                profilePictureUrl,
                phoneNumber,
                bio,
                website
            }, { headers: { 'apiKey': 'c7b411cc-0e7c-4ad1-aa3f-822b00e7734b' } }
            );
            console.log(response);
            localStorage.setItem('token', response.data.data.token);
            toast.success('Register success! Redirecting to login page...');
            setTimeout(() => { navigate('/login') }, 2000);
        } catch (err) {
            toast.error("Register failed");
            console.log(err.response ? err.response.data : err.message);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="flex flex-col lg:flex-row items-center lg:items-stretch bg-white shadow-lg rounded-lg overflow-hidden lg:max-w-6xl w-full mx-4">
                {/* Left panel */}
                <div className="lg:w-1/2 bg-gradient-to-tr from-indigo-600 to-purple-600 text-white p-10 flex flex-col justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" className="mb-6">
                        <path fill="white" d="M18 5l-2-3h-8l-2 3h-6v17h24v-17h-6zm4 7h-4.079c.581 3.754-2.312 7-5.921 7-3.612 0-6.501-3.248-5.921-7h-4.079v-5h5.07l2-3h5.859l2 3h5.071v5zm-10-3c-2.243 0-4 1.73-4 3.939 0 2.239 1.794 4.061 4 4.061s4-1.822 4-4.061c0-2.209-1.757-3.939-4-3.939zm-.436 3.555c-.632.503-1.461.5-1.852-.006-.39-.506-.194-1.324.438-1.827.632-.502 1.461-.499 1.851.007.391.505.195 1.323-.437 1.826z"/>
                    </svg>
                    <h1 className="text-4xl font-bold">Welcome to Our Platform</h1>
                    <p className="mt-4 text-lg">Register and start sharing your photos with the world!</p>
                </div>

                {/* Right panel */}
                <div className="lg:w-1/2 p-10 flex flex-col justify-center">
                    <form onSubmit={handleRegister} className="space-y-6">
                        <h2 className="text-3xl font-bold text-gray-800 text-center">Sign Up</h2>
                        <div className="space-y-4">
                            <input 
                                type="text" 
                                placeholder="Enter Your Name" 
                                value={name}
                                onChange={(e) => setName(e.target.value)} 
                                    className="w-full px-0 py-0 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            />
                            <input 
                                type="text" 
                                placeholder="Enter Your Username" 
                                value={username}
                                onChange={(e) => setUserName(e.target.value)} 
                                className="w-full px-0 py-0 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            />
                            <input 
                                type="email" 
                                placeholder="Enter Your Email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} 
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            />
                            <input 
                                type="password" 
                                placeholder="Enter Your Password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            />
                            <input 
                                type="password" 
                                placeholder="Repeat Your Password" 
                                value={passwordRepeat}
                                onChange={(e) => setPasswordRepeat(e.target.value)} 
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            />
                            <input 
                                type="text" 
                                placeholder="Enter Profile Picture URL" 
                                value={profilePictureUrl}
                                onChange={(e) => setProfilePictureUrl(e.target.value)} 
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            />
                            <input 
                                type="text" 
                                placeholder="Enter Your Phone Number" 
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)} 
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            />
                            <textarea 
                                placeholder="Share Your Bio" 
                                value={bio}
                                onChange={(e) => setBio(e.target.value)} 
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            />
                            <input 
                                type="text" 
                                placeholder="Enter Your Website" 
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)} 
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                        <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-md font-bold hover:bg-indigo-500">Register</button>
                        <p className="text-center text-gray-600">
                            Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
