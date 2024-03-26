import React from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Navbar.css"
import axios from 'axios'


const Navbar = ({isAuthenticated,setisAuthenticated}) => {
  const handleLogout=async()=>{
    try {
     await axios.delete("https://dns-backend-magv.onrender.com/api/v1/users/logout");
      setisAuthenticated(false);
      toast.success("Logout Successfully");
  } catch (error) {
      toast.error("Invalid Credentials");
  }
 
  }
  return (
    <div className='Navbar'>
      <div className="logo">
        <h1>DNS MANAGEMENT SYSTEM</h1>
      </div>

      <div className="Authbox">
        {
              isAuthenticated ? 
              <button id="Login" onClick={handleLogout}>Logout</button>
              :
              <div>
                  <Link to={"/login"}><button id="Login">Login</button></Link>
                  <Link to={"/register"}><button id="Signup">SignUp</button></Link>
              </div>
        }

        
        
      
      </div>
    </div>
  )
}

export default Navbar