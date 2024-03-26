import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Register.css"
import { Navigate } from 'react-router-dom';
import Loader from '../../Loader/Loader';

const Register = ({isAuthenticated,setisAuthenticated,setLoading,loading}) => {
    const [name,setname]=useState("")
    const [email,setemail]=useState("")
    const [subscriptionid,setsubscriptionid]=useState("")
    const [clientid,setclientid]=useState("")
    const [client_secret,setclient_secret]=useState("")
    const [tenantId,settenantId]=useState("")
    const [Zone,setZone]=useState("")
    const [resourcegroupname,setresourcegroupname]=useState("")
    const [password,setpassword]=useState("")

    const submitHandaler=async(e)=>{
        e.preventDefault();
        try {
            setLoading(true);
            const {data}=await axios.post("https://dns-management-system-backend-azure.onrender.com/api/v1/users/register",{
                name,
                email,
                subscriptionid,
                clientid,
                client_secret,
                tenantId,
                Zone,
                resourcegroupname,
                password
            },{
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true,
            })
            setisAuthenticated(true);
            setLoading(false)
            console.log(isAuthenticated)
            toast.success(data.message);
        } catch (error) {
            setLoading(false);
            toast.error("Invalid Credentials");
        }
       

    }
    if (loading) {
        return <div className="App"><Loader /></div>; 
      }
    if(isAuthenticated) return <Navigate to={"/"}/>
  return (
    <>
 

    <div className="SigninContainer">
    <h1>Register</h1>

    <form onSubmit={submitHandaler}>
      <input type="text" value={name} id="name" placeholder="Enter your Name"  onChange={(e)=>setname(e.target.value)} required />
      <input type="email" value={email} id="email" placeholder="Enter your Email" onChange={(e)=>setemail(e.target.value)} required />
      <input type="text" value={subscriptionid} id="subscriptionid" placeholder="Enter your Azure subscriptionid" onChange={(e)=>setsubscriptionid(e.target.value)} required/>
      <input type="text" value={clientid} id="clientid" placeholder="Enter your Azure clientid" onChange={(e)=>setclientid(e.target.value)} required/>
      <input type="text" value={client_secret} id="client_secret" placeholder="Enter your Azure client_secret" onChange={(e)=>setclient_secret(e.target.value)} required/>
      <input type="text" value={tenantId} id="tenantId" placeholder="Enter your Azure tenantId" onChange={(e)=>settenantId(e.target.value)} required/>
      <input type="text" value={Zone} id="tenantId" placeholder="Enter your Azure tenantId" onChange={(e)=>setZone(e.target.value)} required/>
      <input type="text" value={resourcegroupname} id="tenantId" placeholder="Enter your Azure tenantId" onChange={(e)=>setresourcegroupname(e.target.value)} required/>
      <input type="password" value={password} id="password" placeholder="Create Your Password" onChange={(e)=>setpassword(e.target.value)} required />
      <button>Register</button>
    </form>
  </div>
  </>
  )
}

export default Register