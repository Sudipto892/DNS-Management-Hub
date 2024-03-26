import React, { useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css";
import { Navigate } from "react-router-dom";
import Loader from "../../Loader/Loader";

const Login = ({ isAuthenticated, setIsAuthenticated, setLoading, loading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitAuthentication = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("https://dns-backend-magv.onrender.com/api/v1/users/login", {
        email,
        password,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setLoading(false);
      setIsAuthenticated(true);
      toast.success(data.message);
    } catch (error) {
      setLoading(false);
      toast.error("Invalid Credentials");
    }
  };

  if (loading) {
    return <div className="App"><Loader /></div>; 
  }

  if (isAuthenticated) return <Navigate to={"/"} />;

  return (
    <div className="LoginContainer">
      <h1>Welcome Back!</h1>
      <form onSubmit={handleSubmitAuthentication}>
        <input
          type="email"
          value={email}
          className="email"
          placeholder="Enter your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          className="password"
          placeholder="Enter your Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Sign In</button>
      </form>
    </div>
  );
};

export default Login;
