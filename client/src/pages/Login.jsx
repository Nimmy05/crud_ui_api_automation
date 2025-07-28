import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation check - throw error if empty fields
    if (!userData.email || !userData.password) {
      // Throwing an error which you can catch and toast or directly toast here
      try {
        throw new Error("Both email and password are required");
      } catch (validationError) {
        toast.error(validationError.message);
        return;
      }
    }

    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Login failed");
      } else if (data.token) {
        toast.success(`${userData.email} is Logged In`);
        window.localStorage.setItem('token', data.token);
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      }
    } catch (err) {
      toast.error("Network error: " + err.message);
    }
  };

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f3f4f6',
    }}>
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Login</h2>

        {/* Fake inputs to prevent browser autofill */}
        <form onSubmit={handleSubmit} autoComplete="off">
          <input
            type="text"
            name="fakeUsername"
            autoComplete="username"
            style={{ display: 'none' }}
          />
          <input
            type="password"
            name="fakePassword"
            autoComplete="new-password"
            style={{ display: 'none' }}
          />

          <div style={{ marginBottom: '1rem' }}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={userData.email}
              onChange={handleChange}
              autoComplete="off"
              required
              style={{
                width: '100%',
                padding: '0.5rem',
                marginTop: '0.25rem',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={userData.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
              style={{
                width: '100%',
                padding: '0.5rem',
                marginTop: '0.25rem',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
            />
          </div>

          <button type="submit" style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}>
            Login
          </button>
        </form>

        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          Don’t have an account? <Link to="/register" style={{ color: '#2563eb' }}>Register</Link>
        </p>
      </div>

      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </section>
  );
};

export default Login;
