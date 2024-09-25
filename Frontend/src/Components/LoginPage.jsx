import React, { useState } from "react";
import LoginImage from "../Images/LoginImage.png";
import GoogleLogo from "../Icons/icons8-google-25.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function LoginPage({ handleTabChange }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  function handleSignupRoute() {
    navigate("/registration");
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
// submitting
async function handleSubmit(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  const data = {
    userName: username,
    userPassword: password
  };

  try {
    const response = await axios.post('https://freelanze-backend.onrender.com/api/loginUser', data);
    console.log(response);
   
    if (response.data.loginData.data.success) {
      
      Cookies.set('accessToken',response.data.accessToken)
      console.log(response.data.accessToken);
      
      navigate('/');
    }
  } catch (error) {
    if (error.response) {
      // Server responded with a status code outside of the 2xx range
      console.error('Server Error:', error.response.data);
    } else if (error.request) {
      // No response received from the server
      console.error('Network Error:', error.request);
    } else {
      // Error setting up the request
      console.error('Error:', error.message);
    }
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="justify-start">
        {" "}
        <img
          src={LoginImage}
          alt="Description of the image"
          style={{ width: "700px", height: "600px" }}
        />{" "}
      </div>
      <div
        className="bg-white rounded-3xl shadow-xl p-8 w-96"
        style={{ width: "450px" }}>
        <h2 className="text-3xl font-bold mb-6 text-blue-500 text-center">
          Log in
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2">
              Username or Email
            </label>
            <input
              type="text"
              id="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-center">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-gray-600 text-sm">
                Remember me
              </label>
            </div>
            <a href="#" className="text-blue-500 hover:text-blue-700 text-sm">
              Forgot password?
            </a>
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white w-full font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline">
              Login
            </button>
          </div>

          <div className="text-center text-gray-600">
            Don't have an account?{" "}
            <a
              href="#"
              className="text-blue-500 hover:text-blue-700"
              onClick={() =>  handleSignupRoute()}>
              Sign up
            </a>
          </div>

          <div className="text-center mt-4">
            <span className="text-gray-600">or connect with</span>
            <div className="flex justify-center mt-2">
              <button
                className="flex items-center w-64 gap-4 px-5 mb-4 bg-transparent rounded-full border-2  py-3 text-lg"
                variant="outline">
                {" "}
                <img src={GoogleLogo} />
                Sign In With Google
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
