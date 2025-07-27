import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        toast.success("User is registered successfully");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000); // delay to show toast before redirect
      } else {
        const data = await response.json();
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      toast.error("Registration failed: " + error.message);
    }
  };

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f9fafb',
    }}>
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Register</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={userData.username}
              onChange={handleChange}
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

          <div style={{ marginBottom: '1rem' }}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={userData.email}
              onChange={handleChange}
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
              placeholder="Enter password"
              value={userData.password}
              onChange={handleChange}
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
            backgroundColor: '#16a34a',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}>
            Register
          </button>
        </form>

        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          Already have an account? <Link to="/login" style={{ color: '#2563eb' }}>Login</Link>
        </p>
      </div>

      {/* Toast container for notifications */}
      <ToastContainer position="top-center" />
    </section>
  );
};

export default Register;
