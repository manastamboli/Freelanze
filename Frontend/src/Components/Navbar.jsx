import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Assuming you're using axios to make API requests
 // Make sure to replace with your actual logo path
import { FaBars, FaTimes } from 'react-icons/fa';
import Cookies from 'js-cookie';

function Navbar() {
  const [guestUser, setGuestUser] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState(''); // State to hold the user's name
  const[response,setresponse]=useState({});
  const navigate = useNavigate();

  useEffect(()=>{
    async function getUser() {
      console.log("here its is comming from")
      console.log("console check")
        console.log(Cookies.get('accessToken'))
        const response1= await axios.get('https://freelanze-backend.onrender.com/api/getUser')
        setUserName(response1.userName)
        setresponse(response1);

        
        console.log(response.data.user.userName);
        console.log("response from backend",response1)
        console.log(response1.userName);
    }
     getUser();
  },[])
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMarketplaceRoute = () => {
    navigate('/marketplace');
  };

  function handleWorkRoute() {
    navigate("/findwork");
  }
  function handleProjectRoute() {
    navigate("/projectrequest");
  }
  const handleHomeRoute = () => {
    navigate('/');
  };

  const handleLoginRoute = () => {
    navigate('/login');
  };

  return (
    <div className="p-3 relative z-10">
      <header className="flex justify-between items-center py-3 bg-white rounded-full px-6">
        <div className="flex items-center">
          {/* <img src={Logo} alt="Spacelance logo" className="w-24" /> */}
        </div>

        {/* Hamburger Menu Icon */}
        {/* <div className="lg:hidden">
          <button onClick={toggleMenu}>
            <FaBars className="text-2xl" />
          </button>
        </div> */}

        {/* Navigation Links */}
        <nav
          className={`fixed lg:static top-0 right-0 h-full lg:h-auto w-2/3 max-w-xs lg:max-w-none bg-white transform ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          } lg:translate-x-0 transition-transform duration-300 ease-in-out lg:flex lg:flex-row flex-col justify-center items-center text-lg text-black lg:space-x-6 p-6 lg:p-0`}
          style={{ zIndex: 10, gap: '60px' }}
        >
          {/* Close Button */}
          <div className="self-end mb-6 lg:hidden">
            <button onClick={toggleMenu}>
              <FaTimes className="text-2xl" />
            </button>
          </div>

          <div className="space-x-6 lg:space-y-0 lg:flex lg:flex-row lg:items-center">
          <a
              href="#"
              onClick={handleHomeRoute}
              className="ml-6 block lg:inline hover:underline">
              Home
            </a>
            <a
              href="#"
              onClick={handleWorkRoute}
              className="block lg:inline hover:underline">
              Find...
            </a>
            <a
              href="#"
              onClick={handleMarketplaceRoute}
              className="block lg:inline hover:underline">
              Market place
            </a>
            
            {guestUser ? (
              <a href="#" className="block lg:inline hover:underline">
               {` Hello ${userName}`}
            </a>
            ) : (
              
              <a href="#" onClick={handleLoginRoute} className="block lg:inline hover:underline">
             Login
             {console.log(response.data)}
             {console.log(response.data.userName)}

             
            
             </a>
            )}
          </div>
          <button onClick={handleProjectRoute} className="bg-blue-500 hover:bg-blue-700 py-2 px-9 rounded-full text-white mt-6 lg:mt-0">
            Post a project
          </button>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;