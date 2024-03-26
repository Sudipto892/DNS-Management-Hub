import React from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Navbar.css"
import axios from 'axios'


const Navbar = ({ isLoggedIn, handleLogout }) => {
  
  const performLogout = async () => { 
    try {
      await axios.delete("https://dns-management-system-backend-azure.onrender.com/api/v1/users/logout");
      isLoggedIn(false); 
      toast.success("Logout Successful");
    } catch (error) {
      toast.error("Invalid Credentials");
    }
  };

  return (
    <div className='Navbar'>
      <div className="logo">
        <h1>DNS MANAGEMENT HUB</h1>
      </div>

      <div className="Authbox">
        {
          isLoggedIn ?
            <button id="Logout" onClick={performLogout}>Logout</button>
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
