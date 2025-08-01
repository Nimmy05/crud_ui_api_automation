import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = userData;
    const errors = [];

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      errors.push("Email");
    } else if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!password.trim()) {
      errors.push("Password");
    }

    if (errors.length > 0) {
      toast.error(`${errors.join(" and ")} ${errors.length > 1 ? "are" : "is"} required`);
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Login failed");
      } else if (data.token) {
        // toast.success(`${userData.email} is Logged In`);
        window.localStorage.setItem("token", data.token);
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      }
    } catch (error) {
      toast.error("Network error: " + error.message);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f5f6fa",
        }}
      >
        <form
          onSubmit={handleSubmit}
          noValidate
          style={{
            background: "#fff",
            padding: "40px",
            borderRadius: "10px",
            boxShadow: "0 0 15px rgba(0,0,0,0.1)",
            width: "100%",
            maxWidth: "400px",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginBottom: "30px", color: "#333" }}>Login</h2>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleChange}
            autoComplete="off"
            style={{
              width: "100%",
              padding: "12px 15px",
              marginBottom: "20px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              fontSize: "16px",
            }}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={handleChange}
            autoComplete="new-password"
            style={{
              width: "100%",
              padding: "12px 15px",
              marginBottom: "30px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              fontSize: "16px",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#007BFF")}
          >
            Login
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={false} />
    </>
  );
};

export default Login;
