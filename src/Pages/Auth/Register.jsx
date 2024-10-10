import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import '../../../src/index.css';

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
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordRepeatVisible, setPasswordRepeatVisible] = useState(false);
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleTogglePasswordRepeatVisibility = () => {
    setPasswordRepeatVisible(!passwordRepeatVisible);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== passwordRepeat) {
      toast.error('Passwords do not match');
      return;
    }

    if (!name || !email || !password || !passwordRepeat || !phoneNumber) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
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
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred during registration');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Register Card */}
      <div className="bg-white p-8 shadow-lg w-[400px] h-[600px] rounded-2xl border-2 border-black hover:border-white transition duration-300 ease-in-out">
        <div className="flex justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" center viewBox="0 0 24 24">
            <path d="M18 5l-2-3h-8l-2 3h-6v17h24v-17h-6zm4 7h-4.079c.581 3.754-2.312 7-5.921 7-3.612 0-6.501-3.248-5.921-7h-4.079v-5h5.07l2-3h5.859l2 3h5.071v5zm-10-3c-2.243 0-4 1.73-4 3.939 0 2.239 1.794 4.061 4 4.061s4-1.822 4-4.061c0-2.209-1.757-3.939-4-3.939zm-.436 3.555c-.632.503-1.461.5-1.852-.006-.39-.506-.194-1.324.438-1.827.632-.502 1.461-.499 1.851.007.391.505.195 1.323-.437 1.826z"/>
          </svg>
        </div>

        {/* Sign In and Sign Up links side by side */}
        <div className="flex justify-between ">
          <Link to="/login" className="text-gray-800 text-lg ml-16 font-semibold">
            Sign In
          </Link>
          <Link to="/register" className="text-gray-800 text-lg mr-16 font-semibold">
            Sign Up
          </Link>
        </div>

        {/* Register Form */}
        <form onSubmit={handleRegister} className="w-full px-4 space-y-4 mt-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
          />
          {/* <input
            type="text"
            placeholder="Enter Your Username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
          /> */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
          />
          <div className="relative">
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
            />
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={handleTogglePasswordVisibility}
            >
              {passwordVisible ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.486 0-8.844-1.977-11.995-5.74-3.15-3.763-4.527-8.236-4.527-13.318C3.905 3.683 7.358 2.855 11 2.855c3.642 0 7.095 1.828 9.995 5.74 3.15 3.763 4.527 8.236 4.527 13.318 0 4.082-1.377 8.555-4.527 12.318" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </span>
          </div>
          <div className="relative">
            <input
              type={passwordRepeatVisible ? 'text' : 'password'}
              placeholder="Repeat Password"
              value={passwordRepeat}
              onChange={(e) => setPasswordRepeat(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
            />
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={handleTogglePasswordRepeatVisibility}
            >
              {passwordRepeatVisible ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.486 0-8.844-1.977-11.995-5.74-3.15-3.763-4.527-8.236-4.527-13.318C3.905 3.683 7.358 2.855 11 2.855c3.642 0 7.095 1.828 9.995 5 .74 3.15 3.763 4.527 8.236 4.527 13.318 0 4.082-1.377 8.555-4.527 12.318" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </span>
          </div>
          {/* <input
            type="text"
            placeholder="Enter Profile Picture URL"
            value={profilePictureUrl}
            onChange={(e) => setProfilePictureUrl(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
          /> */}
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
          />
          {/* <textarea
            placeholder="Share Your Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
          />
          <input
            type="text"
            placeholder="Enter Your Website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
          /> */}

          <button type="submit" className="w-full p-3 font-semibold text-white bg-black rounded-md hover:bg-gray-800 transition duration-300 ease-in-out">
            Register
          </button>
        </form>

        {/* <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-gray-800 underline">
            Login
          </Link>
        </p> */}
      </div>
    </div>
  );
};

export default Register;