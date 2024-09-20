import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast"; // Tidak ada ToastContainer
import { useNavigate } from "react-router-dom";
import "./App.css"; // Pastikan Anda sudah memiliki file CSS

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Validasi input
    if (password !== confirmPassword) {
      toast.error("Password does not match");
      return;
    }

    if (!email || !password || !name || !confirmPassword || !phoneNumber) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (!/^\d{10,12}$/.test(phoneNumber)) {
      toast.error("Please enter a valid phone number");
      return;
    }

    // Request API untuk register
    axios
      .post(`https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/register`, {
        email,
        password,
        name,
        phone_number: phoneNumber,
        role: "user" // Misalnya default role adalah user
      })
      .then((res) => {
        toast.success("Registration Successful! Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      })
      .catch((err) => {
        toast.error("Registration Failed. Please check your email and password.");
        console.log(err);
      });
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit">Register</button>
        </form>
        <div className="signin-link">
          <p>Already have an account? <a href="/login">Log in</a></p>
        </div>
      </div>
      <div className="register-image">
        <img src="https://www.newzyexecutive.fr/wp-content/uploads/2018/05/Le-basket-ball.jpg" alt="Register" />
      </div>
    </div>
  );
};

export default Register;
