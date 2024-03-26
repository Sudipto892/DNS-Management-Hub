import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Register.css"
import { Navigate } from 'react-router-dom';
import Loader from '../../Loader/Loader';

const RegistrationForm = ({ isAuthenticated, setIsAuthenticated, setLoading, loading }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subscriptionId, setSubscriptionId] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [tenantId, setTenantId] = useState("");
  const [zone, setZone] = useState(""); // lowercase 'z' for consistency
  const [resourceGroupName, setResourceGroupName] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("https://dns-management-system-backend-azure.onrender.com/api/v1/users/register", {
        name,
        email,
        subscriptionId,
        clientId,
        clientSecret,
        tenantId,
        zone, // lowercase 'z' for consistency
        resourceGroupName,
        password,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setIsAuthenticated(true);
      setLoading(false);
      toast.success(data.message);
    } catch (error) {
      setLoading(false);
      toast.error("Invalid Input or Registration Failed");
    }
  };

  if (loading) {
    return <div className="App"><Loader /></div>; // Display loader while loading
  }

  if (isAuthenticated) return <Navigate to={"/"} />;

  return (
    <div className="RegistrationContainer">
      <h1>Create Your Account</h1>
      <form onSubmit={handleRegistrationSubmit}>
        <input type="text" value={name} id="name" placeholder="Enter your Name" onChange={(e) => setName(e.target.value)} required />
        <input type="email" value={email} id="email" placeholder="Enter your Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="text" value={subscriptionId} id="subscriptionId" placeholder="Enter your Azure Subscription ID" onChange={(e) => setSubscriptionId(e.target.value)} required />
        <input type="text" value={clientId} id="clientId" placeholder="Enter your Azure Client ID" onChange={(e) => setClientId(e.target.value)} required />
        <input type="text" value={clientSecret} id="clientSecret" placeholder="Enter your Azure Client Secret" onChange={(e) => setClientSecret(e.target.value)} required />
        <input type="text" value={tenantId} id="tenantId" placeholder="Enter your Azure Tenant ID" onChange={(e) => setTenantId(e.target.value)} required />
        <input type="text" value={zone} id="zone" placeholder="Enter your Azure Zone" onChange={(e) => setZone(e.target.value)} required />
        <input type="text" value={resourceGroupName} id="resourceGroupName" placeholder="Enter your Azure Resource Group Name" onChange={(e) => setResourceGroupName(e.target.value)} required />
        <input type="password" value={password} id="password" placeholder="Create Your Password" onChange={(e) => setPassword(e.target.value)} required />
        <button>Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
