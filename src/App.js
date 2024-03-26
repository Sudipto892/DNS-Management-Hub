import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Login from './components/AuthenticationPage/Login/Login';
import Register from './components/AuthenticationPage/Register/Register';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home/Home';
import Loader from './components/Loader/Loader';
import "./App.css"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [authToken, setAuthToken] = useState('');

  useEffect(() => {
    axios.get("https://dns-backend-magv.onrender.com/api/v1/users/me", {
      withCredentials: true,
    }).then(res => {
      setLoading(false); 
      setUser(res.data.user);
      setIsAuthenticated(true);
      setAuthToken(res.data.authtoken);
    }).catch(error => {
      setLoading(false); 
    });
  }, []);

  if (loading) {
    return <div className="App"><Loader /></div>; 
  }

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} setisAuthenticated={setIsAuthenticated} />
      
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home User={user} Authtoken={authToken} setLoading={setLoading} />} />
        <Route path='/login' element={<Login isAuthenticated={isAuthenticated} setisAuthenticated={setIsAuthenticated} setLoading={setLoading} loading={loading} />} />
        <Route path='/register' element={<Register isAuthenticated={isAuthenticated} setisAuthenticated={setIsAuthenticated} setLoading={setLoading} loading={loading} />} />
      </Routes>
    </Router>
  );
}

export default App;
