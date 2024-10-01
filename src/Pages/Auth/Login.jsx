import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import "../../index.css"


// Login Page
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('Please fill in all fields');
            return;
        }

        try {
            const response = await axios.post(
                'https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/login', 
                { email, password },
                { headers: { 'apiKey': 'c7b411cc-0e7c-4ad1-aa3f-822b00e7734b' } }
            );

            const token = response.data.token;
            localStorage.setItem('token', token);
            toast.success('Login successful');
            navigate('/');
        } catch (error) {
            toast.error('Invalid email or password');
        }
    };

    return (
       <div className="flex flex-col max-h-screen">
    <main className="flex-1 flex flex-col justify-start bg-gray-50 py-12 sm:px-6 lg:px-8">
        <Toaster position="top-center" reverseOrder={false} />

        <div className="sm:mx-auto sm:w-full sm:max-w-4xl"> {/* Changed max width */}
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" className="mx-auto h-10 w-auto">
                <path d="M18 5l-2-3h-8l-2 3h-6v17h24v-17h-6zm4 7h-4.079c.581 3.754-2.312 7-5.921 7-3.612 0-6.501-3.248-5.921-7h-4.079v-5h5.07l2-3h5.859l2 3h5.071v5zm-10-3c-2.243 0-4 1.73-4 3.939 0 2.239 1.794 4.061 4 4.061s4-1.822 4-4.061c0-2.209-1.757-3.939-4-3.939zm-.436 3.555c-.632.503-1.461.5-1.852-.006-.39-.506-.194-1.324.438-1.827.632-.502 1.461-.499 1.851.007.391.505.195 1.323-.437 1.826z"/>
            </svg>
            <h2 className="mt-6 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900"> {/* Increased font size */}
                Sign in to your account
            </h2>
        </div>

        {/* Main Container with wider width */}
        <div className="mt-10 mx-auto w-full max-w-4xl"> {/* Increased max width */}
            <div className="bg-white px-10 py-12 shadow sm:rounded-lg sm:px-12">
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                        <div className="mt-2">
                            <input
                                type="email"
                                id="email"
                                className="block w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        <div className="mt-2">
                            <input
                                type="password"
                                id="password"
                                className="block w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center mt-4 text-sm text-gray-600">
                    Don't have an account? <Link to="/register" className="text-indigo-600 hover:underline">Register</Link>
                </p>
            </div>
        </div>
    </main>
</div>

    );
}

export default Login;
